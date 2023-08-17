  
import Handsontable from "handsontable";
// import { log } from "handsontable/helpers";
import "handsontable/dist/handsontable.min.css";
import './waypoints.css';

// import {addClassesToRows,changeCheckboxCell} from "./hooksCallbacks";
import { speedFormat, distanceFormat, latLonFormat } from "./formats";
  
  export function createWaypointTable(data, id: string) {
    const table = document.querySelector("#" + id)!;
    const instance = new Handsontable(table, {
      data,
      colWidths: [140, 50, 70, 40, 50, 30, 55, 50, 60, 50, 50, 150],
      height: 'auto',
      colHeaders: [
        "Name / Action",
        "Type",
        "Alt m",
        "m/s",
        "DIST nm",
        "HDG",
        "ETA",
        "Lat",
        "Lon",
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
        columns: [1, 9, 10],
        indicators: false,
      },
      contextMenu: false,
      // multiColumnSorting: true,
      filters: false,
      rowHeaders: false,
      manualRowMove: false,
      // afterGetColHeader: alignHeaders,
      // afterOnCellMouseDown: changeCheckboxCell,
      // beforeRenderer: addClassesToRows,
      licenseKey: "non-commercial-and-evaluation"
    });

    instance.validateCells();
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
        filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',
        mimeType: 'text/csv',
        rowDelimiter: '\r\n',
        rowHeaders: true
      });
    });

  }