let map;
import { context, getColor } from './index';
/*
  Create Paint Control
  ********************************/
export const paintControl = L.control({ position: 'bottomleft' });
const pAnchor = document.createElement('a');
let myPolyline;
paintControl.onAdd = function (_map) {
    map = _map;
    this._div = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar leaflet-control');
    pAnchor.classList.add('leaflet-control-zoom-in');
    pAnchor.href = '#';
    pAnchor.innerHTML = '<span><i class="fa fa-pencil"></i></span>';
    L.DomEvent.on(pAnchor, 'click', paintControlActivate);
    this._div.appendChild(pAnchor);
    return this._div;
};
//Functions to either disable (onmouseover) or enable (onmouseout) the map's dragging
function paintControlActivate(e) {
    e.preventDefault();
    context.paintMode = !context.paintMode;
    if (context.paintMode)
        enablePaintControl(pAnchor);
    else
        disablePaintControl(pAnchor);
}
let paintMode = false;
function enablePaintControl(anchor) {
    anchor.classList.add('polyline-measure-controlOnBgColor');
    map.dragging.disable();
    if (context.paintInitialized)
        return;
    // map.on('mousedown', paintStarted);
    // map.on('mousemove', doDraw);
    // map.on('mouseup', endDraw);
    const mapElement = document.getElementById('map');
    mapElement.addEventListener('pointerdown', paintStarted);
    mapElement.addEventListener('pointermove', doDraw);
    mapElement.addEventListener('pointerup', endDraw);
    context.paintInitialized = true;
}
function paintStarted(e) {
    // console.log('paintStarted', e);
    // if (e.target !== mapElement) return;
    if (!context.paintMode)
        return;
    doPaint(e);
}
function disablePaintControl(anchor) {
    anchor.classList.remove('polyline-measure-controlOnBgColor');
    map.dragging.enable();
}
function doPaint(e) {
    map.lastPointX = Math.floor(e.layerX);
    map.lastPointY = Math.floor(e.layerY);
    // console.log(e);
    if (e.which === 1) {
        paintMode = true;
        const config = {
            // smoothFactor: 2,
            color: getColor(),
            weight: 4,
            className: 'leaflet-drawline'
        };
        if (e.ctrlKey)
            config.dashArray = [5, 10];
        myPolyline = L.polyline([], config).addTo(map);
        myPolyline.on('click', (e) => e.target?.remove());
    }
}
function doDraw(e) {
    if (paintMode) {
        var pointlatlng = map.mouseEventToLatLng(e);
        myPolyline.addLatLng(pointlatlng);
    }
}
function endDraw(e) {
    paintMode = false;
}
