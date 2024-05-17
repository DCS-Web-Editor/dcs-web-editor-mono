import { load } from "../cache";
import { Component, Context } from "../types";
import "./group.css";

const component: Component = {
  id: "group",
  render: (c: Context) => {
    const { groupName, group } = c;
    const _checked = load("use-group-names");

    const unit = group.units[0];
    return `<h4 class="center">GROUP</h4> <span class="callsign">${group.units
      .map((unit) => (_checked ? unit.name : unit.callsign?.name || unit.callsign))
      .join(", ")}</span>
&nbsp; <span class="type">${unit.type}</span> FREQ: ${group?.frequency} TASK: ${group?.task}
    `;
  },
};

export default component;
