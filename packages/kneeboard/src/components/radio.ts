import Handsontable from "handsontable";
import "handsontable/dist/handsontable.min.css";

import { Component, Context } from "..";
import './radio.css';

const component: Component = {
  id: 'radio',
  template: `<div id="radio">
    <h4 class="center">R A D I O</h4>
    <div id="radio-table"></div>
  </div>`,
  render: (c: Context) => {
    const {unit} = c;
    // console.log('Radio', unit.Radio);

    if (!unit.Radio) return '<span>No Channels</span>';
    
    const data = unit.Radio?.map((radio, n) => {
        return radio.channels.map((channel, i) => 
            `${channel}${radio.modulation && radio.modulation[i] === 1 ? '∿' : ''}`)
    });


    createRadioTable(data, '#radio-table');
    // return `<h4 class="center">R A D I O</h4>${
    //   unit.Radio?.map((radio, n) => {
    //     return  `<ul>Radio ${n + 1})
    //       ${
    //         radio.channels.map((channel, i) => 
    //         `<li>${channel}${radio.modulation && radio.modulation[i] === 1 ? ' FM' : ' AM'}</li>`).join('')
    //       }
    //     </ul>`;
    //   }).join('<br>') || 'No Channels'
    // }`
    return 'AM, ∿ = FM';
  },
}

export default component;

export const radioFormat = {
  pattern: {
    thousandSeparated: false,
  }
};

function createRadioTable(data: any[], id: string) {
  const table = document.querySelector(id)!;
  if (!table) throw new Error('Could not find table element: ' + id);

  const instance = new Handsontable(table, {
    data,
    width: '100%',
    colWidths: 36,
    height: 'auto',
    colHeaders: [1,2,3,4,5,6,7,8,9,10,11, 12, 13, 14, 15, 16, 17, 18, 19,20],
    columns: [
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
      { type: "numeric", numericFormat: radioFormat },
    ],
    preventOverflow: 'vertical',
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
    licenseKey: "non-commercial-and-evaluation"
  });

  instance.validateCells();
  return instance;
}
