import _, { findIndex } from "lodash";
import { refresh } from "..";
import { Component, Context } from "../types";
import { selectedFriendlies } from "./friendlies";
import "./packages.css";
let _c: Context;

const component: Component = {
  id: "package",
  render: (c: Context = _c) => {
    _c = c;
    const { country } = c;
    const title = '<h4 class="center">PACKAGE</h4><br>';

    if (!selectedFriendlies.length)
      return title + "Select from F R I E N D L Y section by clicking on a friendly group";

    const packagePlanes = country.plane?.group?.filter((g) =>
      selectedFriendlies.includes(g.units?.[0]?.name)
    );
    const planes = packagePlanes?.length
      ? `<span class="icon">✈</span> <ul>${packagePlanes.map(renderGroup).join("") || ""}</ul>`
      : "";

    const packageHelos = country.helicopter?.group?.filter((g) =>
      selectedFriendlies.includes(g.units?.[0]?.name)
    );
    const rotary = packageHelos?.length
      ? `<span class="icon"><b>Ⓗ</b></span> <ul>${
          packageHelos.map(renderGroup).join("") || ""
        }</ul>`
      : "";

    return title + planes + rotary;
  },
};

export default component;

function renderGroup(group: any) {
  const unit = group.units[0];
  const callsign = (unit.callsign?.name || unit.callsign).slice(0, -1);
  // <span class="name">${group.name}</span>
  const content = `<span class="callsign">${callsign}</span> <span class="task">${unit.type}</span> <span class="freq">${group.frequency}</span>`;
  return `<li><a href="#" title="Click to remove from package" onclick="removeSelected('${unit.name}')">${content}</a></li>`;
}

window.removeSelected = function removeSelected(unitName: string) {
  const i = selectedFriendlies.findIndex((s) => s === unitName);
  selectedFriendlies.splice(i, 1);
  setTimeout(() => refresh(component.id), 100);
};
