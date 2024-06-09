import Handsontable from "handsontable";
import { HyperFormula } from "hyperformula";
import "./fuel.css";

import { Component, Context } from "../../types";
import { fuelRates } from "./fuelData";
import { distanceFormat, speedFormat } from "../waypoints/waypointFormats";
import { fuelFormat } from "./fuelFormats";
import { refresh } from "../..";
import state from "../../state";
import { getWaypoints } from "../waypoints/waypointConverter";
import _ from "lodash";
import calculator from "../../calculator";

const hyperformulaInstance = HyperFormula.buildEmpty({
  // to use an external HyperFormula instance,
  // initialize it with the `'internal-use-in-handsontable'` license key
  licenseKey: "internal-use-in-handsontable",
});

let instance;
let alt = state.setAltitude || state.maxAltitude;

const component: Component = {
  id: "fuel",

  render: (c: Context) => {
    // console.log("context", c);

    const { group, mission, dictionary, unit, declination } = c;
    const waypointData = getWaypoints(group, mission, dictionary, declination);
    const lastRow = waypointData[waypointData.length - 1];

    state.loadedFuel = calculator.weight(unit.payload?.fuel);

    state.maxAltitude = _.max(waypointData.map((w) => parseInt(w[2].split(" ")?.[0] || 0)));
    alt = state.setAltitude || state.maxAltitude;
    state.maxDistance = waypointData.reduce((a, w) => w[4] + a, 0);

    let type = c.unit.type;
    let TYPE = type.toUpperCase();

    let msg = "Gray fields are editable. Fuel data by Rocketman";
    let ffr;

    if (!fuelRates[TYPE]) {
      type = TYPE = "DEFAULT";
      msg = "No data, using default values (change FFR to match aircraft)";
      // bingo = bingoData[TYPE]?.[alt];
    }

    if (alt > 30000) {
      ffr = fuelRates[TYPE]?.["30"];
    } else if (alt > 20000) {
      const l = fuelRates[TYPE]?.["20"];
      const h = fuelRates[TYPE]?.["30"];
      const ratio = (alt - 20000) / 10000;
      ffr = calculateFFR(l, h, ratio);
    } else if (alt > 10000) {
      const l = fuelRates[TYPE]?.["10"];
      const h = fuelRates[TYPE]?.["20"];
      const ratio = (alt - 10000) / 10000;
      ffr = calculateFFR(l, h, ratio);
    } else {
      ffr = fuelRates[TYPE]?.["10"];
    }

    // let bingo = bingoData[type.toUpperCase()]?.[alt];

    const { lbs_min, lbs_nm, tas } = ffr;
    const safety = 1.5;

    const tableData = [
      ["FFR fuel flow rate", lbs_nm.toFixed(1), "lbs / nm", lbs_min.toFixed(0), "lbs / min"],
      ["TAXI", , 500, "lbs", "Joker", , "=C8", "lbs"],
      ["Go-Around", , 800, "lbs", "Taxi & Departure", , 1000, "lbs"],
      [
        "Distance Alternate",
        99,
        "=B4 * B1",
        "lbs",
        "Distance to Target (nm)",
        state.maxDistance / 2,
        `=F4 * B1 * ${safety}`,
        "lbs",
      ],
      [
        "Distance Egress",
        state.maxDistance / 2,
        `=B5 * B1`,
        "lbs",
        "Time to Vul (minutes)",
        30,
        `=F5 * D1 * ${safety}`,
        "lbs",
      ],
      ["BINGO", , `=SUM(C1:C5)`, "lbs", "Minimum Mission Fuel", , "=SUM(G1:G5)", "lbs"],
      ["Buffer", , 1000, "lbs", "Additional Margin", , 2000, "lbs"],
      [
        "JOKER",
        ,
        `=SUM(C6 + C7)`,
        "lbs",
        "Loaded / Required Fuel",
        state.loadedFuel,
        "=(G7 + G6)",
        "lbs",
      ],
    ];

    // delay render to make sure element is present
    setTimeout(() => {
      const instance: Handsontable = createFuelTable(tableData, "#fuel-table");
    }, 10);

    return `<h4 class="center">FUEL</h4> ${type} 
    Altitude: <input id="fuel-altitude" style="width: 3rem;" value="${alt}" onchange="updateFuel()"/>
    feet. TAS: ${tas.toFixed(0)}kts <em class="no-print" data-html2canvas-ignore>${msg}</em>
    <div id="fuel-table"></div>`;
  },
};

export default component;

function calculateFFR(l, h, ratio: number) {
  return {
    lbs_min: l.lbs_min * (1 - ratio) + h.lbs_min * ratio,
    lbs_nm: l.lbs_nm * (1 - ratio) + h.lbs_nm * ratio,
    tas: l.tas * (1 - ratio) + h.tas * ratio,
  };
}

window.updateFuel = function updateFuel() {
  const altitude = document.getElementById("fuel-altitude")!.value;
  // console.log(altitude);
  state.setAltitude = alt = altitude;

  setTimeout(() => refresh("fuel"), 100);
};

function createFuelTable(data: any[], id: string) {
  const table = document.querySelector(id)!;
  if (!table) throw new Error("Could not find table element: " + id);

  instance = new Handsontable(table, {
    data,
    // colWidths: [120, 50, 70, 40, 35, 25, 55, 180, 60, 50, 50, 50, 170],
    height: "auto",
    colHeaders: ["Bingo", "", "Fuel", "", "Mission", "", "Fuel", ""],
    columns: [
      { type: "text" },
      { type: "numeric", numericFormat: distanceFormat },
      { type: "numeric", numericFormat: fuelFormat },
      { type: "text", className: "params-row" },
      { type: "text" },
      { type: "numeric", numericFormat: distanceFormat },
      { type: "numeric", numericFormat: fuelFormat },
      { type: "text", className: "params-row" },
    ],
    formulas: {
      engine: hyperformulaInstance,
    },
    preventOverflow: "vertical",
    dropdownMenu: false,
    hiddenColumns: {
      columns: [],
      indicators: false,
    },
    contextMenu: false,
    filters: false,
    rowHeaders: false,
    manualRowMove: false,
    licenseKey: "non-commercial-and-evaluation",
    cells: function (row, col, prop) {
      var cellProperties = {};

      if (row === 0 && col !== 1 && col !== 3) {
        cellProperties.className ||= "params-row";
      }

      return cellProperties;
    },
    cell: [
      {
        col: 0,
        row: 5,
        className: "bold-cell",
      },
      {
        col: 0,
        row: 7,
        className: "bold-cell",
      },
      {
        col: 2,
        row: 5,
        className: "bold-cell",
      },
      {
        col: 2,
        row: 7,
        className: "bold-cell",
      },
      {
        col: 4,
        row: 5,
        className: "bold-cell",
      },
      {
        col: 4,
        row: 7,
        className: "bold-cell",
      },
      {
        col: 6,
        row: 5,
        className: "bold-cell",
      },
      {
        col: 6,
        row: 7,
        className: "bold-cell",
      },
      // actual fuel
      {
        col: 5,
        row: 7,
        type: "numeric",
        numericFormat: fuelFormat,
      },
      // editable
      {
        col: 1,
        row: 0,
        className: "editable-cell",
      },
      {
        col: 1,
        row: 3,
        className: "editable-cell",
      },
      {
        col: 1,
        row: 4,
        className: "editable-cell",
      },
      {
        col: 2,
        row: 1,
        className: "editable-cell",
      },
      {
        col: 2,
        row: 2,
        className: "editable-cell",
      },
      {
        col: 2,
        row: 6,
        className: "editable-cell",
      },
      {
        col: 3,
        row: 0,
        className: "editable-cell",
        type: "numeric",
      },
      {
        col: 5,
        row: 3,
        className: "editable-cell",
      },
      // time
      {
        col: 5,
        row: 4,
        className: "editable-cell",
      },
      {
        col: 6,
        row: 0,
        className: "editable-cell",
      },
      {
        col: 6,
        row: 2,
        className: "editable-cell",
      },
      {
        col: 6,
        row: 6,
        className: "editable-cell",
      },
    ],
  });

  instance.validateCells();

  return instance;
}
