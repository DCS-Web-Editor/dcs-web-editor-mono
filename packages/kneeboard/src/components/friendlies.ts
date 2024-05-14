import { refresh } from "..";
import { Component, Context } from "../types";
import "./friendlies.css";

const component: Component = {
  id: "friendlies",
  render: (c: Context) => {
    const { country } = c;
    // console.log(country);
    const title = '<h4 class="center">FRIENDLY</h4><br>';

    const planes = `<span class="icon">✈</span> <ul>${
      country.plane?.group.map(renderGroup).join("") || ""
    }</ul>`;

    const rotary = country.helicopter
      ? `<span class="icon"><b>Ⓗ</b></span> <ul>${
          country.helicopter?.group.map(renderGroup).join("") || ""
        }</ul>`
      : "";

    return title + planes + rotary;
  },
};

export default component;
function renderGroup(group: any) {
  const unit = group.units[0];
  const callsign = unit.callsign?.name || unit.callsign;
  return `<li><a href="#" title="click to add to package" onclick="addPackage('${unit.name}')"><span class="callsign">${callsign}</span> <span class="task">${unit.type}</span> <span class="freq">${group.frequency}</span></a></li>`;
}

export const selectedFriendlies = [];

window.addPackage = function addPackage(unitName) {
  if (!selectedFriendlies.find((n) => n === unitName)) {
    selectedFriendlies.push(unitName);
    setTimeout(() => refresh("package"), 100);
  }
};
