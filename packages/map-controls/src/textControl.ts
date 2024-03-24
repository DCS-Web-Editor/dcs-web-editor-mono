import { context } from ".";
let map: any;

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
    const icon: L.DivIcon = L.divIcon({
      iconSize: [0, 0],
      className: "dwe-map-label",
      html: `<div style="${style}">${text}</div>`,
    });

    const marker: L.Marker = new L.marker(e.latlng, { icon });
    map.addLayer(marker);
    marker.on("click", (e) => {
      if (context.writeMode) e.target.remove();
    });
    // L.DomEvent.disableClickPropagation(marker.getElement());
  });

  context.writeInitialized = true;
}

function disableTextControl(anchor) {
  map.dragging.enable();
  anchor.classList.remove("polyline-measure-controlOnBgColor");
}
