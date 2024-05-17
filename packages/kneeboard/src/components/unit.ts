import { load } from "../cache";
import { Component, Context } from "../types";
import "./unit.css";

const component: Component = {
  id: "unit",
  render: (c: Context) => {
    const { unitName, unit } = c;
    const _checked = load("use-group-names");

    const callsign = (unit.callsign?.name || unit.callsign)?.toString();
    return `<h4 class="center">UNIT</h4> <span class="callsign">${
      _checked ? unit.name : callsign
    }</span> <span class="type">${unit.type}</span> TAIL: ${unit.onboard_num}`;
  },
};

export default component;
