import html2canvas from "html2canvas";

import { Component, Context } from "../../types";
import { downloadBlob } from "@dcs-web-editor-mono/utils";

const component: Component = {
  id: "screenshot",
  template: false,
  control: `
  <label>Downloads</label>

  <button id="png-button" title="Creates PNG file of current scroll position">Download PNG (scroll)</button>
  <button id="pdf-button" title="Mostly better results than the print to PDF">Generate PDF</button>
  <button id="print-button" title="Use system: print-to-PDF. Sometimes creates better results than the generated PDF. Set margins to 0 to remove page borders, and enable 'background graphics' in print options">Print as PDF</button>
  `,
  render: (c: Context) => {
    const fileName = document.querySelector("#content")?.getAttribute("name") ?? "unknown";

    const pngButton = document.querySelector("#png-button")!;

    pngButton.addEventListener("click", downloadPng);
    pngButton.addEventListener("click", downloadPng);

    function downloadPng() {
      const capture = document.querySelector("#capture")!;

      html2canvas(capture).then((canvas) => {
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          downloadBlob(url, fileName + ".png");
        });
      });
    }

    const printButton = document.querySelector("#print-button")!;
    printButton.addEventListener("click", () => window.print());

    const pdfButton = document.querySelector("#pdf-button")!;
    pdfButton.addEventListener("click", () => makePdf());

    return "";
  },
};

export default component;

export function getPdfOptions(fileName: string | null | undefined) {
  return {
    margin: 0,
    filename: `${fileName}_DCSWebEditor.pdf`,
    image: { type: "jpeg", quality: 0.95 },
    // html2canvas:  { width: 768, height: 1024},
    pagebreak: { mode: ["css", "avoid-all", "legacy"] },
    enableLinks: false,
    compressPDF: false,
    jsPDF: { unit: "px", format: [768, 1026], orientation: "portrait" },
  };
}

export function makePdf() {
  const element = document.querySelector(".kneeboard");
  const capture = document.querySelector("#capture");
  const fileName = document.querySelector("#content")?.getAttribute("name") ?? "unknown";

  capture?.classList.add("render-pdf");

  const options = getPdfOptions(fileName);

  setTimeout(() => {
    const pdf = html2pdf().set(options).from(element).outputImg();

    setTimeout(() => {
      pdf.save();
      capture?.classList.remove("render-pdf");
    }, 100);
  }, 100);
}
