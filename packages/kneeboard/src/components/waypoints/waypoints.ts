import Handsontable from "handsontable";
import './waypoints.css';
import { speedFormat, distanceFormat, latLonFormat } from "./waypointFormats";
import { Component, Context } from "../..";
import { getWaypoints } from "./waypointConverter";


const component: Component = {
  id: 'waypoints',

  control: `<button id="export-file">Waypoints .csv</button>`,

  render: (c: Context) => {
    const {group, mission, dictionary} = c;
    const waypointData = getWaypoints(group, mission, dictionary);

    // delay render to make sure element is present
    setTimeout(() => {
      const instance: Handsontable = createWaypointTable(waypointData, '#waypoints-table');
      csvExport(instance);
    }, 10);

    return `<h4 class="center">W A Y P O I N T S</h4>
    <div id="waypoints-table"></div>`;
  },
}

export default component;

  
function csvExport(instance: Handsontable) {
  const exportPlugin = instance.getPlugin('exportFile');
  const csvButton = document.querySelector('#export-file')!;

  csvButton.addEventListener('click', () => {
    exportPlugin.downloadFile('csv', {
      bom: false,
      columnDelimiter: ',',
      columnHeaders: true,
      exportHiddenColumns: true,
      exportHiddenRows: true,
      fileExtension: 'csv',
      filename: 'DCS-Web-Viewer-Waypoint-CSV_[YYYY]-[MM]-[DD]',
      mimeType: 'text/csv',
      rowDelimiter: '\r\n',
      rowHeaders: true
    });
  });
}

function createWaypointTable(data: any[], id: string) {
  const table = document.querySelector(id)!;
  if (!table) throw new Error('Could not find table element: ' + id);

  const instance = new Handsontable(table, {
    data,
    colWidths: [120, 50, 70, 40, 35, 25, 55, 180, 60, 50, 50, 50, 170],
    height: 'auto',
    colHeaders: [
      "Name / Action",
      "Type",
      "Altitude",
      "SPD",
      "DIST",
      "HDG",
      "ETA",
      "Coords",
      'Lat',
      'Lon',
      'X',
      'Y',
      'Notes'
    ],
    columns: [
      { type: "text" },
      { type: "text" },
      { type: "text" },
      { type: "numeric", numericFormat: speedFormat },
      {
        type: "numeric",
        numericFormat: distanceFormat,
        readOnly: true,
      },
      {
        type: "numeric",
        numericFormat: speedFormat,
        readOnly: false,
      },
      { type: "time", timeFormat: 'hh:mm:ss', correctFormat: true },
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
    preventOverflow: 'vertical',
    dropdownMenu: false,
    hiddenColumns: {
      columns: [1, 8, 9, 10, 11],
      indicators: false,
    },
    contextMenu: true,
    // multiColumnSorting: true,
    filters: false,
    rowHeaders: false,
    manualRowMove: false,
    licenseKey: "non-commercial-and-evaluation"
  });

  instance.validateCells();
  
  return instance;
}
