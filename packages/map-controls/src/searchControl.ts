import { MGRStoLL, renderFrequency, toDeg } from "@dcs-web-editor-mono/utils";
import "./searchControl.css";
import { context, followControlToggle } from ".";
import axios from "axios";

/* 
Create Search Control
********************************/

let renderContainer: Function;
let searchField: HTMLInputElement;
let results: HTMLElement;
let items: any;
let map: any;
let pAnchor: HTMLElement;
let translate: Function;
let accessToken: string;

export function isSearchActive() {
    return context.searchMode;
}

export function createSearchControl(
    _renderContainer: Function,
    _items,
    _translate: Function,
    _accessToken = ""
) {
    renderContainer = _renderContainer;
    items = _items;
    translate = _translate;
    accessToken = _accessToken;

    pAnchor = document.createElement("a");
    searchField = document.createElement("input");
    searchField.className = "search-field";
    searchField.placeholder =
        "Type to find unit/airport/beacon or coordinates starting with MGRS:37 X ...";

    pAnchor.title = searchField.title =
        "Shortcut: 'q' Type to find unit/airport/beacon/city or coordinates starting with MGRS:...";

    results = document.createElement("div");
    results.className = "results";

    results.innerHTML = "<h3>Results</h3>";

    const searchControl = L.control({ position: "bottomleft" });

    searchControl.onAdd = function (_map) {
        map = _map;
        this._div = L.DomUtil.create(
            "div",
            "leaflet-control-zoom leaflet-bar leaflet-control"
        );
        L.DomEvent.disableClickPropagation(this._div);

        pAnchor.classList.add("leaflet-control-zoom-in");
        pAnchor.role = "button";
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
    context.searchMode = !context.searchMode;
    if (context.searchMode) {
        pAnchor.classList.add("polyline-measure-controlOnBgColor");
        pAnchor.parentElement.classList.add("show-search-fields");
        setTimeout(searchField.focus.bind(searchField), 10);
    } else {
        pAnchor.classList.remove("polyline-measure-controlOnBgColor");
        pAnchor.parentElement.classList.remove("show-search-fields");
    }

    searchChange();
}

async function searchChange() {
    const input = searchField.value.toUpperCase();

    // MGRS
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

    // LAT LONG
    if (input.match(/^LAT\:/)) {
        const coords = input
            .replace("LAT:", "")
            .replace("LON:", "")
            .replace("LNG:", "")
            .split(",");
        const [lat, lng] = coords.map((c) => parseFloat(c));

        results.innerHTML = `
    <ul>
      <li>lat: ${lat}</li>
      <li>lon: ${lng}</li>
      </ul>
    `;

        map.setView({
            lat,
            lng,
        });

        return;
    }

    // ITEMS
    const units = items.getUnits();
    const airports = items.getAirports();
    const beacons = items.getBeacons();
    const fixes = items.getFixes && items.getFixes();

    // unit name
    let found = units.filter((u) =>
        u?.leaflet.json.name?.toUpperCase().match(input)
    );
    // unit type
    found = found.concat(
        units.filter((u) => u?.leaflet.json.type?.toUpperCase().match(input))
    );

    // airport name
    found = found.concat(
        airports.filter((a) =>
            a?.leaflet.json.displayName?.toUpperCase().match(input)
        )
    );
    // airport code
    found = found.concat(
        airports.filter((a) => a?.leaflet.json.code?.toUpperCase().match(input))
    );

    // beacon name
    found = found.concat(
        beacons.filter((b) =>
            b?.leaflet.json.callsign?.toUpperCase().match(input)
        )
    );
    // beacon code
    found = found.concat(
        beacons.filter((b) =>
            b?.leaflet.json.display_name?.toUpperCase().match(input)
        )
    );

    if (fixes) {
        // fix name
        found = found.concat(
            fixes.filter((b) => b?.name?.toUpperCase().match(input))
        );
    }

    let places = [];
    if (accessToken && input.length > 2) {
        const { lat, lng } = map.getCenter();
        const base = "https://api.mapbox.com/search/geocode/v6/forward";
        const url = `?q=${input}&proximity=${lng.toFixed(4)},${lat.toFixed(4)}`;
        const types = "&types=country,region,postcode,district,place";
        const result = await axios.get(
            base + url + types + `&access_token=${accessToken}`
        );
        places = places.concat(result.data.features.map((f) => f.properties));
        // console.log(places);
    }

    results.innerHTML = `
  <ul>
    ${found
        .filter((i) => i)
        .map(renderLi)
        .join("")}
    ${places.map(renderPlace).join("")}
  </ul>


  `;
}

function encode(s: string) {
    return btoa(encodeURI(s));
}
function decode(s: string) {
    return decodeURI(atob(s));
}

function renderPlace(place) {
    const { latitude, longitude } = place.coordinates;
    return `<li>
    <a onclick="openMarkerPopup('${encode(
        place.name
    )}', 'FALSE', 'FALSE', ${latitude}, ${longitude})" href="#">🏘  ${
        place.full_address
    }</a>
          </li>`;
}

window.goto = function goto(lat: number, lng: number) {
    const latlng = {
        lat,
        lng,
    };
    map.setView(latlng);
};

window.openMarkerPopup = function (
    name,
    airportName = "",
    beaconCode = "",
    lat = 0,
    lng = 0
) {
    name = decode(name).toUpperCase();

    if (airportName !== "UNDEFINED" && airportName !== "FALSE") {
        airportName = decode(airportName).toUpperCase();
        // console.log(airportName);

        const airports = items.getAirports();
        const apt = airports.find(
            (a) => a?.leaflet.json.displayName.toUpperCase() === airportName
        );
        if (apt) {
            openItem(apt);
            return;
        }
    }
    if (beaconCode !== "UNDEFINED" && beaconCode !== "FALSE") {
        beaconCode = decode(beaconCode).toUpperCase();
        // console.log(beaconCode);

        const beacons = items.getBeacons();
        const bcn = beacons.find(
            (b) => b?.leaflet.json.callsign.toUpperCase() === beaconCode
        );
        if (bcn) {
            openItem(bcn);
            return;
        }
    }

    const units = items.getUnits();
    const unit = units.find((u) => u?.leaflet.json.name.toUpperCase() === name);
    if (unit) {
        openItem(unit);
        return;
    }

    // place
    if (lat && lng) {
        map.setView({ lat, lng });
    }
};

function openItem(item: any) {
    // console.debug("open", item);
    if (!item) return;

    item.openPopup();

    if (context.follow && followControlToggle) {
        followControlToggle();
    }

    map.setView({
        lat: item.leaflet.lat,
        lng: item.leaflet.lon,
    });
}
function getCategory(category: string) {
    switch (category) {
        case "vehicle":
            return "🚗";
            break;
        case "plane":
            return "✈";
            break;
        case "helicopter":
            return "🚁";
            break;
        case "ship":
            return "⚓";
            break;
        case "static":
            return "⌂";
            break;

        default:
            return "?";
            break;
    }
}

function renderLi(f) {
    let display = "not found";
    let displayInfo = "";

    if (!f.leaflet) {
        // FIX
        display = "∆ " + translate(f.name) || f.name;
        displayInfo = `(${f.lat + "/" + f.lon})`;
        return `<li>
          <a onclick="goto('${f.lat}', '${f.lon}')" href="#">${display} ${displayInfo}</a>
      </li>`;
    }

    const type = f.leaflet.type || f.leaflet.$type;
    const name = type === "UNIT" && f.leaflet.json.name;
    const airportName = type === "AIRPORT" && f.leaflet.json.displayName;
    const beaconCode = (type === "BEACON" && f.leaflet.json.callsign) || "";
    // console.log(
    //   f.leaflet.type === "AIRPORT",
    //   f.leaflet.json.displayName,
    //   name,
    //   airportName,
    //   beaconCode
    // );

    if (name) {
        // UNIT
        const cat = getCategory(f.leaflet.category);
        display = cat + " " + translate(name) || name;
        displayInfo = `(${f.leaflet.json.type})`;
    } else if (airportName) {
        const airport = f.leaflet?.json;
        if (!airport) return;
        // AIRPORT
        display = `🅐 ${airportName}`;
        // const runways = airport.runways?.map((r) => r.Name).join(", ");
        const headings = airport.runways
            ?.map((r) => toDeg(-r.course + Math.PI) + "°")
            .join(", ");

        displayInfo = `(${airport.code}) HDG ${headings}`;
    } else if (type === "BEACON") {
        // BEACON
        display = `⊙ ${
            beaconCode ||
            f.leaflet?.json.display_name ||
            f.leaflet?.json.type_name
        }`;
        const frequency = f.leaflet?.json.frequency;
        displayInfo = `(${
            (frequency && renderFrequency(frequency)) || "---"
        }) ${beaconTypePretty(f.leaflet?.json.type_name)}`;
    }

    return `<li>
              <a onclick="openMarkerPopup('${encode(name)}', '${encode(
        airportName
    )}', '${encode(beaconCode)}')" href="#">${display} ${displayInfo}</a>
          </li>`;
}

export function beaconTypePretty(type_name: string) {
    switch (type_name) {
        case "PRMG_LOCALIZER":
            return "PRMG LOC";
        case "AIRPORT_HOMER_WITH_MARKER":
            return "MARKER";
        case "HOMER":
            return "NDB";
        case "AIRPORT_HOMER":
            return "NDB";
        case "ILS_LOCALIZER":
            return "ILS LOC";
        case "ILS_FAR_HOMER":
            return "ILS";
        case "ILS_NEAR_HOMER":
            return "ILS";
        case "ILS_GLIDESLOPE":
            return "ILS GS";
        default:
            return type_name;
    }
}
