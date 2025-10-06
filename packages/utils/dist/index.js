import * as MGRS from "../lib/mgrs";
import { convertDistance, getDistance, getRhumbLineBearing } from "geolib";
import { startCase, toLower } from "lodash";
export function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes / 60 + seconds / (60 * 60);
    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}
function toDegreesMinutesAndSeconds(coordinate, precision = 4) {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = ((minutesNotTruncated - minutes) * 60).toPrecision(precision);
    return degrees + "° " + minutes + "' " + seconds;
}
function toDegreesMinutesShort(coordinate, longitude = false) {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    return (degrees.toString().padStart(longitude ? 3 : 2, "0") +
        minutes.toString().padStart(2, "0"));
}
export function toDegreesMinutes(coordinate, precision = 4, pad = 0) {
    var absolute = Math.abs(coordinate);
    let degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = minutesNotTruncated.toFixed(precision);
    if (pad)
        degrees = degrees.toString().padStart(pad, "0");
    return degrees + "° " + minutes + "'";
}
export function convertDMS(lat, lon) {
    var latitude = toDegreesMinutesAndSeconds(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";
    var longitude = toDegreesMinutesAndSeconds(lon);
    var longitudeCardinal = lon >= 0 ? "E" : "W";
    return (latitude +
        " " +
        latitudeCardinal +
        ", " +
        longitude +
        " " +
        longitudeCardinal);
}
// returns i.e. 4210N04228E
export function convertDMshort(lat, lon) {
    var latitude = toDegreesMinutesShort(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";
    var longitude = toDegreesMinutesShort(lon, true);
    var longitudeCardinal = lon >= 0 ? "E" : "W";
    return latitude + latitudeCardinal + longitude + longitudeCardinal;
}
export function convertDMM(lat, lon) {
    var latitude = toDegreesMinutes(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";
    var longitude = toDegreesMinutes(lon);
    var longitudeCardinal = lon >= 0 ? "E" : "W";
    return (latitude +
        " " +
        latitudeCardinal +
        ", " +
        longitude +
        " " +
        longitudeCardinal);
}
export function convertDMT(lat, lon) {
    const latitude = toDegreesMinutes(lat, 3, 2).split(" ").join("");
    const latitudeCardinal = lat >= 0 ? "N" : "S";
    const longitude = toDegreesMinutes(lon, 3, 3).split(" ").join("");
    const longitudeCardinal = lon >= 0 ? "E" : "W";
    return `${latitudeCardinal} ${latitude}, ${longitudeCardinal} ${longitude}`;
}
export function toHHMMSS(s) {
    const date = new Date(0);
    date.setSeconds(s); // specify value for SECONDS here
    return date.toISOString().slice(11, 19);
}
export function convertDD(lat, lon) {
    var latitude = lat.toFixed(4);
    var latitudeCardinal = lat >= 0 ? "N" : "S";
    var longitude = lon.toFixed(4);
    var longitudeCardinal = lon >= 0 ? "E" : "W";
    return (latitude +
        " " +
        latitudeCardinal +
        ", " +
        longitude +
        " " +
        longitudeCardinal);
}
export function LLtoAll(lat, lon) {
    return {
        DD: convertDD(lat, lon),
        MGRS: MGRS.forward([lon, lat], 5),
        DMS: convertDMS(lat, lon),
        DMM: convertDMM(lat, lon),
        DMT: convertDMT(lat, lon),
    };
}
export function LLtoMGRS(lat, lon) {
    return MGRS.forward([lon, lat], 5);
}
export function MGRStoLL(mgrs) {
    const coords = MGRS.inverse(mgrs);
    return coords;
}
export function calcBearing(start, end) {
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
export function calcDistance(start, end) {
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
export function rgbToInt(r, g, b) {
    return ((r * 255) << 16) + ((g * 255) << 8) + b * 255;
}
export function toRgba(r, g, b, a) {
    return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${Math.round(a * 255)})`;
}
function componentToHex(c) {
    var hex = Math.round(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
export function rgbaToHex(r, g, b, a) {
    return ("#" +
        componentToHex(r) +
        componentToHex(g) +
        componentToHex(b) +
        componentToHex(a));
}
export function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
export function intToCssColor(num) {
    const r = (num >> 16) & 0xff;
    const g = (num >> 8) & 0xff;
    const b = num & 0xff;
    return `rgb(${r}, ${g}, ${b})`;
}
export function hexaToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (_m, r, g, b, a) {
        return r + r + g + g + b + b + a + a;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            a: parseInt(result[4], 16),
        }
        : null;
}
export function toFahrenheit(celsius) {
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
export const truncateString = (string = "", maxLength = 50) => string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;
export const sortStrings = (a, b) => {
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
export const sortBy = (a, b, property) => {
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
export function downloadJson(json, name, extension = "json") {
    const jsonString = JSON.stringify(json, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    downloadBlob(url, `${name}.${extension}`);
}
export function downloadBlob(url, fileName) {
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
export function isTranslation(name) {
    // console.log('name', name, typeof name);
    return name?.match && name.match(/^DictKey_/);
}
export function translate(key, dictionary) {
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
export function getTextType(type, category) {
    let textType = "";
    if (category === "ship") {
        textType = startCase(toLower(type));
    }
    else {
        textType = type.split("_")[0];
    }
    return textType;
}
export async function getElevationFeet(lat, lng) {
    // `https://api.open-elevation.com/api/v1/lookup?locations=`
    // const url = `https://www.elevation-api.eu/v1/elevation/`;
    // const url = `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${la},${ln}.json?access_token=${accessToken}`;
    const la = lat.toFixed(6);
    const lo = lng.toFixed(6);
    const url = `https://api.open-meteo.com/v1/elevation?latitude=${la}&longitude=${lo}`;
    try {
        const elevationData = await fetch(url, {
            method: "GET",
        });
        const results = await elevationData.json();
        const elevation = ((results?.elevation ?? 0) * M_TO_FEET).toFixed(0);
        return elevation;
    }
    catch (error) {
        console.error(error);
        return "N/A";
    }
}
export async function getElevationsFeet(coords) {
    try {
        // const flat = coords
        //     .map((c) => {
        //         const la = c.lat.toFixed(6);
        //         const lo = c.lng.toFixed(6);
        //         return `${la},${lo}`;
        //     })
        //     .join("|");
        const las = coords.map((c) => c.lat.toFixed(6)).join(",");
        const los = coords.map((c) => c.lng.toFixed(6)).join(",");
        const url = `https://api.open-meteo.com/v1/elevation?latitude=[${las}]&longitude=[${los}]`;
        const elevationData = await fetch(url, 
        // `https://api.open-elevation.com/api/v1/lookup?locations=${flat}`,
        {
            method: "GET",
        });
        const { results } = await elevationData.json();
        const elevations = results?.map((r) => ((r?.elevation ?? 0) * M_TO_FEET).toFixed(0));
        return elevations;
    }
    catch (error) {
        console.error(error);
        return "N/A";
    }
}
export { js2Lua } from "./js2lua";
export function renderFrequency(freq) {
    if (isNaN(freq))
        return "/";
    if (freq > 1000000)
        return (freq / 1000000).toFixed(2) + " Mhz";
    if (freq > 1000)
        return (freq / 1000).toFixed(2) + " khz";
    else
        return freq;
}
// mission date to JS date
export function toJsDate(missionDate, missionTime = 0) {
    return new Date(Date.UTC(missionDate.Year, missionDate.Month - 1, missionDate.Day, 0, 0, missionTime));
}
export function toLatLng(latLon) {
    return {
        lat: latLon.lat,
        lng: latLon.lon,
    };
}
export function toLatLon(latLng) {
    return {
        lat: latLng.lat,
        lon: latLng.lng,
    };
}
export function prettyLatLon(lat, lon, fix = 4) {
    return `${lat > 0 ? "N" : "S"} ${Math.abs(lat).toFixed(fix)}, ${lon > 0 ? "E" : "W"} ${Math.abs(lon).toFixed(fix)}`;
}
export function sanitizeAngle(angle) {
    if (angle < 0)
        return angle + 360;
    if (angle >= 360)
        return angle - 360;
    return angle;
}
export function openJsonEditor(data) {
    const url = `https://jsoneditoronline.org/#left=json.${JSON.stringify(data)}&left_mode=table&panels=left`;
    window.open(url, "_blank");
}
export function sanitizeString(input) {
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
export function rgbToHsl(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    }
    else {
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
export function getFilter(col) {
    const color = col || "#FFFF00";
    // iconDrawer.style.boxShadow = ``;
    var r = parseInt(color.substr(1, 2), 16);
    var g = parseInt(color.substr(3, 2), 16);
    var b = parseInt(color.substr(5, 2), 16);
    const [h, s, l] = rgbToHsl(r, g, b);
    const filter = `brightness(${l}) contrast(0.5) sepia() hue-rotate(${Math.floor(h * 360 - 50)}deg) saturate(${s * 5})`;
    return filter;
}
/**
 * Converts a distance in pixels to a distance in meters on the Leaflet map.
 * @param {number} pixelDistance - The distance in pixels.
 * @returns {number} The distance in meters.
 */
export function pixelsToMeters(map, pixelDistance) {
    if (!map || typeof map.containerPointToLatLng !== "function")
        return 0;
    const center = map.getSize().divideBy(2);
    const pointA = center;
    const pointB = center.add([pixelDistance, 0]);
    const latlngA = map.containerPointToLatLng(pointA);
    const latlngB = map.containerPointToLatLng(pointB);
    return latlngA.distanceTo(latlngB);
}
