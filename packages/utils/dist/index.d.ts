export interface LatLon {
    lat: number;
    lon: number;
}
export declare function ConvertDMSToDD(degrees: number, minutes: number, seconds: number, direction: string): number;
export declare function convertDMS(lat: number, lon: number): string;
export declare function convertDMshort(lat: number, lon: number): string;
export declare function convertDMM(lat: number, lon: number): string;
export declare function toHHMMSS(s: number): string;
export declare function LLtoAll(lat: number, lng: number): {
    MGRS: any;
    DMS: string;
    DMM: string;
};
export declare function calcBearing(start: LatLon, end: LatLon): number;
export declare function calcDistance(start: LatLon, end: LatLon): number;
export declare const M_TO_FEET = 3.28084;
export declare function rgbToInt(r: number, g: number, b: number): number;
