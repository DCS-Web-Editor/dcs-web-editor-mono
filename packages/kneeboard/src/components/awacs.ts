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

    const awacs = `<ul>${
      country.plane?.group
        .map((group) => {
          if (group.task === "AWACS") {
            const unit = group.units[0];

            // console.log(group);

            const callsign = unit.callsign?.name || unit.callsign;
            return `<li><span class="callsign">${
              _checked ? unit.name : callsign
            }</span> <b>${translate(group.name, dictionary)}</b> <span class="type">${
              unit.type
            }</span> <span class="freq">${group.frequency}</span></li>`;
          } else return false;
        })
        .filter((i) => i)
        .join("") || "No AWACS support"
    }</ul>`;

    return title + awacs;
  },
};

export default component;
