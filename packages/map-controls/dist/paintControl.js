import { context } from ".";
/*
Create Paint Control
********************************/
export const paintControl = L.control({ position: "bottomleft" });
const pAnchor = document.createElement("a");
let currentPolyLine;
let map;
export const drawLines = [];
paintControl.onAdd = function (_map) {
    map = _map;
    this._div = L.DomUtil.create("div", "leaflet-control-zoom leaflet-bar leaflet-control");
    pAnchor.classList.add("leaflet-control-zoom-in");
    pAnchor.href = "#";
    pAnchor.innerHTML = '<span><i class="fa fa-pencil"></i></span>';
    L.DomEvent.on(pAnchor, "click", paintControlActivate);
    this._div.appendChild(pAnchor);
    return this._div;
};
//Functions to either disable (onmouseover) or enable (onmouseout) the map's dragging
function paintControlActivate(e) {
    e.preventDefault();
    context.paintMode = !context.paintMode;
    context.writeMode = false;
    if (context.paintMode)
        enablePaintControl(pAnchor);
    else
        disablePaintControl(pAnchor);
}
let paintMode = false;
function enablePaintControl(anchor) {
    anchor.classList.add("polyline-measure-controlOnBgColor");
    map.dragging.disable();
    if (context.paintInitialized)
        return;
    // map.on('mousedown', paintStarted);
    // map.on('mousemove', doDraw);
    // map.on('mouseup', endDraw);
    const mapElement = document.getElementById("map");
    mapElement.addEventListener("pointerdown", paintStarted);
    mapElement.addEventListener("pointermove", doDraw);
    mapElement.addEventListener("pointerup", endDraw);
    context.paintInitialized = true;
}
function paintStarted(e) {
    // console.log('paintStarted', e);
    // if (e.target !== mapElement) return;
    if (!context.paintMode)
        return;
    startDraw(e);
}
function disablePaintControl(anchor) {
    anchor.classList.remove("polyline-measure-controlOnBgColor");
    map.dragging.enable();
}
function startDraw(e) {
    if (!context.paintMode)
        return;
    map.lastPointX = Math.floor(e.layerX);
    map.lastPointY = Math.floor(e.layerY);
    if (e.which === 1) {
        paintMode = true;
        const paintConfig = {
            // smoothFactor: 2,
            color: context.getColor(),
            weight: 4,
            className: "leaflet-drawline",
        };
        if (e.ctrlKey)
            paintConfig.dashArray = [5, 10];
        currentPolyLine = L.polyline([], paintConfig).addTo(map);
        currentPolyLine.on("click", removeLine);
    }
}
function removeLine(e) {
    const found = drawLines.findIndex((d) => d._leaflet_id === e.sourceTarget._leaflet_id);
    if (found > -1)
        drawLines.splice(found, 1);
    e.sourceTarget.remove();
    e.target?.remove();
}
function doDraw(e) {
    if (paintMode) {
        var pointlatlng = map.mouseEventToLatLng(e);
        currentPolyLine.addLatLng(pointlatlng);
    }
}
function endDraw(e) {
    paintMode = false;
    const latLngs = currentPolyLine.getLatLngs();
    if (latLngs.length < 2)
        return;
    drawLines.push({
        latLngs,
        _leaflet_id: currentPolyLine._leaflet_id,
        options: structuredClone(currentPolyLine.options),
    });
}
export function loadDraw(array) {
    // console.log("loadDraw", array);
    array.forEach((draw) => {
        currentPolyLine = L.polyline([], draw.options).addTo(map);
        currentPolyLine.on("click", removeLine);
        draw.latLngs.forEach((ll) => {
            currentPolyLine.addLatLng(ll);
        });
    });
}
