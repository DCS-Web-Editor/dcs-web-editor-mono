import { Component, Context } from "../../types";

const component: Component = {
  id: "csv",

  control: `<button id="export-csv">Download .csv</button>`,
  render: (c: Context) => {
    const downloadAll = document.querySelector("#export-csv")!;

    downloadAll.removeEventListener("click", downloadCsv);
    downloadAll.addEventListener("click", downloadCsv);

    return "";
  },
};

export default component;

function downloadCsv(e: Event) {
  console.log(e);
}
