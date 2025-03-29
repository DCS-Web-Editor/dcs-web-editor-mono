import Icons from "@dcs-web-editor-mono/icons";
import "./iconControl.css";
import { context, disablePaintControl, disableTextControl } from ".";
import { getFilter } from "@dcs-web-editor-mono/utils";
import { remove } from "lodash";
export const iconControl = L.control({ position: "bottomleft" });
const anchor = document.createElement("a");
const mapElement = document.getElementById("map");
let map: L.Map;
let _offsetX = 0;

export const icons: any[] = [];

iconControl.onAdd = function (_map) {
    map = _map;
    map.createPane("icons");
    context.iconBar ||= L.DomUtil.create(
        "div",
        "leaflet-control-zoom leaflet-bar leaflet-control leaflet-dwv"
    );
    this._div = context.iconBar;

    // otherwise drawing process would instantly start at controls' container or double click would zoom-in map
    L.DomEvent.disableClickPropagation(this._div);

    anchor.classList.add("leaflet-control-zoom-in");
    anchor.title = "Shortcut: 'i' Drag and drop icons for planning";
    anchor.role = "button";
    anchor.innerHTML = '<span><i class="fa fa-image"></i></span>';
    L.DomEvent.on(anchor, "click", iconControlActivate);
    this._div.appendChild(anchor);
    renderDrawer();
    return this._div;
};

function iconControlActivate(e: Event) {
    const iconDrawer = document.getElementById("icon-drawer")!;

    const iconsPane = document.querySelector(
        "#map .leaflet-pane.leaflet-icons-pane"
    )!;
    //   console.log("iconControlActivate", e);
    context.iconMode = !context.iconMode;
    if (context.iconMode) {
        iconsPane.style.zIndex = 402;
        // not necessary, works simultaneously
        // disablePaintControl();
        // disableTextControl();

        anchor.classList.add("polyline-measure-controlOnBgColor");
        iconDrawer.style.display = "block";
        // renderDrawer();
    } else {
        iconsPane.style.zIndex = 200;

        anchor.classList.remove("polyline-measure-controlOnBgColor");
        // iconDrawer.innerHTML = "";
        iconDrawer.style.display = "none";
    }
}

iconControl.peerSync = () => {};
iconControl.setPeerSync = function name(peerSync: Function) {
    iconControl.peerSync = peerSync;
};

mapElement.ondragover = iconsOnDragOver;

export function iconsOnDragOver(e) {
    e.preventDefault();
    if (!context.iconMode) return;
    e.dataTransfer.dropEffect = "move";
}

mapElement.ondrop = iconsOnDrop;

export function iconsOnDrop(e) {
    e.preventDefault();

    const imageData = e.dataTransfer.getData("url");

    // local icon
    if (!imageData && e.dataTransfer.files.length) {
        // console.log("dropUserImage");

        dropUserImage(e);
        return true;
    }

    // web image, not from editor
    if (
        imageData.startsWith("http") &&
        !imageData.match(document.location.origin)
    ) {
        // console.log("dropWebImage", imageData);
        dropWebImage(e);
        return true;
    }

    if (!context.iconMode) return;
    const isIcon = dropBuiltInIcon(e, imageData);

    return isIcon;
}

function dropBuiltInIcon(e: any, imageData: any) {
    const name = e.dataTransfer.getData("name");
    const color = e.dataTransfer.getData("color");
    if (!name || !color) return false;

    // console.log("dropBuiltInIcon");

    const coordinates = map.containerPointToLatLng(
        L.point([e.clientX + _offsetX, e.clientY])
    );

    const type = "icon";

    const marker = spawnIcon({
        name,
        imageData,
        coordinates,
        color,
        type,
    });

    iconControl.peerSync({
        icons: [
            {
                l_id: marker.l_id,
                name,
                latLng: coordinates,
                image: imageData,
                type,
                color,
            },
        ],
    });
    return true;
}

interface IconOptions {
    name: string;
    imageData: string;
    coordinates: any;
    color: string;
    type: string;
    l_id?: number;
}

function spawnIcon(options: IconOptions) {
    // console.log("spawnIcon", options);

    const { name, imageData, coordinates, color, type, l_id } = options;

    const filter = getFilter(color || _color || colorPicker?.value);
    const opts = {
        className: "dwe-dropicon",
        html: `<img width=50 height=50 src="${imageData}" style="filter: ${filter}"/>`,
    };

    const icon = L.marker(coordinates, {
        icon: L.divIcon(opts),
        draggable: true,
    }).addTo(map);

    icon.l_id = icon._leaflet_id;
    if (l_id) icon.l_id = l_id;

    icon.name = name;
    icon.color = color;
    icon.type = type;
    icon.on("dragend", (e) => {
        const icon = e.target;

        iconControl.peerSync({
            moveIcons: [
                {
                    coordinates: icon._latlng,
                    type: icon.type,
                    l_id: icon.l_id,
                },
            ],
        });
    });
    icon.on("click", (e) => {
        removeSyncIcon(icon);
    });
    icons.push(icon);
    return icon;
}

const colorPicker = document.getElementById("colorpicker")!;
if (colorPicker) colorPicker.addEventListener("change", renderDrawer);

let _color;
export function updateColor(color: string) {
    _color = color;
    renderDrawer(color);
}

function renderDrawer() {
    const color = _color || colorPicker?.value;
    // colorize all icons on map
    //   const icons = document.getElementsByClassName("dwe-dropicon");
    //   Object.values(icons).forEach((e) => {
    //     e.style.filter = filter;
    //   });

    const filter = getFilter(color);
    const iconDrawer = document.getElementById("icon-drawer")!;

    if (iconDrawer)
        iconDrawer.innerHTML = `<div class="image-holder">
    <h4 class="no-select">Icons drag & drop. (Or drag custom images to map)</h4>
     ${Object.keys(Icons.icons)
         .map((name) => {
             return `<img class="image-holder no-select" ondragstart="onIconDrag(event, '${name}', '${color}')" width=30 height=30 style="filter: ${filter}" src="${Icons.icons[name]}" alt="${name}"></img>`;
         })
         .join("")}
    
       </div>
    `;
}

window.onIconDrag = function drag(e, name: string, color = "#fff") {
    e.dataTransfer.setData("name", name);
    e.dataTransfer.setData("color", color);
};

interface Coordinates {
    lat: number;
    lng: number;
    width: number;
    height: number;
    bounds?: any[];
}

function dropUserImage(e) {
    Array.prototype.forEach.call(e.dataTransfer.files, (file, i) => {
        if (!file) return;
        e.preventDefault();

        const reader = new FileReader();

        reader.onload = function (event) {
            const img = new Image();
            const src = event.target?.result as string;
            img.src = src;

            const offsetGrid = i * 50;

            img.onload = function () {
                const width = img.width;
                const height = img.height;
                // console.log(`Dropped image dimensions: ${width}x${height}`);

                const coordinates: Coordinates = map.containerPointToLatLng(
                    L.point([e.clientX + _offsetX + offsetGrid, e.clientY])
                );

                const MAX_SIZE = e.shiftKey ? 750 : 250;
                const longest = Math.max(height, width);
                const scale = longest < MAX_SIZE ? 1 : MAX_SIZE / longest;

                coordinates.width = width * scale;
                coordinates.height = height * scale;

                const type = e.shiftKey ? "imageOverlay" : "image";
                const fileType = file.type;

                // calculate bounds before peersync
                const marker = spawnUserImage({
                    name: file.name,
                    coordinates,
                    src,
                    type,
                    fileType,
                });
                marker.l_id ||= marker._leaflet_id;
                // console.log("dropUserImage", marker.l_id, file.name);

                iconControl.peerSync({
                    icons: [
                        {
                            l_id: marker.l_id,
                            name: file.name,
                            latLng: coordinates,
                            image: src,
                            type,
                            fileType,
                            color: "#ffffff",
                        },
                    ],
                });
            };
        };
        reader.readAsDataURL(file);
    });
}

interface UserImageOptions {
    name: string;
    coordinates: Coordinates;
    src: string;
    type: string;
    fileType?: string;
    // leaflet_id of the creator peer
    l_id?: number;
}

function spawnUserImage(options: UserImageOptions) {
    const { name, coordinates, src, type, fileType, l_id } = options;

    let className = "dropped-image";
    if (fileType === "image/svg+xml" || src.match(/^data\:image\/svg/)) {
        className = "dropped-svg";
    }

    let marker: any;

    if (type === "imageOverlay") {
        marker = createImageOverlay(coordinates, src, className);
    } else {
        const { width, height } = coordinates;

        marker = L.marker(coordinates, {
            icon: L.icon({
                iconUrl: src,
                iconSize: [width, height],
                iconAnchor: [width / 2, height / 2],
                className,
            }),
            pane: "icons",

            draggable: true,
        }).addTo(map);
    }

    marker.on("click", function (e) {
        removeIcon(marker);
    });

    marker.name = name;
    marker.color = "#ffffff";
    marker.type = type;
    marker.l_id = marker._leaflet_id;
    if (l_id) marker.l_id = l_id;

    icons.push(marker);

    return marker;
}

function cornersToBounds(corners: any[]) {
    return [
        [corners[0].lat, corners[0].lng],
        [corners[1].lat, corners[0].lng],
        [corners[1].lat, corners[1].lng],
        [corners[0].lat, corners[1].lng],
    ];
}

function createImageOverlay(
    coordinates: Coordinates,
    src: string,
    className: string
) {
    if (!coordinates.bounds) {
        const corners = calculateBounds(coordinates);
        coordinates.bounds = cornersToBounds(corners);
    }

    const imageOverlay = L.imageOverlay(src, coordinates.bounds, {
        className,
        interactive: true,
        pane: "icons",
    }).addTo(map);
    imageOverlay.coordinates = coordinates;

    const polygon = new L.Polygon([coordinates.bounds], {
        className: "dwe-image-overlay-polygon",
        draggable: true,
        pane: "icons",
        opacity: 0,
        fillOpacity: 0,
        color: "#f1f",
    }).addTo(map);

    imageOverlay.polygon = polygon;

    polygon.dragging.enable();

    polygon.on("click", function (e) {
        removeSyncIcon(imageOverlay);
    });

    polygon.on("dragend", function (e) {
        const corners = polygon.getBounds();

        const bounds = cornersToBounds([
            corners._northEast,
            corners._southWest,
        ]);
        imageOverlay.coordinates.bounds = bounds;
        imageOverlay.setBounds(corners);
        // console.log("dragend", imageOverlay.name, imageOverlay.l_id);

        iconControl.peerSync({
            moveIcons: [
                {
                    corners,
                    type: imageOverlay.type,
                    coordinates,
                    l_id: imageOverlay.l_id || imageOverlay._leaflet_id,
                },
            ],
        });
    });

    return imageOverlay;
}

function calculateBounds(coordinates: Coordinates) {
    // 1) Convert LatLng into container pixel position.
    const originPoint = map.latLngToContainerPoint(coordinates);
    // 2) Add the image pixel dimensions.
    // Positive x to go right (East).
    // Negative y to go up (North).
    const firstCornerPoint = originPoint.add({
        x: -coordinates.width / 2,
        y: -coordinates.height / 2,
    });
    const nextCornerPoint = originPoint.add({
        x: coordinates.width / 2,
        y: coordinates.height / 2,
    });
    // 3) Convert back into LatLng.
    const firstCornerLatLng = map.containerPointToLatLng(firstCornerPoint);
    const nextCornerLatLng = map.containerPointToLatLng(nextCornerPoint);
    return [firstCornerLatLng, nextCornerLatLng];
}

export function setOffsetX(x: number) {
    _offsetX = x;
}

function dropWebImage(e: DragEvent) {
    const url = e.dataTransfer.getData("url");
    // console.log(e.dataTransfer?.getData("text"));

    const coordinates = map.containerPointToLatLng(
        L.point([e.clientX + _offsetX, e.clientY])
    );

    const name = url.match(/\/\/(.*)\//)?.[1] || "web-image";

    spawnUserImage({
        name,
        coordinates,
        src: url,
        type: "web-image",
    });
}

export function loadIcons(icons: any[], _map?: any) {
    // console.log(
    //     "loadIcons",
    //     icons.map((i) => i.l_id + " " + i.name)
    // );

    map ||= _map;
    icons.forEach((icon) => {
        // console.log("loadIcons", icon);

        const { name, type, color, image, l_id, latLng } = icon;

        if (!type || type === "icon")
            spawnIcon({
                name,
                coordinates: latLng,
                imageData: image,
                type,
                color,
                l_id,
            });
        else
            spawnUserImage({
                name,
                coordinates: latLng,
                src: image,
                type,
                l_id,
            });
    });
}

export function moveIcons(moveIcons) {
    moveIcons.forEach((moveIcon) => {
        const found = icons.find((icon) => icon.l_id === moveIcon.l_id);
        // console.log("moveIcon", found.name, found.l_id);
        if (!found) return;

        if (found.type === "imageOverlay") {
            found.setBounds([
                moveIcon.corners._northEast,
                moveIcon.corners._southWest,
            ]);
            found.coordinates = moveIcon.coordinates;
        } else if (found.type === "icon") {
            found.setLatLng(moveIcon.coordinates);
        }
    });
}

export function removeIcons(removeIcons) {
    removeIcons.forEach((toDelete) => {
        const found = icons.find((icon) => icon.l_id === toDelete.l_id);
        if (!found) return;

        removeIcon(found);
    });
}

function removeIcon(icon: L.Marker) {
    remove(icons, icon);
    if (icon.polygon) icon.polygon.remove();
    icon.remove();
}

function removeSyncIcon(icon: L.Marker) {
    removeIcon(icon);

    iconControl.peerSync({
        removeIcons: [
            {
                l_id: icon.l_id,
            },
        ],
    });
}
