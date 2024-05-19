import html2canvas from "html2canvas";
import { downloadBlob } from "@dcs-web-editor-mono/utils";

/* 
Create Screenshot Control
********************************/

let renderContainer: Function;

export function createScreenshotControl(_renderContainer: Function) {
  renderContainer = _renderContainer;

  const pAnchor = document.createElement("a");
  let map: any;
  const screenshotControl = L.control({ position: "bottomleft" });

  screenshotControl.onAdd = function (_map) {
    map = _map;
    this._div = L.DomUtil.create("div", "leaflet-control-zoom leaflet-bar leaflet-control");
    this._div.title =
      "Shortcut: '.' Left click to save screenshot ( hides user interface ). Resize your window to 768x1024 pixels to use them as ingame kneeboard maps.";

    pAnchor.classList.add("leaflet-control-zoom-in");
    pAnchor.href = "#";
    pAnchor.innerHTML = '<span><i class="fa fa-camera"></i></span>';
    L.DomEvent.on(pAnchor, "click", screnshotControlActivate);
    this._div.appendChild(pAnchor);
    return this._div;
  };

  return screenshotControl;
}

function screnshotControlActivate(e) {
  e.preventDefault();
  takeScreenshot();
}

function takeScreenshot() {
  const capture = document.body; // querySelector("#map");

  setTimeout(() => {
    // needed so pixi will show

    const options = {
      allowTaint: true,
      ignoreElements: (e) => {
        if (e === document.querySelector(".leaflet-control-container")) return true;
        if (e === document.querySelector("#REDISTRIBUTE")) return true;
        if (e === document.querySelector("#colorpicker")) return true;
        return false;
      },
      // canvas,
      useCORS: true,
    };

    renderContainer(true);

    html2canvas(capture, options).then((canvas) => {
      const base64 = canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        downloadBlob(url, "screenshot");
        const w = window.open(url);
      });
    });
  }, 0);
}
