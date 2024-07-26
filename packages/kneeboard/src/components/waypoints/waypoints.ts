import Handsontable from "handsontable";
// import { HyperFormula } from "hyperformula";
import { speedFormat, distanceFormat, latLonFormat, hdgFormat } from "./waypointFormats";
import { Component, Context } from "../../types";
import { findCol, getWaypoints } from "./waypointConverter";
import { TimeZones } from "@dcs-web-editor-mono/map-projection";

import "./waypoints.css";
import _ from "lodash";
import calculator from "../../calculator";

let timeOffset = 0;

const component: Component = {
  id: "waypoints",

  control: `<button id="export-file">Waypoints .csv</button>`,

  render: (c: Context) => {
    const { group, mission, dictionary, declination } = c;
    timeOffset = TimeZones[mission.theatre] || 0;

    const waypointData = getWaypoints(group, mission, dictionary, declination);

    // delay render to make sure element is present
    setTimeout(() => {
      const instance: Handsontable = createWaypointTable(
        waypointData,
        "#waypoints-table",
        group.route?.points
      );
      csvExport(instance);
    }, 10);

    return `<h4 class="center">WAYPOINT</h4>
    <div id="waypoints-table"></div>`;
  },
};

export default component;

function csvExport(instance: Handsontable) {
  const exportPlugin = instance.getPlugin("exportFile");
  const csvButton = document.querySelector("#export-file")!;

  csvButton.addEventListener("click", () => {
    exportPlugin.downloadFile("csv", {
      bom: false,
      columnDelimiter: ",",
      columnHeaders: true,
      exportHiddenColumns: true,
      exportHiddenRows: true,
      fileExtension: "csv",
      filename: "DCS-Web-Viewer-Waypoint-CSV_[YYYY]-[MM]-[DD]",
      mimeType: "text/csv",
      rowDelimiter: "\r\n",
      rowHeaders: true,
    });
  });
}

const colHeaders = [
  "Name / Action",
  "Type",
  "MHDG",
  "DIST",
  "Altitude",
  "SPD",
  "LOCAL",
  "ZULU",
  "Coords",
  "Lat",
  "Lon",
  "X",
  "Y",
  "Notes",
];

function createWaypointTable(data: any[], id: string, points: any[]) {
  const table = document.querySelector(id)!;
  if (!table) throw new Error("Could not find table element: " + id);
  const { maxAltitude, ETA } = points[points.length - 1];

  const totalTime = new Date(Math.round((ETA || 0) * 1000))
    .toISOString()
    .split("T")[1]
    ?.slice(0, 8);

  data.push([
    "TOTAL/MAX",
    "",
    null,
    null,
    maxAltitude === 2000 ? "DEFAULT" : calculator.altitude(maxAltitude) + " MAX",
    null,
    totalTime,
    "GMT " + (timeOffset > 0 ? "+" : "") + timeOffset,
    null,
    null,
    null,
    null,
    "",
  ]);

  const rowHeaders = _.range(0, points.length);
  rowHeaders.push("");

  const instance = new Handsontable(table, {
    data,
    colWidths: [110, 35, 35, 40, 70, 25, 55, 50, 180, 60, 50, 50, 50, 170],
    height: "auto",
    colHeaders,
    columns: [
      { type: "text" },
      { type: "text" },
      // MHDG
      {
        type: "numeric",
        numericFormat: hdgFormat,
      },
      // DIST
      {
        type: "numeric",
        numericFormat: distanceFormat,
        readOnly: true,
      },
      // ALT
      { type: "text" },
      // SPD
      {
        type: "numeric",
        numericFormat: speedFormat,
        readOnly: false,
      },
      { type: "text" },
      { type: "text" },
      { type: "text" },
      { type: "numeric", numericFormat: latLonFormat, readOnly: true },
      { type: "numeric", numericFormat: latLonFormat, readOnly: true },
      { type: "numeric", numericFormat: latLonFormat, readOnly: true },
      { type: "numeric", numericFormat: latLonFormat, readOnly: true },
      {
        type: "text",
        readOnly: false,
      },
    ],
    preventOverflow: "vertical",
    dropdownMenu: false,
    hiddenColumns: {
      columns: [findCol("type"), findCol("lat"), findCol("lon"), findCol("x"), findCol("y")],
      indicators: false,
    },
    contextMenu: true,
    // multiColumnSorting: true,
    filters: false,
    rowHeaders,
    rowHeaderWidth: 20,
    manualRowMove: false,
    licenseKey: "non-commercial-and-evaluation",
    columnSummary: [
      {
        // SPD
        sourceColumn: findCol("cspeed"),
        destinationRow: 0,
        destinationColumn: findCol("cspeed"),
        reversedRowCoords: true,
        type: "max",
        forceNumeric: true,
      },
      {
        // DIST
        sourceColumn: findCol("distance"),
        destinationRow: 0,
        destinationColumn: findCol("distance"),
        reversedRowCoords: true,
        type: "sum",
        forceNumeric: true,
      },
    ],
  });

  instance.validateCells();

  return instance;
}
