import { Component, Context } from "../types";
import "./airports.css";
import axios from "axios";
import { refresh } from "..";
import state from "../state";

const airportIds = ["airport1", "airport2", "airport3"];
const runwayIds = ["airport1-runways", "airport2-runways", "airport3-runways"];
const notes = `<div contenteditable class="mini-notes">Enter notes or delete</div>`;

const component: Component = {
  id: "airports",
  render: (c: Context) => {
    const { mission, group } = c;
    const { theatre } = mission;

    const title = `<h4 class="center">AIRPORTS</h4>`;

    if (!state.airports) {
      axios.get(`airports/${theatre}.json`).then(airportsLoaded);
      return title + "Loading....";
    }

    addEventListeners();

    const firstWP = group.route?.points?.[0];
    const lastWP = group.route?.points?.[group.route?.points?.length - 1];

    state.DEP ||= firstWP?.airdromeId || state.airports[0].ID;
    state.ARR ||= lastWP?.airdromeId || state.airports[0].ID;
    state.ALT ||= state.airports[0].ID;

    const runwaysDep = parseRunways("DEP") || [];
    const runwaysArr = parseRunways("ARR") || [];
    const runwaysAlt = parseRunways("ALT") || [];

    const info = `
    <div class="airport-info">
        <label for="departure">DEP</label>
        <select id="airport1">${state.airports.map((a) => renderOption(a, "DEP"))}</select>
        <select id="airport1-runways", "airport1-runways>${runwaysDep.map((a) =>
          renderRunwayOption(a, "DEP_RUNWAY")
        )}</select>
        ${renderFreqInfo("DEP")}
    </div>
    
    <div class="airport-info">
        <label for="arrival">ARR</label>
        <select id="airport2">${state.airports.map((a) => renderOption(a, "ARR"))}</select>
        <select id="airport2-runways">${runwaysArr.map((a) =>
          renderRunwayOption(a, "ARR_RUNWAY")
        )}</select>
         ${renderFreqInfo("ARR")}
    </div>

    <div class="airport-info">
        <label for="alternate">ALT</label>
        <select id="airport3">${state.airports.map((a) => renderOption(a, "ALT"))}</select>
        <select id="airport3-runways">${runwaysAlt.map((a) =>
          renderRunwayOption(a, "ALT_RUNWAY")
        )}</select>
        ${renderFreqInfo("ALT")}
    </div>
    `;

    setTimeout(() => {
      removeEventListeners();
    }, 0);

    return title + info;
  },
};

export default component;

function addEventListeners() {
  airportIds.forEach((a) => {
    const e = document.getElementById(a);
    if (e) e.removeEventListener("change", selectAirport);
  });
  runwayIds.forEach((a) => {
    const e = document.getElementById(a);
    if (e) e.removeEventListener("change", selectRunway);
  });
}

function removeEventListeners() {
  airportIds.forEach((a) => {
    const e = document.getElementById(a);
    if (e) e.addEventListener("change", selectAirport);
  });
  runwayIds.forEach((a) => {
    const e = document.getElementById(a);
    if (e) e.addEventListener("change", selectRunway);
  });
}

function parseRunways(stage: string) {
  return state.airports
    .find((a) => a.ID === state[stage])
    ?.runways?.flatMap((r) => [r.Name + "L", r.Name + "R"]);
}

function airportsLoaded(res) {
  state.airports = res.data;
  refresh("airports");
}

function renderOption(airport: any, phase: string) {
  const selected = airport.ID === state[phase] ? "selected" : "";
  console.log(selected, airport.ID, state[phase]);

  return `<option value="${airport.ID}" ${selected}>${airport.displayName}</option>`;
}
function renderRunwayOption(runway: any, phase: string) {
  const selected = runway === state[phase] ? "selected" : "";
  return `<option value="${runway}" ${selected}>${runway}</option>`;
}

function selectAirport(e) {
  const { target } = e;
  if (target.id === airportIds[0]) {
    state.DEP = parseInt(target.value);
  }
  if (target.id === airportIds[1]) {
    state.ARR = parseInt(target.value);
  }
  if (target.id === airportIds[2]) {
    state.ALT = parseInt(target.value);
  }

  setTimeout(() => refresh("airports"), 0);
}
function selectRunway(e) {
  const { target } = e;
  if (target.id === runwayIds[0]) {
    state.DEP_RUNWAY = target.value;
  }
  if (target.id === runwayIds[1]) {
    state.ARR_RUNWAY = target.value;
  }
  if (target.id === runwayIds[2]) {
    state.ALT_RUNWAY = target.value;
  }
}

function renderFreqInfo(phase: string) {
  const type = state[phase];
  if (!type) return `Select ${phase}`;

  const airport = state.airports.find((a) => a.ID === type);
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
