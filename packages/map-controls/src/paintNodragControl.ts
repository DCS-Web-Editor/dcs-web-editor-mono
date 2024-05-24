import { context, disableTextControl } from ".";

/* 
Create Paint Control
********************************/

export const paintNodragControl = L.control({ position: "bottomleft" });
const pAnchor = document.createElement("a");
let currentPolyLine: L.Polyline;
let map: any;

interface PolySave {
  latLngs: any[];
  options: any;
  _leaflet_id: number;
}
export const drawLinesNodrag: PolySave[] = [];

paintNodragControl.onAdd = function (_map) {
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
  else disableNodragPaintControl(pAnchor);
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

export function disableNodragPaintControl() {
  currentPolyLine = null;
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

    if (currentPolyLine) {
      // resume
      if (e.target.id === "map") doDraw(e);
      return;
    }

    // new line
    if (e.ctrlKey) paintConfig.dashArray = [5, 10];
    currentPolyLine = L.polyline([], paintConfig).addTo(map);
    currentPolyLine.on("click", removeLine);
    doDraw(e);
  }

  // RIGHT
  if (e.button === 2) {
    endDraw(e);

    setTimeout(() => {
      context.paintMode = false;
      context.writeMode = false;
      disableNodragPaintControl(pAnchor);
    }, 300);
  }
}

function removeLine(e: any) {
  const found = drawLinesNodrag.findIndex((d) => d._leaflet_id === e.sourceTarget._leaflet_id);
  if (found > -1) drawLinesNodrag.splice(found, 1);

  e.sourceTarget.remove();
  e.target?.remove();
}

function doDraw(e: MouseEvent) {
  if (e.target.id !== "map") return;
  if (isPainting) {
    var pointlatlng = map.mouseEventToLatLng(e);
    currentPolyLine.addLatLng(pointlatlng);
  }
}

function endDraw(e: MouseEvent) {
  isPainting = false;

  const latLngs = currentPolyLine.getLatLngs();
  if (latLngs.length < 2) return;

  drawLinesNodrag.push({
    latLngs,
    _leaflet_id: currentPolyLine._leaflet_id,
    options: structuredClone(currentPolyLine.options),
  } as PolySave);
}

export function loadNodragDraw(array: PolySave[]) {
  // console.log("loadDraw", array);
  array.forEach((draw: PolySave) => {
    currentPolyLine = L.polyline([], draw.options).addTo(map);
    currentPolyLine.on("click", removeLine);

    draw.latLngs.forEach((ll) => {
      currentPolyLine.addLatLng(ll);
    });
  });
}
