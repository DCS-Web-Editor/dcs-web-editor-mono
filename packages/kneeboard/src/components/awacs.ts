import { translate } from "@dcs-web-editor-mono/utils";
import { Component, Context } from "../types";
import "./awacs.css";
import { load } from "../cache";
const component: Component = {
  id: "awacs",

  render: (c: Context) => {
    const { country, dictionary } = c;
    const title = `<h4 class="center">AWACS</h4>`;
    const _checked = load("use-group-names");

    const awacs = `<div contenteditable><ul>${
      country.plane?.group
        .map((group) => renderAwacs(group, dictionary, _checked))
        .filter((i) => i)
        .join("") || "No AWACS support"
    }</ul></div>`;

    return title + awacs;
  },

  hasContent: (c: Context) => {
    const { country } = c;
    country.plane?.group.filter((g) => g.task === "AWACS").length;
  },
};

function renderAwacs(group, dictionary, _checked) {
  if (group.task === "AWACS") {
    const unit = group.units[0];

    const callsign = unit.callsign?.name || unit.callsign;
    return `<li><span class="callsign">${_checked ? unit.name : callsign}</span> <b>${translate(
      group.name,
      dictionary
    )}</b> <span class="type">${unit.type}</span> <span class="freq">${
      group.frequency
    }</span></li>`;
  } else return false;
}

export default component;
