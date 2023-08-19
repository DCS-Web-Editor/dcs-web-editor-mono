import { Component, Context } from "..";

const component: Component = {
  id: 'unit',
  template: `<p id="unit"></p>`,
  render: (c: Context) => {
    const {unitName, unit} = c;
    return `<b>UNIT</b> ${unitName} ${unit?.type} <b>CALLSIGN</b> ${unit?.callsign?.name || unit.callsign}`
  },
}

export default component;
