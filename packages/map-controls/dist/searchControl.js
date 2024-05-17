import "./searchControl.css";
/*
Create Search Control
********************************/
let renderContainer;
let searchField;
let results;
let items;
let map;
export function createSearchControl(_renderContainer, _items) {
    renderContainer = _renderContainer;
    items = _items;
    const pAnchor = document.createElement("a");
    searchField = document.createElement("input");
    searchField.className = "search-field";
    searchField.placeholder = "Type to find unit/airport/beacon...";
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
    const units = items.getUnits();
    const airports = items.getAirports();
    let found = units.filter((u) => u?.leaflet.json.name?.toUpperCase().match(input));
    found = found.concat(airports.filter((u) => u?.leaflet.json.displayName?.toUpperCase().match(input)));
    results.innerHTML = `
  <ul>
    ${found
        .map((f) => {
        const name = f?.leaflet.json.name;
        const airportName = f?.leaflet.json.displayName;
        const display = name || "✈" + airportName;
        const displayInfo = f?.leaflet.json.type || f?.leaflet.json.code;
        return `<li>
              <a onclick="openMarkerPopup('${btoa(name)}', '${btoa(airportName)}')" href="#">${display} (${displayInfo})</a>
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
function openItem(item) {
    if (!item)
        return;
    item.openPopup();
    map.setView({
        lat: item.leaflet.lat,
        lng: item.leaflet.lon,
    });
}
