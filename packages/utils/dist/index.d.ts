export interface LatLon {
    lat: number;
    lon: number;
}
export declare function ConvertDMSToDD(degrees: number, minutes: number, seconds: number, direction: string): number;
export declare function toDegreesMinutes(coordinate: number, precision?: number, pad?: number): string;
export declare function convertDMS(lat: number, lon: number): string;
export declare function convertDMshort(lat: number, lon: number): string;
export declare function convertDMM(lat: number, lon: number): string;
export declare function convertDMT(lat: number, lon: number): string;
export declare function toHHMMSS(s: number): string;
export declare function convertDD(lat: number, lon: number): string;
export declare function LLtoAll(lat: number, lon: number): {
    DD: string;
    MGRS: any;
    DMS: string;
    DMM: string;
    DMT: string;
};
export declare function LLtoMGRS(lat: number, lon: number): any;
export declare function MGRStoLL(mgrs: string): any;
export declare function calcBearing(start: LatLon, end: LatLon): number;
export declare function calcDistance(start: LatLon, end: LatLon): number;
export declare const M_TO_FEET = 3.28084;
export declare const M_TO_NM = 0.000539957;
export declare const KM_TO_NM: number;
export declare const MS_TO_KTS = 1.94384;
export declare const MS_TO_KMH = 3.6;
export declare const KG_TO_LBS = 2.20462;
export declare const MMHG_TO_INHG = 0.0393701;
export declare function msToKts(metersPerSecond?: number): string;
export declare function toFeet(meters?: number): string;
export declare function toNm(meters?: number): string;
export declare function toDeg(rad?: number): string;
export declare function toRad(deg?: number): number;
export declare function rgbToInt(r: number, g: number, b: number): number;
export declare function toRgba(r: number, g: number, b: number, a: number): string;
export declare function rgbaToHex(r: number, g: number, b: number, a: number): string;
export declare function rgbToHex(r: number, g: number, b: number): string;
export declare function intToCssColor(num: number): string;
export declare function hexaToRgb(hex: string): {
    r: number;
    g: number;
    b: number;
    a: number;
} | null;
export declare function toFahrenheit(celsius: number): number;
export declare const MORSE: {
    a: string;
    b: string;
    c: string;
    d: string;
    e: string;
    f: string;
    g: string;
    h: string;
    i: string;
    j: string;
    k: string;
    l: string;
    m: string;
    n: string;
    o: string;
    p: string;
    q: string;
    r: string;
    s: string;
    t: string;
    u: string;
    v: string;
    w: string;
    x: string;
    y: string;
    z: string;
    " ": string;
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
    "6": string;
    "7": string;
    "8": string;
    "9": string;
    "0": string;
};
export declare const truncateString: (string?: string, maxLength?: number) => string;
export declare const sortStrings: (a: string, b: string) => 0 | 1 | -1;
export declare const sortBy: (a: any, b: any, property: string) => 0 | 1 | -1;
export declare function downloadJson(json: any, name: string, extension?: string): void;
export declare function downloadBlob(url: string, fileName: string): void;
export declare function isTranslation(name: string): RegExpMatchArray | null;
export declare function translate(key: string, dictionary: Record<string, string>): string;
export declare function getTextType(type: string, category: string): string;
export declare function getElevationFeet(lat: any, lng: any): Promise<string>;
export declare function getElevationsFeet(coords: any[]): Promise<any>;
export { js2Lua } from "./js2lua";
export declare function renderFrequency(freq: number): string | number;
export declare function toJsDate(missionDate: any, missionTime?: number): Date;
export declare function toLatLng(latLon: LatLon): {
    lat: number;
    lng: number;
};
export declare function toLatLon(latLng: {
    lat: number;
    lng: number;
}): {
    lat: number;
    lon: number;
};
export declare function prettyLatLon(lat: number, lon: number, fix?: number): string;
export declare function sanitizeAngle(angle: number): number;
export declare function openJsonEditor(data: any): void;
export declare function sanitizeString(input: string): string;
export declare function rgbToHsl(r: any, g: any, b: any): (number | undefined)[];
export declare function getFilter(col: string): string;
/**
 * Converts a distance in pixels to a distance in meters on the Leaflet map.
 * @param {number} pixelDistance - The distance in pixels.
 * @returns {number} The distance in meters.
 */
export declare function pixelsToMeters(map: any, pixelDistance: number): number;
