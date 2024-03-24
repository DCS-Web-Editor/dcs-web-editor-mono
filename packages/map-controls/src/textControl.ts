import { context } from ".";
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

textControl.onAdd = function (_map) {
  map = _map;
  this._div = L.DomUtil.create(
    "div",
    "leaflet-control-zoom leaflet-bar leaflet-control"
  );
  // otherwise drawing process would instantly start at controls' container or double click would zoom-in map
  L.DomEvent.disableClickPropagation(this._div);

  anchor.classList.add("leaflet-control-zoom-in");
  anchor.href = "#";
  anchor.innerHTML = '<span><i class="fa fa-font"></i></span>';
  L.DomEvent.on(anchor, "click", textControlActivate);
  this._div.appendChild(anchor);
  return this._div;
};

textControl.getColor = function (cb: () => string) {
  context.getColor = cb;
};

//Functions to either disable (onmouseover) or enable (onmouseout) the map's dragging
function textControlActivate(e) {
  e.preventDefault();
  context.writeMode = !context.writeMode;
  context.paintMode = false;
  if (context.writeMode) enableTextControl(anchor);
  else disableTextControl(anchor);
}

function enableTextControl(anchor) {
  map.dragging.disable();
  anchor.classList.add("polyline-measure-controlOnBgColor");

  if (context.writeInitialized) return;

  map.on("click", function (e) {
    let drawColor = context.getColor();
    if (e.target !== map) return;
    if (!context.writeMode) return;

    const text = prompt("Text ?");
    if (!text) return;
    const style = `color: ${drawColor}; font-weight: bold; font-family: sans-serif; pointer-events: auto;`;
    const icon: L.DivIcon = createIcon(text, style);

    const marker: L.Marker = new L.marker(e.latlng, { icon });

    map.addLayer(marker);
    marker.on("click", removeText);
    // L.DomEvent.disableClickPropagation(marker.getElement());

    texts.push({
      text,
      style,
      latLng: e.latlng,
      _leaflet_id: marker._leaflet_id,
    });
  });

  context.writeInitialized = true;
}

function removeText(e): any {
  if (!context.writeMode) return;

  const found = texts.findIndex(
    (d) => d._leaflet_id === e.sourceTarget._leaflet_id
  );
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

function disableTextControl(anchor) {
  map.dragging.enable();
  anchor.classList.remove("polyline-measure-controlOnBgColor");
}

export function loadText(_texts: TextSave[]) {
  // console.log("loadDraw", array);
  _texts.forEach((text: TextSave) => {
    const icon = createIcon(text.text, text.style);
    const marker: L.Marker = new L.marker(text.latLng, { icon });
    map.addLayer(marker);
    marker.on("click", removeText);
  });
}
