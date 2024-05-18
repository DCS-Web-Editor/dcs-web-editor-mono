import { MGRStoLL } from "@dcs-web-editor-mono/utils";
import "./searchControl.css";

/* 
Create Search Control
********************************/

let renderContainer: Function;
let searchField: HTMLInputElement;
let results: HTMLElement;
let items: any;
let map: any;

export function createSearchControl(_renderContainer: Function, _items) {
  renderContainer = _renderContainer;
  items = _items;

  const pAnchor = document.createElement("a");
  searchField = document.createElement("input");
  searchField.className = "search-field";
  searchField.placeholder =
    "Type to find unit/airport/beacon or coordinates starting with MGRS:37 X ...";
  searchField.title = "Type to find unit/airport/beacon or coordinates starting with MGRS:...";

  results = document.createElement("div");
  results.className = "results";

  results.innerHTML = "<h3>Results</h3>";

  const searchControl = L.control({ position: "bottomleft" });

  searchControl.onAdd = function (_map) {
    map = _map;
    this._div = L.DomUtil.create("div", "leaflet-control-zoom leaflet-bar leaflet-control");
    L.DomEvent.disableClickPropagation(this._div);

    pAnchor.classList.add("leaflet-control-zoom-in");
    pAnchor.href = "#";
    pAnchor.innerHTML = '<span><i class="fa fa-search"></i></span>';
    L.DomEvent.on(pAnchor, "click", searchControlActivate);
    L.DomEvent.on(searchField, "input", searchChange);

    this._div.appendChild(pAnchor);
    this._div.appendChild(searchField);
    this._div.appendChild(results);

    return this._div;
  };

  return searchControl;
}

function searchControlActivate(e) {
  e.preventDefault();
  e.stopPropagation();
  searchChange();
}

function searchChange() {
  const input = searchField.value.toUpperCase();

  if (input.match(/^MGRS:/)) {
    const coords = MGRStoLL(input.split(":")[1]);

    results.innerHTML = `
    <ul>
      <li>lat: ${coords[1]}</li>
      <li>lon: ${coords[0]}</li>
      <li></li>
      <li>lat: ${coords[3]}</li>
      <li>lon: ${coords[2]}</li>
      </ul>
    `;

    map.fitBounds([
      [coords[1], coords[0]],
      [coords[3], coords[2]],
    ]);

    return;
  }
  const units = items.getUnits();
  const airports = items.getAirports();

  let found = units.filter((u) => u?.leaflet.json.name?.toUpperCase().match(input));
  found = found.concat(
    airports.filter((u) => u?.leaflet.json.displayName?.toUpperCase().match(input))
  );

  results.innerHTML = `
  <ul>
    ${found
      .map((f) => {
        const name = f?.leaflet.json.name;
        const airportName = f?.leaflet.json.displayName;

        const display = name || "✈" + airportName;
        const displayInfo = f?.leaflet.json.type || f?.leaflet.json.code;

        return `<li>
              <a onclick="openMarkerPopup('${btoa(name)}', '${btoa(
          airportName
        )}')" href="#">${display} (${displayInfo})</a>
          </li>`;
      })
      .join("")}
  </ul>


  `;
}

window.openMarkerPopup = function (name, airportName) {
  name = atob(name).toUpperCase();
  airportName = atob(airportName).toUpperCase();

  if (airportName !== "UNDEFINED") {
    const airports = items.getAirports();
    const apt = airports.find((a) => a?.leaflet.json.displayName.toUpperCase() === airportName);
    openItem(apt);

    return;
  }

  const units = items.getUnits();
  const unit = units.find((u) => u?.leaflet.json.name.toUpperCase() === name);
  openItem(unit);
};

function openItem(item: any) {
  if (!item) return;

  item.openPopup();

  map.setView({
    lat: item.leaflet.lat,
    lng: item.leaflet.lon,
  });
}
