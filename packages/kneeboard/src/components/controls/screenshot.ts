import html2canvas from 'html2canvas';

import { Component, Context } from "../..";
import { downloadBlob } from "@dcs-web-editor-mono/utils";

const component: Component = {
  id: 'screenshot',
  template: false,
  control: `<button id="screenshot-button">Download PNG</button>
  <button id="pdf-button">Download PDF</button>`,
  render: (c: Context) => {
    const pngButton = document.querySelector("#screenshot-button")!;
    
    pngButton.addEventListener('click', downloadPng);
    pngButton.addEventListener('click', downloadPng);
    
    function downloadPng() {
      const capture = document.querySelector("#capture")!;
      html2canvas(capture).then(canvas => {
        canvas.toBlob(blob => window.open(URL.createObjectURL(blob), '_blank'));
      });
    }

    const pdfButton = document.querySelector("#pdf-button")!;
    pdfButton.addEventListener("click", () => makePdf());

    function makePdf() {
      
      const element = document.querySelector('.kneeboard');
      const capture = document.querySelector('#capture');
      const name = document.querySelector('#content')?.getAttribute('name');

      capture?.classList.add('render-pdf');
      

      const options = {
        margin:       1,
        filename:     `${name}_DCSWebEditor.pdf`,
        image:        { type: 'jpeg', quality: 0.95 },
        // html2canvas:  { width: 768, height: 1024},
        pagebreak: { mode: ['css'], avoid: '.kneeboard-section' },
        jsPDF:      { unit: 'px', format: [768, 1026], orientation: 'portrait' }
      };

      setTimeout(() => {
        html2pdf().set(options).from(element).save();
        setTimeout(() => {
          capture?.classList.remove('render-pdf');
        }, 100);
      }, 10);
      
      

    }
    return '';
  },
}

export default component;
