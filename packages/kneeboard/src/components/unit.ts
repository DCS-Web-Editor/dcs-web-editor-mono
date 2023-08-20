import { Component, Context } from "..";
import './unit.css';

const component: Component = {
  id: 'unit',
  render: (c: Context) => {
    const {unitName, unit} = c;
    
    const callsign = unit?.callsign?.name || unit.callsign;
    return `<b>UNIT</b> <span class="callsign">${callsign}</span> <span class="type">${unit.type}</span> TAIL: ${unit.onboard_num}`
  },
}

export default component;
