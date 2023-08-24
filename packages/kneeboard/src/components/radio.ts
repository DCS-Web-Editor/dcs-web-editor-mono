import Handsontable from "handsontable";

import { Component, Context } from "..";
import './radio.css';

const component: Component = {
  id: 'radio',

  render: (c: Context) => {
    const {unit} = c;
    const title = `<h4 class="center">RADIO</h4>`;
    const table = `<div id="radio-table"></div>`;
    if (!unit.Radio) return title + '<span>No Channels</span>';

    
    const data = unit.Radio.map((radio, n) => {
        return radio.channels.map((channel, i) => [channel, radio.modulation?.[i]])
    });

    
    setTimeout(() => createRadioTable(data, '#radio-table'), 10);

    return title + 'AM, ∿ = FM' + table ;
  },
}

export default component;

export const radioFormat = {
  pattern: {
    thousandSeparated: false,
  }
};

function customRenderer(hotInstance, td, row, column, prop, value, cellProperties) {
  if (!value) return;
  let [channel, modulation] = value;
  
  Handsontable.renderers.BaseRenderer.apply(this, arguments);
  channel = channel.toString().match('.') ? channel.toString().replace('.', '.\n<span class="comma-freq">') + '</span>' : channel;
  const mod = modulation === 1 ? '∿' : '';

  td.innerHTML = `${mod}${channel}`
}

// Register an alias
Handsontable.renderers.registerRenderer('radio', customRenderer);

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
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
      { type: "numeric", renderer: 'radio' },
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
