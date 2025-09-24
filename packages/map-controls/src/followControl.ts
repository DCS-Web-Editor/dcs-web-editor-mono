import { context } from ".";

export const followControl = L.control({ position: "bottomleft" });
const anchor = document.createElement("a");

let map;

followControl.onAdd = function (_map) {
    map = _map;
    this._div = L.DomUtil.create(
        "div",
        "leaflet-control-zoom leaflet-bar leaflet-control"
    );

    // otherwise drawing process would instantly start at controls' container or double click would zoom-in map
    L.DomEvent.disableClickPropagation(this._div);

    anchor.classList.add("leaflet-control-zoom-in");
    anchor.classList.add("polyline-measure-controlOnBgColor");
    anchor.title =
        "Shortcut: F. Click to follow player, click again to disable follow.";
    anchor.role = "button";
    anchor.innerHTML = `<span style="font-family: 'Courier New', Courier, monospace;"><i class="fa fa-plane"></i></span>`;

    L.DomEvent.on(anchor, "click", followControlToggle);
    this._div.appendChild(anchor);

    return this._div;
};

export function followControlToggle() {
    context.follow = !context.follow;
    if (context.follow) {
        anchor.classList.add("polyline-measure-controlOnBgColor");
        if (map) map.options.scrollWheelZoom = "center";
    } else {
        anchor.classList.remove("polyline-measure-controlOnBgColor");
        if (map) map.options.scrollWheelZoom = true;
    }
}
