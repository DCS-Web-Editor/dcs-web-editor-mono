import { Component, Context } from "..";
import './unit.css';

const component: Component = {
  id: 'unit',
  template: `<p id="unit"></p>`,
  render: (c: Context) => {
    const {unitName, unit} = c;
    return `<b>UNIT</b> ${unitName}. ${unit?.type}. CALLSIGN: <span class="callsign">${unit?.callsign?.name || unit.callsign}</span>`
  },
}

export default component;
