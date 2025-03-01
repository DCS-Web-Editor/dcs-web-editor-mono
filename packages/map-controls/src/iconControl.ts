import Icons from "@dcs-web-editor-mono/icons";
import "./iconControl.css";
import { context, disablePaintControl, disableTextControl } from ".";

export const iconControl = L.control({ position: "bottomleft" });
const anchor = document.createElement("a");
const mapElement = document.getElementById("map");
let map;

const iconDrawer = document.getElementById("icon-drawer")!;

export const icons: any[] = [];

iconControl.onAdd = function (_map) {
  map = _map;
  context.iconBar ||= L.DomUtil.create(
    "div",
    "leaflet-control-zoom leaflet-bar leaflet-control"
  );
  this._div = context.iconBar;

  // otherwise drawing process would instantly start at controls' container or double click would zoom-in map
  L.DomEvent.disableClickPropagation(this._div);

  anchor.classList.add("leaflet-control-zoom-in");
  anchor.title = "Shortcut: 'i' Drag and drop icons for planning";
  anchor.href = "#";
  anchor.innerHTML = '<span><i class="fa fa-image"></i></span>';
  L.DomEvent.on(anchor, "click", iconControlActivate);
  this._div.appendChild(anchor);
  renderDrawer();
  return this._div;
};

function iconControlActivate(e: Event) {
  //   console.log("iconControlActivate", e);
  context.iconMode = !context.iconMode;
  if (context.iconMode) {
    // not necessary, works simultaneously
    // disablePaintControl();
    // disableTextControl();

    anchor.classList.add("polyline-measure-controlOnBgColor");
    iconDrawer.style.display = "block";
    // renderDrawer();
  } else {
    anchor.classList.remove("polyline-measure-controlOnBgColor");
    // iconDrawer.innerHTML = "";
    iconDrawer.style.display = "none";
  }
}

mapElement.ondragover = function (e) {
  e.preventDefault();
  if (!context.iconMode) return;
  e.dataTransfer.dropEffect = "move";
};

mapElement.ondrop = function (e) {
  e.preventDefault();

  const imageData = e.dataTransfer.getData("url");

  // local icon
  if (!imageData) {
    dropUserImage(e);
    return;
  }

  // web image
  if (imageData.startsWith("http")) {
    dropWebImage(e);
    return;
  }

  // built in icon
  if (!context.iconMode) return;

  const name = e.dataTransfer.getData("name");
  const color = e.dataTransfer.getData("color");

  const coordinates = map.containerPointToLatLng(
    L.point([e.clientX, e.clientY])
  );

  spawnIcon(name, imageData, coordinates, color);
};

function spawnIcon(
  name: string,
  imageData: string,
  coordinates: any,
  color: string = ""
) {
  const filter = getFilter(color);
  const opts = {
    className: "dwe-dropicon",
    html: `<img width=50 height=50 src="${imageData}" style="filter: ${filter}"/>`,
  };
  const icon = L.marker(coordinates, {
    icon: L.divIcon(opts),
    draggable: true,
  }).addTo(map);
  icon.name = name;
  icon.color = color;
  icon.on("click", (e) => icon.remove());
  icons.push(icon);
}

const colorPicker = document.getElementById("colorpicker")!;
if (colorPicker) colorPicker.addEventListener("change", renderDrawer);

function getFilter(col = "") {
  const color = col || colorPicker?.value || "#292929";

  // iconDrawer.style.boxShadow = ``;

  var r = parseInt(color.substr(1, 2), 16);
  var g = parseInt(color.substr(3, 2), 16);
  var b = parseInt(color.substr(5, 2), 16);

  const [h, s, l] = rgbToHsl(r, g, b);

  const filter = `brightness(${l}) contrast(0.5) sepia() hue-rotate(${Math.floor(
    h * 360 - 50
  )}deg) saturate(${s * 5})`;

  return filter;
}

function renderDrawer() {
  // colorize all icons on map
  //   const icons = document.getElementsByClassName("dwe-dropicon");
  //   Object.values(icons).forEach((e) => {
  //     e.style.filter = filter;
  //   });

  const filter = getFilter();

  if (iconDrawer)
    iconDrawer.innerHTML = `<div class="image-holder">
    <h4 class="no-select">Icons drag & drop. (Or drag custom images to map)</h4>
     ${Object.keys(Icons.icons)
       .map((name) => {
         return `<img class="image-holder no-select" ondragstart="onIconDrag(event, '${name}', '${colorPicker?.value}')" width=30 height=30 style="filter: ${filter}" src="${Icons.icons[name]}" alt="${name}"></img>`;
       })
       .join("")}
    
       </div>
    `;
}

window.onIconDrag = function drag(e, name: string, color = "#fff") {
  e.dataTransfer.setData("name", name);
  e.dataTransfer.setData("color", color);
};

function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

export function loadIcons(icons: any[], _map?: any) {
  map ||= _map;
  icons.forEach((icon) => {
    spawnIcon(icon.name, icon.image, icon.latLng, icon.color);
  });
}

function dropUserImage(e) {
  Array.prototype.forEach.call(e.dataTransfer.files, (file, i) => {
    if (!file) return;
    e.preventDefault();

    const offset = i * 50;
    const reader = new FileReader();

    reader.onload = function (event) {
      const src = event.target?.result as string;
      const coordinates = map.containerPointToLatLng(
        L.point([e.clientX + offset, e.clientY])
      );

      let className = "dropped-image";
      if (file.type === "image/svg+xml") {
        className = "dropped-svg";
      }

      const marker = L.marker(coordinates, {
        icon: L.icon({ iconUrl: src, className }),
        draggable: true,
      }).addTo(map);

      marker.on("click", function (e) {
        marker.remove();
      });
    };

    reader.readAsDataURL(file);
  });
}

function dropWebImage(e: DragEvent) {
  const imageData = e.dataTransfer.getData("url");
  const coordinates = map.containerPointToLatLng(
    L.point([e.clientX, e.clientY])
  );

  const marker = L.marker(coordinates, {
    icon: L.icon({ iconUrl: imageData, className: "dropped-web-image" }),
    draggable: true,
  }).addTo(map);

  marker.on("click", function () {
    marker.remove();
  });
}
