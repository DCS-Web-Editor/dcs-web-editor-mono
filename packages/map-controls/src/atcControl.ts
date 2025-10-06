import { context, disablePaintControl, disableTextControl } from ".";
import "./atcSettings.css";
export const atcControl = L.control({ position: "bottomleft" });
const anchor = document.createElement("a");
const mapElement = document.getElementById("map")!;
let map: L.Map;

atcControl.onAdd = function (_map) {
    map = _map;
    context.atcBar ||= L.DomUtil.create(
        "div",
        "leaflet-control-zoom leaflet-bar leaflet-control leaflet-dwv"
    );
    this._div = context.atcBar;

    // otherwise drawing process would instantly start at controls' container or double click would zoom-in map
    L.DomEvent.disableClickPropagation(this._div);

    anchor.classList.add("leaflet-control-zoom-in");
    anchor.title = "ATC mode (shortcut: 'c')";
    anchor.role = "button";
    anchor.innerHTML = '<span><i class="fa fa-satellite-dish"></i></span>';
    L.DomEvent.on(anchor, "click", atcControlActivate);
    this._div.appendChild(anchor);
    renderSettings();
    return this._div;
};

function atcControlActivate(e: Event) {
    const atcMenu = document.getElementById("atc-settings")!;

    context.atcMode = !context.atcMode;
    if (context.atcMode) {
        anchor.classList.add("polyline-measure-controlOnBgColor");
        atcMenu.style.display = "block";
    } else {
        anchor.classList.remove("polyline-measure-controlOnBgColor");
        atcMenu.style.display = "none";
    }
}

// atcControl.peerSync = () => {};
// atcControl.setPeerSync = function name(peerSync: Function) {
//     atcControl.peerSync = peerSync;
// };

function renderSettings() {
    // colorize all icons on map
    //   const icons = document.getElementsByClassName("dwe-dropicon");
    //   Object.values(icons).forEach((e) => {
    //     e.style.filter = filter;
    //   });

    const atcMenu = document.getElementById("atc-settings")!;

    if (atcMenu)
        atcMenu.innerHTML = `<div class="atc-info no-select">
            <b>ATC Settings</b>
        <ul class="dropdown">
            <li title="Update can take a few seconds">
               <button id="atc-button-ground" >Show Ground</button>
               <span id="atc-show-ground">${
                   context.showGround ? "ON" : "OFF"
               }</span>
            </li>
         </ul>
    
       </div>
    `;

    atcMenu
        .querySelector("#atc-button-ground")!
        .addEventListener("click", () => {
            context.showGround = !context.showGround;
            atcMenu.querySelector("#atc-show-ground")!.innerHTML =
                context.showGround ? "ON" : "OFF";
        });
}

interface Coordinates {
    lat: number;
    lng: number;
    width: number;
    height: number;
    bounds?: any[];
}

function cornersToBounds(corners: any[]) {
    return [
        [corners[0].lat, corners[0].lng],
        [corners[1].lat, corners[0].lng],
        [corners[1].lat, corners[1].lng],
        [corners[0].lat, corners[1].lng],
    ];
}

function calculateBounds(coordinates: Coordinates) {
    // 1) Convert LatLng into container pixel position.
    const originPoint = map.latLngToContainerPoint(coordinates);
    // 2) Add the image pixel dimensions.
    // Positive x to go right (East).
    // Negative y to go up (North).
    const firstCornerPoint = originPoint.add({
        x: -coordinates.width / 2,
        y: -coordinates.height / 2,
    });
    const nextCornerPoint = originPoint.add({
        x: coordinates.width / 2,
        y: coordinates.height / 2,
    });
    // 3) Convert back into LatLng.
    const firstCornerLatLng = map.containerPointToLatLng(firstCornerPoint);
    const nextCornerLatLng = map.containerPointToLatLng(nextCornerPoint);
    return [firstCornerLatLng, nextCornerLatLng];
}
