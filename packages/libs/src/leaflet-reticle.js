// TODO generally refactor / generalize repetitive drawing code
import "./leaflet-reticle.css";
import { getElevationFeet } from "../../utils/";

L.Control.Reticle = L.Control.extend({
  _HALF: 1 / 2,
  _QUARTER: 1 / 4,
  _THREE_QUARTERS: 3 / 4,
  active: false,

  options: {
    mapId: `map`,
    fetchElevation: true,
    offsetFromCenter: 15,
    tickLength: 7.5,
    maxLength: 125,
    metric: true,
  },

  onRemove: function () {
    L.DomUtil.remove(this.container);
  },

  onAdd: function (map) {
    this.map = map;

    this.container = L.DomUtil.create(`div`, `leaflet-reticle`);
    this.container.style.display = `none`;

    this.canvas = document.createElement(`canvas`);
    this.canvas.classList.add(`leaflet-reticle-center`);
    this.canvas.style.margin = `-${this.options.tickLength}px 0 0 -${this.options.tickLength}`;
    this.canvas.style.display = this.active ? "inline" : "none";

    let map_container = document.getElementById(this.options.mapId);
    map_container.appendChild(this.canvas);

    this.ctx = this.canvas.getContext(`2d`);

    // Move events as catch-all for resizing, zoom, panning
    this.map.on(`moveend`, () => this.update(true));
    this.map.on(`move`, () => this.update(false));

    this.map.whenReady(() => {
      this.update(true);
      this.update(false);
    });

    return this.createButton();

    // return this.container;
  },

  createButton: function () {
    let bar = document.querySelector(
      ".leaflet-control-zoom.leaflet-bar.leaflet-control.leaflet-dwv"
    );
    if (!bar)
      bar = L.DomUtil.create(
        "div",
        "leaflet-control-zoom leaflet-bar leaflet-control leaflet-dwv"
      );
    this.button = bar;
    L.DomEvent.disableClickPropagation(this.button);

    const anchor = document.createElement("a");

    anchor.classList.add("leaflet-control-reticle");
    anchor.title = "Shortcut: 'n' Show center ruler";
    anchor.role = "button";
    anchor.innerHTML = '<span><i class="fa fa-ruler-combined"></i></span>';
    L.DomEvent.on(anchor, "click", this.reticleControlActivate.bind(this));
    this.button.appendChild(anchor);
    return this.button;
  },

  reticleControlActivate: function (params) {
    this.active = !this.active;
    console.log(this.active);

    this.active
      ? this.button.classList.add("reticle-on")
      : this.button.classList.remove("reticle-on");

    this.canvas.style.display = this.active ? "inline" : "none";
  },

  update: function (doAsyncOnly) {
    if (!this.active) return;
    let center = this.map.getCenter();

    if (doAsyncOnly) {
      this.drawElevation(center.lat, center.lng);
      return;
    }

    this.resetCanvas();
    this.drawCenterCoordinates(center.lat, center.lng);
    this.drawScales();
  },

  drawCenterCoordinates: function (lat, lng) {
    let latStr = this.formatNumber(lat);
    let lngStr = this.formatNumber(lng);

    this.ctx.fillText(`(${latStr}, ${lngStr})`, 15, 25);
  },

  drawElevation: function (lat, lng) {
    if (!this.active || !this.options.fetchElevation) {
      return;
    }

    this.fetchElevation(lat, lng).then((elev) =>
      this.ctx.fillText(`${elev} ${this.options.metric ? `m` : `ft`}`, 15, 40)
    );
  },

  drawScales: function () {
    let mapSize = this.map.getSize();
    let mapWidthFromCenter = mapSize.x / 2;
    let mapHeightFromCenter = mapSize.y / 2;

    let maxWidthDist = this.calculateMaxDistance(
      mapWidthFromCenter,
      mapHeightFromCenter,
      mapWidthFromCenter + this.options.maxLength,
      mapHeightFromCenter
    );

    let maxHeightDist = this.calculateMaxDistance(
      mapWidthFromCenter,
      mapHeightFromCenter,
      mapWidthFromCenter,
      mapHeightFromCenter + this.options.maxLength
    );

    this.drawWidthScale(maxWidthDist);
    this.drawHeightScale(maxHeightDist);
  },

  drawWidthScale: function (maxWidthDist) {
    let ratio, label;
    [ratio, label] = this.getScaleRatioLabel(maxWidthDist);

    let scaleLength = this.options.maxLength * ratio;

    this.drawLine(
      this.options.offsetFromCenter,
      this.options.tickLength,
      this.options.offsetFromCenter + scaleLength,
      this.options.tickLength
    );

    this.drawLine(
      this.options.offsetFromCenter + scaleLength * this._THREE_QUARTERS,
      this.options.tickLength,
      this.options.offsetFromCenter + scaleLength * this._THREE_QUARTERS,
      this.options.tickLength * this._HALF
    );
    this.drawLine(
      this.options.offsetFromCenter + scaleLength * this._QUARTER,
      this.options.tickLength,

      this.options.offsetFromCenter + scaleLength * this._QUARTER,
      this.options.tickLength * this._HALF
    );
    this.drawLine(
      this.options.offsetFromCenter + scaleLength * this._HALF,
      this.options.tickLength,
      this.options.offsetFromCenter + scaleLength * this._HALF,
      this.options.tickLength * this._QUARTER
    );

    this.drawLine(
      this.options.offsetFromCenter + scaleLength,
      this.options.tickLength,
      this.options.offsetFromCenter + scaleLength,
      0
    );

    this.ctx.fillText(
      label,
      this.options.offsetFromCenter + scaleLength + 2,
      7
    );
  },

  drawHeightScale: function (maxHeightDist) {
    let ratio, label;
    [ratio, label] = this.getScaleRatioLabel(maxHeightDist);

    let scaleLength = this.options.maxLength * ratio;

    this.drawLine(
      this.options.tickLength,
      this.options.offsetFromCenter,
      this.options.tickLength,
      this.options.offsetFromCenter + scaleLength
    );

    this.drawLine(
      this.options.tickLength,
      this.options.offsetFromCenter + scaleLength * this._THREE_QUARTERS,
      this.options.tickLength * this._HALF,
      this.options.offsetFromCenter + scaleLength * this._THREE_QUARTERS
    );
    this.drawLine(
      this.options.tickLength,
      this.options.offsetFromCenter + scaleLength * this._QUARTER,
      this.options.tickLength * this._HALF,
      this.options.offsetFromCenter + scaleLength * this._QUARTER
    );
    this.drawLine(
      this.options.tickLength,
      this.options.offsetFromCenter + scaleLength * this._HALF,
      this.options.tickLength * this._QUARTER,
      this.options.offsetFromCenter + scaleLength * this._HALF
    );

    this.drawLine(
      this.options.tickLength,
      this.options.offsetFromCenter + scaleLength,
      0,
      this.options.offsetFromCenter + scaleLength
    );

    this.ctx.fillText(
      label,
      0,
      this.options.offsetFromCenter + scaleLength + 10
    );
  },

  getScaleRatioLabel: function (maxDist) {
    // mile
    // let factor = this.options.metric ? 1000 : 5280;

    // nautical mile - feet in mile
    let factor = this.options.metric ? 1000 : 6076.12;

    let roundDist, unitStr;
    if (maxDist > factor) {
      maxDist = maxDist / factor;
      roundDist = this.getRoundNum(maxDist);
      unitStr = this.options.metric ? `km` : `nm`;
    } else {
      roundDist = this.getRoundNum(maxDist);
      unitStr = this.options.metric ? `m` : `ft`;
    }

    return [roundDist / maxDist, `${roundDist} ${unitStr}`];
  },

  calculateMaxDistance: function (xS, yS, xE, yE) {
    let dist = this.map.distance(
      this.map.containerPointToLatLng([xS, yS]),
      this.map.containerPointToLatLng([xE, yE])
    );
    return this.options.metric ? dist : dist * 3.28084;
  },

  getRoundNum: function (num) {
    // from L.Control.scale
    let pow10 = Math.pow(10, `${Math.floor(num)}`.length - 1);
    let d = num / pow10;
    d = d >= 10 ? 10 : d >= 6 ? 6 : d >= 4 ? 4 : d >= 2 ? 2 : 1;
    return pow10 * d;
  },

  fetchElevation: async function (lat, lng) {
    // const UNITS = this.options.metric ? `Meters` : `Feet`;
    // const OUTPUT = `json`;
    // // const baseUrl = "https://www.elevation-api.eu/v1/elevation/";
    // const baseUrl = "https://api.opentopodata.org/v1/aster30m?locations=";
    // // const baseUrl = `https://nationalmap.gov/epqs/pqs.php?units=${UNITS}&output=${OUTPUT}`;
    // const url = baseUrl + `${lat},${lng}`;
    // const usgsQueryResults = await fetch(url).then((response) =>
    //   response.json()
    // );
    // return usgsQueryResults.elevation;
    return await getElevationFeet(lat, lng);
  },

  formatNumber: function (num) {
    return num.toLocaleString({
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
  },

  resetCanvas: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawLine: function (xS, yS, xE, yE) {
    this.ctx.beginPath();
    this.ctx.moveTo(xS, yS);
    this.ctx.lineTo(xE, yE);
    this.ctx.stroke();
  },
});

L.control.reticle = function (options) {
  return new L.Control.Reticle(options);
};
