import Handsontable from "handsontable";
import { HyperFormula } from "hyperformula";
import "./fuel.css";

import { Component, Context } from "../../types";
import { bingoData, fuelRates } from "./fuelData";
import { distanceFormat, speedFormat } from "../waypoints/waypointFormats";
import { fuelFormat } from "./fuelFormats";
import { refresh } from "../..";

const hyperformulaInstance = HyperFormula.buildEmpty({
  // to use an external HyperFormula instance,
  // initialize it with the `'internal-use-in-handsontable'` license key
  licenseKey: "internal-use-in-handsontable",
});

let instance;
let alt = "30";

const component: Component = {
  id: "fuel",

  render: (c: Context) => {
    // console.log("context", c);

    let type = c.unit.type;

    let msg = "Gray fields are editable. Fuel data by Rocketman";
    let bingo = bingoData[type.toUpperCase()]?.[alt];
    let ffr = fuelRates[type.toUpperCase()]?.[alt];

    if (!bingo || !ffr) {
      type = "DEFAULT";
      msg =
        "Fuel data not found, using default values ( change FFR to match aircraft performance )";
      bingo = bingoData[type.toUpperCase()]?.[alt];
      ffr = fuelRates[type.toUpperCase()]?.[alt];
    }

    const { lbs_min, lbs_nm } = ffr;
    const safety = 1.5;

    const tableData = [
      ["FFR fuel flow rate", lbs_nm.toFixed(1), "lbs / nm", lbs_min.toFixed(0), "lbs / min"],
      ["TAXI", , 500, "lbs", "Joker", , "=C8", "lbs"],
      ["Go-Around", , 800, "lbs", "Taxi & Departure", , 1000, "lbs"],
      [
        "Distance Alternate",
        100,
        "=B4 * 10",
        "lbs",
        "Distance to Target (nm)",
        999,
        `=F4 * B1 * ${safety}`,
        "lbs",
      ],
      [
        "Distance Egress",
        999,
        `=B5 * B1`,
        "lbs",
        "Time to Vul (minutes)",
        30,
        `=F5 * D1 * ${safety}`,
        "lbs",
      ],
      ["BINGO", , `=SUM(C1:C5)`, "lbs", "Minimum Mission Fuel", , "=SUM(G1:G5)", "lbs"],
      ["Buffer", , 1000, "lbs", "Additional Margin", , 2000, "lbs"],
      ["JOKER", , `=SUM(C6 + C7)`, "lbs", "Required Mission Fuel", , "=(G7 + G6)", "lbs"],
    ];

    // delay render to make sure element is present
    setTimeout(() => {
      const instance: Handsontable = createFuelTable(tableData, "#fuel-table");
    }, 10);

    return `<h4 class="center">FUEL</h4> ${type} 
    Altitude: <select id="fuel-altitude" onchange="updateFuel()">
    <option value="10" ${alt === "10" ? "selected" : ""}>10,000</option>
    <option value="20" ${alt === "20" ? "selected" : ""}>20,000</option>
    <option value="30" ${alt === "30" ? "selected" : ""}>30,000</option>
    </select> feet <em class="no-print" data-html2canvas-ignore>${msg}</em>
    <div id="fuel-table"></div>`;
  },
};

export default component;

window.updateFuel = function updateFuel() {
  const altitude = document.getElementById("fuel-altitude")!.value;
  // console.log(altitude);
  alt = altitude;
  setTimeout(() => refresh("fuel"), 100);
};

function createFuelTable(data: any[], id: string) {
  const table = document.querySelector(id)!;
  if (!table) throw new Error("Could not find table element: " + id);

  instance = new Handsontable(table, {
    data,
    // colWidths: [120, 50, 70, 40, 35, 25, 55, 180, 60, 50, 50, 50, 170],
    height: "auto",
    colHeaders: ["Bingo", "Distance", "Fuel", "", "Mission", "", "Fuel", ""],
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
