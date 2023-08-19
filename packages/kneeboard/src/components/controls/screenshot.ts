import html2canvas from 'html2canvas';

import { Component, Context } from "../..";
import { downloadBlob } from "@dcs-web-editor-mono/utils";

const component: Component = {
  id: 'screenshot',
  template: '',
  control: `<button id="screenshot">Download PNG</button>`,
  render: (c: Context) => {
    const screenshotButton = document.querySelector("#screenshot")!;
    
    screenshotButton.addEventListener('click', () => {
      const capture = document.querySelector("#capture")!;
      html2canvas(capture).then(canvas => {
        canvas.toBlob(blob => window.open(URL.createObjectURL(blob), '_blank'));
      });
    });
    return '';
  },
}

export default component;
