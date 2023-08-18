import { Component, Context } from "..";

const component: Component = {
  id: 'group',
  template: `<p id="group"></p>`,
  render: (c: Context) => {
    const {groupName, group} = c;
    return `<b>GROUP</b> ${groupName} FREQ: ${group?.frequency} TASK: ${group?.task}`
  },
}

export default component;
