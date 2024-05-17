import { refresh } from "..";
import { load, save } from "../cache";
import { Component, Context } from "../types";
import "./friendlies.css";
import { sortGroup } from "../utils";

export let _checked = load("use-group-names");

const component: Component = {
  id: "friendlies",
  render: (c: Context) => {
    const { country } = c;

    _checked = load("use-group-names");

    const title = `<h4 class="center">FRIENDLY</h4>`;

    const planes = `<span class="icon">✈</span> <ul>${
      country.plane?.group.sort(sortGroup).map(renderGroup).join("") || ""
    }</ul>`;

    const rotary = country.helicopter
      ? `<span class="icon"><b>Ⓗ</b></span> <ul>${
          country.helicopter?.group.sort(sortGroup).map(renderGroup).join("") || ""
        }</ul>`
      : "";

    return title + planes + rotary;
  },
};

export default component;
function renderGroup(group: any) {
  const unit = group.units[0];
  const callsign = (unit.callsign?.name || unit.callsign)?.toString()?.slice(0, -1);
  return `<li><a href="#" title="click to add to package" onclick="addPackage('${
    unit.name
  }')"><span class="callsign">${_checked ? group.name : callsign}</span> <span class="task">${
    unit.type
  }</span> <span class="freq">${group.frequency}</span></a></li>`;
}

export const selectedFriendlies = [];

window.addPackage = function addPackage(unitName) {
  if (!selectedFriendlies.find((n) => n === unitName)) {
    selectedFriendlies.push(unitName);
    setTimeout(() => refresh("package"), 100);
  }
};
