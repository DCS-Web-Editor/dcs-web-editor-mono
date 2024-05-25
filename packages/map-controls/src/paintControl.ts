import { context, disableTextControl } from ".";
import L from "leaflet";

/* 
Create Paint Control
********************************/

export const paintControl = L.control({ position: "bottomleft" });
const pAnchor = document.createElement("a");
let currentPolyLine: L.Polyline;
let map: any;

export interface PolySave {
  latLngs: any[];
  options: any;
}
export const drawLines: Record<string, PolySave> = {};

paintControl.onAdd = function (_map) {
  map = _map;
  context.iconBar ||= L.DomUtil.create("div", "leaflet-control-zoom leaflet-bar leaflet-control");
  this._div = context.iconBar;

  pAnchor.classList.add("leaflet-control-zoom-in");
  pAnchor.title =
    "Shortcut: 'p' Left click to paint. Hold CTRL for dotted lines. ALT + click to draw straight line from your last drawing. Right click to exit";
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
  disableTextControl();
  if (context.paintMode) enablePaintControl(pAnchor);
  else disablePaintControl(pAnchor);
}

let isPainting = false;
function enablePaintControl(anchor) {
  anchor.classList.add("polyline-measure-controlOnBgColor");
  map.dragging.disable();

  const mapElement = document.getElementById("map")!;

  mapElement.addEventListener("pointerdown", paintStarted);
  mapElement.addEventListener("pointermove", doDraw);
  mapElement.addEventListener("pointerup", endDraw);
}

function paintStarted(e: MouseEvent) {
  // console.log('paintStarted', e);
  // if (e.target !== mapElement) return;
  if (!context.paintMode) return;
  startDraw(e);
}

export function disablePaintControl() {
  context.paintMode = false;
  pAnchor.classList.remove("polyline-measure-controlOnBgColor");
  if (map) map.dragging.enable();
  const mapElement = document.getElementById("map")!;
  mapElement.removeEventListener("pointerdown", paintStarted);
  mapElement.removeEventListener("pointermove", doDraw);
  mapElement.removeEventListener("pointerup", endDraw);
}

function startDraw(e: MouseEvent) {
  if (!context.paintMode) return;
  map.lastPointX = Math.floor(e.layerX);
  map.lastPointY = Math.floor(e.layerY);

  // LEFT
  if (e.button === 0) {
    isPainting = true;

    const paintConfig = {
      // smoothFactor: 2,
      color: context.getColor(),
      weight: 4,
      className: "leaflet-drawline",
    };

    if (e.altKey) {
      // resume
      doDraw(e);
      return;
    }

    // new line
    if (e.ctrlKey) paintConfig.dashArray = [5, 10];
    currentPolyLine = L.polyline([], paintConfig).addTo(map);
    currentPolyLine.on("click", removeLine);
  }

  // RIGHT
  if (e.button === 2) {
    endDraw(e);

    setTimeout(() => {
      context.paintMode = false;
      context.writeMode = false;
      disablePaintControl(pAnchor);
    }, 300);
  }
}

function removeLine(e: any) {
  delete drawLines[e.sourceTarget._leaflet_id];

  e.sourceTarget.remove();
  e.target?.remove();
}

function doDraw(e: MouseEvent) {
  if (isPainting) {
    var pointlatlng = map.mouseEventToLatLng(e);
    currentPolyLine.addLatLng(pointlatlng);
  }
}

function endDraw(e: MouseEvent) {
  isPainting = false;

  const latLngs = currentPolyLine.getLatLngs();
  if (latLngs.length < 2) return;

  drawLines[currentPolyLine._leaflet_id] = {
    latLngs,
    options: structuredClone(currentPolyLine.options),
  };
}

export function loadDraw(array: PolySave[]) {
  // console.log("loadDraw", array);
  array.forEach((draw: PolySave) => {
    currentPolyLine = L.polyline([], draw.options).addTo(map);
    currentPolyLine.on("click", removeLine);

    draw.latLngs.forEach((ll) => {
      currentPolyLine.addLatLng(ll);
    });
  });
}

export function exportPaintings() {
  return Object.keys(drawLines).map((key) => {
    return {
      ...drawLines[key],
      _leaflet_id: key,
    };
  });
}
