import { Component, Context } from "..";

const component: Component = {
  id: 'group',
  template: `<p id="group"></p>`,
  render: (c: Context) => {
    const {groupName, group} = c;
    return `<b>GROUP</b> ${groupName} FREQ: ${group?.frequency} TASK: ${group?.task}
    <b>MEMBERS</b> ${group.units.map((unit) => unit.callsign?.name || unit.callsign).join(', ')}
    `
  },
}

export default component;
