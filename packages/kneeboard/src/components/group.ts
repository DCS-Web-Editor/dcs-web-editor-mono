import { Component, Context } from "..";
import './group.css';

const component: Component = {
  id: 'group',
  template: `<p id="group"></p>`,
  render: (c: Context) => {
    const {groupName, group} = c;
    return `<b>GROUP</b> ${groupName}. FREQ: ${group?.frequency}. TASK: ${group?.task}.
    CALLSIGNS: <span class="callsign">${group.units.map((unit) => unit.callsign?.name || unit.callsign).join(', ')}</span>
    `
  },
}

export default component;
