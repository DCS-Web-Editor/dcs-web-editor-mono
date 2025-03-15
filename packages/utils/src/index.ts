import * as MGRS from "../lib/mgrs";
import { convertDistance, getDistance, getRhumbLineBearing } from "geolib";
import { startCase, toLower } from "lodash";
export interface LatLon {
  lat: number;
  lon: number;
}

export function ConvertDMSToDD(
  degrees: number,
  minutes: number,
  seconds: number,
  direction: string
) {
  var dd = degrees + minutes / 60 + seconds / (60 * 60);

  if (direction == "S" || direction == "W") {
    dd = dd * -1;
  } // Don't do anything for N or E
  return dd;
}

function toDegreesMinutesAndSeconds(coordinate: number, precision = 4) {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = ((minutesNotTruncated - minutes) * 60).toPrecision(precision);

  return degrees + "° " + minutes + "' " + seconds;
}

function toDegreesMinutesShort(coordinate: number, longitude = false) {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);

  return (
    degrees.toString().padStart(longitude ? 3 : 2, "0") +
    minutes.toString().padStart(2, "0")
  );
}

export function toDegreesMinutes(coordinate: number, precision = 4, pad = 0) {
  var absolute = Math.abs(coordinate);
  let degrees = Math.floor(absolute);
  var minutesNotTruncated = (absolute - degrees) * 60;
  var minutes = minutesNotTruncated.toFixed(precision);

  if (pad) degrees = degrees.toString().padStart(pad, "0");

  return degrees + "° " + minutes + "'";
}

export function convertDMS(lat: number, lon: number) {
  var latitude = toDegreesMinutesAndSeconds(lat);
  var latitudeCardinal = lat >= 0 ? "N" : "S";

  var longitude = toDegreesMinutesAndSeconds(lon);
  var longitudeCardinal = lon >= 0 ? "E" : "W";

  return (
    latitude +
    " " +
    latitudeCardinal +
    ", " +
    longitude +
    " " +
    longitudeCardinal
  );
}

// returns i.e. 4210N04228E
export function convertDMshort(lat: number, lon: number) {
  var latitude = toDegreesMinutesShort(lat);
  var latitudeCardinal = lat >= 0 ? "N" : "S";

  var longitude = toDegreesMinutesShort(lon, true);
  var longitudeCardinal = lon >= 0 ? "E" : "W";

  return latitude + latitudeCardinal + longitude + longitudeCardinal;
}

export function convertDMM(lat: number, lon: number) {
  var latitude = toDegreesMinutes(lat);
  var latitudeCardinal = lat >= 0 ? "N" : "S";

  var longitude = toDegreesMinutes(lon);
  var longitudeCardinal = lon >= 0 ? "E" : "W";

  return (
    latitude +
    " " +
    latitudeCardinal +
    ", " +
    longitude +
    " " +
    longitudeCardinal
  );
}
export function convertDMT(lat: number, lon: number) {
  const latitude = toDegreesMinutes(lat, 3, 2).split(" ").join("");
  const latitudeCardinal = lat >= 0 ? "N" : "S";

  const longitude = toDegreesMinutes(lon, 3, 3).split(" ").join("");
  const longitudeCardinal = lon >= 0 ? "E" : "W";

  return `${latitudeCardinal} ${latitude}, ${longitudeCardinal} ${longitude}`;
}

export function toHHMMSS(s: number) {
  const date = new Date(0);
  date.setSeconds(s); // specify value for SECONDS here
  return date.toISOString().slice(11, 19);
}

export function convertDD(lat: number, lon: number) {
  var latitude = lat.toFixed(4);
  var latitudeCardinal = lat >= 0 ? "N" : "S";

  var longitude = lon.toFixed(4);
  var longitudeCardinal = lon >= 0 ? "E" : "W";

  return (
    latitude +
    " " +
    latitudeCardinal +
    ", " +
    longitude +
    " " +
    longitudeCardinal
  );
}

export function LLtoAll(lat: number, lon: number) {
  return {
    DD: convertDD(lat, lon),
    MGRS: MGRS.forward([lon, lat], 5),
    DMS: convertDMS(lat, lon),
    DMM: convertDMM(lat, lon),
    DMT: convertDMT(lat, lon),
  };
}

export function LLtoMGRS(lat: number, lon: number) {
  return MGRS.forward([lon, lat], 5);
}

export function MGRStoLL(mgrs: string) {
  const coords = MGRS.inverse(mgrs);
  return coords;
}

export function calcBearing(start: LatLon, end: LatLon) {
  const a = {
    latitude: start.lat,
    longitude: start.lon,
  };
  const b = {
    latitude: end.lat,
    longitude: end.lon,
  };
  return getRhumbLineBearing(a, b);
}

export function calcDistance(start: LatLon, end: LatLon) {
  const a = {
    latitude: start.lat,
    longitude: start.lon,
  };
  const b = {
    latitude: end.lat,
    longitude: end.lon,
  };
  return convertDistance(getDistance(a, b), "sm");
}

export const M_TO_FEET = 3.28084;
export const M_TO_NM = 0.000539957;
export const KM_TO_NM = 0.000539957 * 1000;
export const MS_TO_KTS = 1.94384;
export const MS_TO_KMH = 3.6;
export const KG_TO_LBS = 2.20462;
export const MMHG_TO_INHG = 0.0393701;

export function msToKts(metersPerSecond = 0) {
  return (metersPerSecond * MS_TO_KTS).toFixed(0);
}

export function toFeet(meters = 0) {
  return (meters * M_TO_FEET).toFixed(0);
}

export function toNm(meters = 0) {
  return (meters * M_TO_NM).toFixed(1);
}
export function toDeg(rad = 0) {
  return (rad / (Math.PI / 180)).toFixed(0);
}

export function toRad(deg = 0) {
  return deg * (Math.PI / 180);
}

export function rgbToInt(r: number, g: number, b: number) {
  return ((r * 255) << 16) + ((g * 255) << 8) + b * 255;
}
export function toRgba(r: number, g: number, b: number, a: number) {
  return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(
    b * 255
  )},${Math.round(a * 255)})`;
}

function componentToHex(c: number) {
  var hex = Math.round(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbaToHex(r: number, g: number, b: number, a: number) {
  return (
    "#" +
    componentToHex(r) +
    componentToHex(g) +
    componentToHex(b) +
    componentToHex(a)
  );
}
export function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function intToCssColor(num: number): string {
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  return `rgb(${r}, ${g}, ${b})`;
}

export function hexaToRgb(hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (_m, r, g, b, a) {
    return r + r + g + g + b + b + a + a;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex
  );
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: parseInt(result[4], 16),
      }
    : null;
}

export function toFahrenheit(celsius: number) {
  return (celsius * 9) / 5 + 32;
}

export const MORSE = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  " ": "/",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "0": "-----",
};

export const truncateString = (string = "", maxLength = 50) =>
  string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

export const sortStrings = (a: string, b: string) => {
  const nameA = a.toUpperCase(); // ignore upper and lowercase
  const nameB = b.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
};
export const sortBy = (a: any, b: any, property: string) => {
  const nameA = a[property].toUpperCase(); // ignore upper and lowercase
  const nameB = b[property].toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
};

export function downloadJson(json: any, name: string, extension = "json") {
  const jsonString = JSON.stringify(json, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  downloadBlob(url, `${name}.${extension}`);
}

export function downloadBlob(url: string, fileName: string) {
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  const event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    ctrlKey: false,
    shiftKey: false,
  });
  link.dispatchEvent(event);
}

export function isTranslation(name: string): RegExpMatchArray | null {
  // console.log('name', name, typeof name);
  return name?.match && name.match(/^DictKey_/);
}

export function translate(key: string, dictionary: Record<string, string>) {
  return isTranslation(key) ? dictionary[key] : key;
}

// safely handles circular references
// JSON.safeStringify = (obj, indent = 2) => {
//   let cache = [];
//   const retVal = JSON.stringify(
//     obj,
//     (key, value) =>
//       typeof value === "object" && value !== null
//         ? cache.includes(value)
//           ? undefined // Duplicate reference found, discard key
//           : cache.push(value) && value // Store value in our collection
//         : value,
//     indent
//   );
//   cache = null;
//   return retVal;
// };

export function getTextType(type: string, category: string) {
  let textType = "";
  if (category === "ship") {
    textType = startCase(toLower(type));
  } else {
    textType = type.split("_")[0];
  }
  return textType;
}

export async function getElevationFeet(lat: any, lng: any) {
  try {
    const elevationData = await fetch(
      `https://api.open-elevation.com/api/v1/lookup?locations=${lat.toFixed(
        6
      )},${lng.toFixed(6)}|`,
      {
        method: "GET",
      }
    );
    const { results } = await elevationData.json();
    const elevation = ((results?.[0]?.elevation ?? 0) * M_TO_FEET).toFixed(0);
    return elevation;
  } catch (error) {
    console.error(error);
    return "N/A";
  }
}

export async function getElevationsFeet(coords: any[]) {
  try {
    const flat = coords
      .map((c) => {
        return `${c.lat.toFixed(6)},${c.lng.toFixed(6)}`;
      })
      .join("|");

    const elevationData = await fetch(
      `https://api.open-elevation.com/api/v1/lookup?locations=${flat}`,
      {
        method: "GET",
      }
    );
    const { results } = await elevationData.json();
    const elevations = results?.map((r: { elevation: any }) =>
      ((r?.elevation ?? 0) * M_TO_FEET).toFixed(0)
    );
    return elevations;
  } catch (error) {
    console.error(error);
    return "N/A";
  }
}

export { js2Lua } from "./js2lua";

export function renderFrequency(freq: number) {
  if (isNaN(freq)) return "/";
  if (freq > 1000000) return (freq / 1000000).toFixed(2) + " Mhz";
  if (freq > 1000) return (freq / 1000).toFixed(2) + " khz";
  else return freq;
}

// mission date to JS date
export function toJsDate(missionDate: any, missionTime: number = 0): Date {
  return new Date(
    Date.UTC(
      missionDate.Year,
      missionDate.Month - 1,
      missionDate.Day,
      0,
      0,
      missionTime
    )
  );
}

export function toLatLng(latLon: LatLon) {
  return {
    lat: latLon.lat,
    lng: latLon.lon,
  };
}

export function sanitizeAngle(angle: number) {
  if (angle < 0) return angle + 360;
  if (angle >= 360) return angle - 360;
  return angle;
}

export function openJsonEditor(data: any) {
  const url = `https://jsoneditoronline.org/#left=json.${JSON.stringify(
    data
  )}&left_mode=table&panels=left`;
  window.open(url, "_blank");
}

export function sanitizeString(input: string): string {
  // Remove any script tags or event handlers

  input = input
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/on\w+=".*?"/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/\\/gi, "")
    .replace(/\"/gi, "")
    .replace(/\(/gi, "")
    .replace(/\)/gi, "")
    .replace(/</gi, "")
    .replace(/>/gi, "");

  return input;
}
