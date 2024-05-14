import Handsontable from "handsontable";
import { HyperFormula } from "hyperformula";
import "./fuel.css";

import { Component, Context } from "../../types";
import { bingoData, fuelRates } from "./fuelData";
import { distanceFormat, speedFormat } from "../waypoints/waypointFormats";
import { fuelFormat } from "./fuelFormats";

const hyperformulaInstance = HyperFormula.buildEmpty({
  // to use an external HyperFormula instance,
  // initialize it with the `'internal-use-in-handsontable'` license key
  licenseKey: "internal-use-in-handsontable",
});

const component: Component = {
  id: "fuel",

  render: (c: Context) => {
    // console.log("context", c);

    const type = c.unit.type;

    const alt = 30;
    const bingo = bingoData[type][alt];
    const ffr = fuelRates[type][alt];
    const safety = 1.5;

    const tableData = [
      ["TAXI", , 500, "lbs", "Joker", , "=C7", "lbs"],
      ["Go-Around", , 800, "lbs", "Taxi & Departure", , 1000, "lbs"],
      [
        "Distance Alternate",
        100,
        "=B3 * 10",
        "lbs",
        "Fuel To Target",
        455,
        `=F3 * ${ffr.lbs_nm} * ${safety}`,
        "lbs",
      ],
      [
        "Distance Egress",
        300,
        `=B4 * ${ffr.lbs_nm}`,
        "lbs",
        "Fuel To Vul",
        30,
        `=F4 * ${ffr.lbs_min} * ${safety}`,
        "lbs",
      ],
      ["BINGO", , `=SUM(C0:C4)`, "lbs", "Minimum Mission Fuel", , "=SUM(G0:G4)", "lbs"],
      ["Buffer", , 1000, "lbs", "Additional Margin", , 2000, "lbs"],
      ["JOKER", , `=SUM(C5 + C6)`, "lbs", "Required Mission Fuel", , "=(G6 + G5)", "lbs"],
    ];

    // delay render to make sure element is present
    setTimeout(() => {
      const instance: Handsontable = createFuelTable(tableData, "#fuel-table");
    }, 10);

    return `<h4 class="center">FUEL</h4>${type} FFR at ${alt}k: ${ffr.lbs_nm.toFixed(1)} lb/nm
    <div id="fuel-table"></div>`;
  },
};

export default component;

function createFuelTable(data: any[], id: string) {
  const table = document.querySelector(id)!;
  if (!table) throw new Error("Could not find table element: " + id);

  const instance = new Handsontable(table, {
    data,
    // colWidths: [120, 50, 70, 40, 35, 25, 55, 180, 60, 50, 50, 50, 170],
    height: "auto",
    colHeaders: ["Bingo", "Distance", "Fuel", "", "Mission", "Distance", "Fuel", ""],
    columns: [
      { type: "text" },
      { type: "numeric", numericFormat: distanceFormat },
      { type: "numeric", numericFormat: fuelFormat },
      { type: "text" },
      { type: "text" },
      { type: "numeric", numericFormat: distanceFormat },
      { type: "numeric", numericFormat: fuelFormat },
      { type: "text" },
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
    contextMenu: true,
    // multiColumnSorting: true,
    filters: false,
    rowHeaders: false,
    manualRowMove: false,
    licenseKey: "non-commercial-and-evaluation",
    // columnSummary: [
    //   {
    //     //speed
    //     sourceColumn: 3,
    //     destinationRow: 0,
    //     destinationColumn: 3,
    //     reversedRowCoords: true,
    //     type: "max",
    //     forceNumeric: true,
    //   },
    //   {
    //     // distance
    //     sourceColumn: 4,
    //     destinationRow: 0,
    //     destinationColumn: 4,
    //     reversedRowCoords: true,
    //     type: "sum",
    //     forceNumeric: true,
    //   },
    // ],
    cell: [
      {
        col: 0,
        row: 4,
        className: "bold-cell",
      },
      {
        col: 0,
        row: 6,
        className: "bold-cell",
      },
      {
        col: 2,
        row: 4,
        className: "bold-cell",
      },
      {
        col: 2,
        row: 6,
        className: "bold-cell",
      },
      {
        col: 4,
        row: 4,
        className: "bold-cell",
      },
      {
        col: 4,
        row: 6,
        className: "bold-cell",
      },
      // editable
      {
        col: 1,
        row: 2,
        className: "editable-cell",
      },
      {
        col: 1,
        row: 3,
        className: "editable-cell",
      },
      {
        col: 2,
        row: 0,
        className: "editable-cell",
      },
      {
        col: 2,
        row: 1,
        className: "editable-cell",
      },
      {
        col: 2,
        row: 5,
        className: "editable-cell",
      },
      {
        col: 5,
        row: 2,
        className: "editable-cell",
      },
      {
        col: 5,
        row: 3,
        className: "editable-cell",
      },
      {
        col: 6,
        row: 1,
        className: "editable-cell",
      },
      {
        col: 6,
        row: 5,
        className: "editable-cell",
      },
    ],
  });

  instance.validateCells();

  return instance;
}
