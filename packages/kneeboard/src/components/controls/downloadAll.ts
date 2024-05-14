import html2canvas from "html2canvas";

import { Component, Context, renderKneeboard } from "../..";
import "./downloadAll.css";

const clients = [];

const options = [
  {
    label: "Blue",
    value: "blue",
  },
  {
    label: "Red",
    value: "red",
  },
  {
    label: "Neutral",
    value: "neutrals",
  },
];
const categoryOptions = [
  {
    label: "Airplane",
    value: "plane",
  },
  {
    label: "Helicopter",
    value: "helicopter",
  },
  {
    label: "Ground",
    value: "vehicle",
  },
  {
    label: "Ship",
    value: "ship",
  },
];

let coalitionName = "blue";
let category = "plane";

const component: Component = {
  id: "download-all",
  template: false,
  control: `
  <div id="download-all" class="button-group">
  <button id="download-all-button" title="Download PDF document for each multiplayer Client in coalition. May take some time...">All Client PDF (MP)</button>
  <select name="coalitionSelect" id="download-select-coalition" title="Download all PDF for coalition">
    ${options.map((o) => {
      return `<option value="${o.value}" ${coalitionName === o.value ? "selected" : ""}>${
        o.label
      }</option>`;
    })}
</select>
  <select name="typeSelect" id="download-select-category" title="Download all PDF for category">
    ${categoryOptions.map((o) => {
      return `<option value="${o.value}" ${category === o.value ? "selected" : ""}>${
        o.label
      }</option>`;
    })}
</select>
</div>
`,
  render: async (c: Context) => {
    const { mission, dictionary } = c;

    coalitionName = c.coalitionName;
    category = c.category;

    const categorySelect = document.querySelector("#download-select-category")!;
    categorySelect.addEventListener("change", (e) => (category = e.target.value));
    categorySelect.value = category;

    const coalitionSelect = document.querySelector("#download-select-coalition")!;
    coalitionSelect.addEventListener("change", (e) => (coalitionName = e.target.value));
    coalitionSelect.value = coalitionName;

    const downloadAll = document.querySelector("#download-all-button")!;

    downloadAll.removeEventListener("click", () => allClients());
    downloadAll.addEventListener("click", () => allClients());

    async function allClients() {
      console.debug("Export all PDFs", coalitionName, category);
      clients.length = 0;

      const coalition = mission.coalition[coalitionName];
      const countries = coalition.country;
      for (const country of countries) {
        const groups = country[category]?.group;
        if (!groups) continue;

        for (const group of groups) {
          const units = group.units.filter((u) => u.skill === "Client");
          if (!units.length) continue;

          for (const unit of units) {
            if (!unit) continue;
            // console.log(unit.name);
            clients.push(unit);
            downloadAll.innerHTML = `PDF All Clients (${clients.length}..)`;

            await timeout(500);
            renderKneeboard(
              unit.name,
              group.name,
              category,
              country.name,
              coalitionName,
              mission,
              dictionary,
              { noControls: true }
            );
            await timeout(500);
            makePdf();
            await timeout(3000);
          }

          // clients.push(unit);
          // groups.push(group)
        }
      }
      downloadAll.innerHTML = `PDF All Clients Downloaded (${clients.length})`;
    }

    function makePdf() {
      const element = document.querySelector(".kneeboard");
      const capture = document.querySelector("#capture");
      const name = document.querySelector("#content")?.getAttribute("name");

      capture?.classList.add("render-pdf");

      const options = {
        margin: 1,
        filename: `${name}_DCSWebEditor.pdf`,
        image: { type: "jpeg", quality: 0.95 },
        // html2canvas:  { width: 768, height: 1024},
        pagebreak: { mode: ["css"], avoid: ".kneeboard-section" },
        jsPDF: { unit: "px", format: [768, 1026], orientation: "portrait" },
      };

      setTimeout(() => {
        html2pdf().set(options).from(element).save();
        setTimeout(() => {
          capture?.classList.remove("render-pdf");
        }, 100);
      }, 100);
    }
    return "";
  },
};

export default component;

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
