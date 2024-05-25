import { context, disableNodragPaintControl, disablePaintControl } from ".";
let map: any;
interface TextSave {
  text: string;
  style: string;
  latLng: any;
  _leaflet_id: string;
}

export const texts: TextSave[] = [];

// Create Text Control

export const textControl = L.control({ position: "bottomleft" });
const anchor = document.createElement("a");

const inputIcon = L.divIcon({
  html: makeInputHtml(1),
  className: "divIcon",
  iconSize: [200, 50],
  iconAnchor: [0, 0],
});

var inputMarker = L.marker([90, 90], {
  icon: inputIcon,
});

textControl.onAdd = function (_map) {
  map = _map;
  context.iconBar ||= L.DomUtil.create("div", "leaflet-control-zoom leaflet-bar leaflet-control");
  this._div = context.iconBar;

  // otherwise drawing process would instantly start at controls' container or double click would zoom-in map
  L.DomEvent.disableClickPropagation(this._div);

  anchor.classList.add("leaflet-control-zoom-in");
  anchor.title =
    "Shortcut: 't' Left click to add Text. Click text to remove it. Right click to exit text mode.";
  anchor.href = "#";
  anchor.innerHTML = `<span style="font-family: 'Courier New', Courier, monospace;">T</span>`;
  L.DomEvent.on(anchor, "click", textControlActivate);
  this._div.appendChild(anchor);

  inputMarker.addTo(map);

  return this._div;
};

textControl.getColor = function (cb: () => string) {
  context.getColor = cb;
};

//Functions to either disable (onmouseover) or enable (onmouseout) the map's dragging
function textControlActivate(e) {
  e.preventDefault && e.preventDefault();
  context.writeMode = !context.writeMode;
  disablePaintControl();
  disableNodragPaintControl();
  if (context.writeMode) enableTextControl(anchor);
  else disableTextControl(anchor);
}

function enableTextControl(anchor) {
  map.dragging.disable();
  anchor.classList.add("polyline-measure-controlOnBgColor");

  map.on("click", addInput);
  if (context.writeInitialized) return;

  // exit on right click
  map.on("contextmenu", (e) => {
    if (context.writeMode) textControlActivate(e);
  });

  context.writeInitialized = true;
}

let _currentClickEvent;
function addInput(e) {
  _currentClickEvent = e;
  map.off("click", addInput);
  const textButton = document.getElementById("add-text-btn");
  textButton.addEventListener("click", addText);

  const inputField = document.getElementById("input_1");
  inputField.value = "";
  inputField.focus();

  if (e.target !== map) return;
  if (!context.writeMode) return;

  // const text = prompt("Text ?");

  inputMarker.setLatLng(e.latlng);
}

function addText() {
  const textButton = document.getElementById("add-text-btn");
  textButton.removeEventListener("click", addText);

  let drawColor = context.getColor();

  setTimeout(() => {
    inputMarker.setLatLng({
      lat: 90,
      lon: 90,
    });
    map.on("click", addInput);
  }, 10);

  const inputField = document.getElementById("input_1");
  const text = inputField?.value;

  if (!text) return;

  const style = `color: ${drawColor}; font-weight: bold; font-family: sans-serif; pointer-events: auto;`;
  const icon: L.DivIcon = createIcon(text, style);
  const marker: L.Marker = new L.marker(_currentClickEvent.latlng, { icon });

  map.addLayer(marker);
  marker.on("click", removeText);
  // L.DomEvent.disableClickPropagation(marker.getElement());

  texts.push({
    text,
    style,
    latLng: _currentClickEvent.latlng,
    _leaflet_id: marker._leaflet_id,
  });
}

function makeInputHtml(id) {
  return (
    '<input type="text" value="" id="input_' + id + '" /><button id="add-text-btn">OK</button>'
  );
}

function removeText(e): any {
  if (!context.writeMode) return;

  const found = texts.findIndex((d) => d._leaflet_id === e.sourceTarget._leaflet_id);
  if (found > -1) texts.splice(found, 1);

  e.sourceTarget.remove();
  e.target.remove();
}

function createIcon(text: string, style: string) {
  const icon = L.divIcon({
    iconSize: [0, 0],
    className: "dwe-map-label",
    html: `<div style="${style}">${text}</div>`,
  });
  return icon;
}

export function disableTextControl() {
  map.off("click", addInput);

  context.writeMode = false;
  map.dragging.enable();
  anchor.classList.remove("polyline-measure-controlOnBgColor");
  inputMarker.setLatLng({
    lat: 90,
    lon: 90,
  });
}

export function loadText(_texts: TextSave[], _map?: any) {
  map ||= _map;
  // console.log("loadDraw", array);
  _texts.forEach((text: TextSave) => {
    const icon = createIcon(text.text, text.style);
    const marker: L.Marker = new L.marker(text.latLng, { icon });
    map.addLayer(marker);
    marker.on("click", removeText);
  });
}
