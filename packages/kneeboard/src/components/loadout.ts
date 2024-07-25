import { Component, Context } from "../types";
import calculator from "../calculator";
import "./loadout.css";

const component: Component = {
  id: "loadout",

  render: (c: Context) => {
    const { unit } = c;
    const title = `<h4 class="center">LOADOUT</h4>`;
    if (!unit.payload) return title;

    const fuel = calculator.weight(unit.payload.fuel).toFixed(0);
    const fuelUnit = calculator.weightUnit();

    function pylons() {
      const hasPylons = unit.payload?.pylons?.length;
      if (hasPylons) return `<ul>${unit.payload?.pylons?.map(renderPylon).join("\n")}</ul>`;
      else return " ---";
    }

    return (
      title +
      `<span class="label">FUEL</span> ${fuel}${fuelUnit} <span class="label">CHAFF</span> ${unit.payload.chaff} <span class="label">FLARES</span> ${unit.payload.flare} <span class="label">GUN</span> ${unit.payload.gun}%` +
      pylons()
    );
  },
};

function renderPylon(pylon, i: number) {
  if (!pylon) return `<li>---</li>`;
  const weapon = window.JSON_DATA.Weapons.find((w) => w.CLSID === pylon.CLSID);
  return `<li>${i + 1}★ ${weapon?.displayName || "???"}</li>`;
}

export default component;
