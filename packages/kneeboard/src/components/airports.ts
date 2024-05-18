import { translate } from "@dcs-web-editor-mono/utils";
import { Component, Context } from "../types";
import "./airports.css";
import axios from "axios";
import { refresh } from "..";
import state from "../state";

const ids = ["airports1", "airports2", "airports3"];

const component: Component = {
  id: "airports",
  render: (c: Context) => {
    const { mission, dictionary } = c;
    const { theatre } = mission;

    const title = `<h4 class="center">AIRPORTS</h4>`;

    if (!state.airports) {
      axios.get(`airports/${theatre}.json`).then(airportsLoaded);
      return title + "Loading....";
    }

    ids.forEach((a) => {
      const e = document.getElementById(a);
      if (e) e.removeEventListener("change", selectAirport);
    });

    state.DEP ||= state.airports[0].typeName;
    state.ARR ||= state.airports[0].typeName;
    state.ALT ||= state.airports[0].typeName;

    const info = `
    <div class="airport-info">
        <label for="departure">DEP</label>
        <select id="airports1">${state.airports.map((a) => renderOption(a, "DEP"))}</select>
        ${renderInfo("DEP")}
    </div>
    
    <div class="airport-info">
        <label for="arrival">ARR</label>
        <select id="airports2">${state.airports.map((a) => renderOption(a, "ARR"))}</select>
         ${renderInfo("ARR")}
    </div>

    <div class="airport-info">
        <label for="alternate">ALT</label>
        <select id="airports3">${state.airports.map((a) => renderOption(a, "ALT"))}</select>
        ${renderInfo("ALT")}
    </div>
    `;

    setTimeout(() => {
      ids.forEach((a) => {
        const e = document.getElementById(a);
        if (e) e.addEventListener("change", selectAirport);
      });
    }, 0);

    return title + info;
  },
};

export default component;

function airportsLoaded(res) {
  state.airports = res.data;
  refresh("airports");
}

function renderOption(airport: any, phase: string) {
  const selected = airport.typeName === state[phase] ? "selected" : "";
  return `<option value="${airport.typeName}" ${selected}>${airport.displayName}</option>`;
}

function selectAirport(e) {
  const { target } = e;
  if (target.id === ids[0]) {
    state.DEP = target.value;
  }
  if (target.id === ids[1]) {
    state.ARR = target.value;
  }
  if (target.id === ids[2]) {
    state.ALT = target.value;
  }

  setTimeout(() => refresh("airports"), 0);
}

function renderInfo(phase: string) {
  const type = state[phase];
  if (!type) return `Select ${phase}`;

  const airport = state.airports.find((a) => a.typeName === type);
  if (!airport) return "NOT FOUND";

  const atc = airport.airdromeData?.ATC?.map(mapFrequency).join(", ") ?? "-";
  const tacan = airport.airdromeData?.TACAN?.length
    ? `TAC ${airport.airdromeData?.TACAN?.map(mapFrequency).join(", ")}`
    : "";
  const ils = airport.airdromeData?.ILS?.length
    ? `ILS ${airport.airdromeData?.ILS?.map(mapFrequency).join(", ") ?? "-"}`
    : "";

  return `${airport.code}
    ${atc} ${tacan} ${ils}
  `;
}

function mapFrequency(freq: number) {
  if (freq > 1000000) return (freq / 1000000).toFixed(1); // + "Mhz";
  if (freq > 1000) return (freq / 1000).toFixed(1); //+ "khz";
  else return freq;
}
