
import * as MGRS from '../lib/mgrs.esm';
import { convertDistance, getDistance, getRhumbLineBearing } from 'geolib';

export interface LatLon {
    lat: number;
    lon: number;
}

export function ConvertDMSToDD(degrees: number, minutes: number, seconds: number, direction: string) {
    var dd = degrees + minutes / 60 + seconds / (60 * 60);

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}

function toDegreesMinutesAndSeconds(coordinate: number) {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = ((minutesNotTruncated - minutes) * 60).toPrecision(4);
    
    return degrees + "° " + minutes + "' " + seconds;
}

function toDegreesMinutesShort(coordinate: number, longitude = false) {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);

    return degrees.toString().padStart(longitude ? 3 : 2, '0') + minutes.toString().padStart(2, '0');
}


function toDegreesMinutes(coordinate: number) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = minutesNotTruncated.toPrecision(4);

    return degrees + "° " + minutes + "'";
}

export function convertDMS(lat: number, lon: number) {
    var latitude = toDegreesMinutesAndSeconds(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";

    var longitude = toDegreesMinutesAndSeconds(lon);
    var longitudeCardinal = lon >= 0 ? "E" : "W";

    return latitude + " " + latitudeCardinal + "\n" + longitude + " " + longitudeCardinal;
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

    return latitude + " " + latitudeCardinal + "\n" + longitude + " " + longitudeCardinal;
}

export function toHHMMSS(s:number) {
    const date = new Date(0);
    date.setSeconds(s); // specify value for SECONDS here
    return date.toISOString().slice(11, 19);
}

export function LLtoAll(lat: number, lng: number) {
    return {
        MGRS: MGRS.forward([lng, lat], 5),
        DMS: convertDMS(lat, lng),
        DMM: convertDMM(lat, lng),
    }
}

export function calcBearing(start: LatLon, end: LatLon) {
    const a = {
        latitude: start.lat,
        longitude: start.lon,
    }
    const b = {
        latitude: end.lat,
        longitude: end.lon,
    }
    return getRhumbLineBearing(a, b)
}

export function calcDistance(start: LatLon, end: LatLon) {
    const a = {
        latitude: start.lat,
        longitude: start.lon,
    }
    const b = {
        latitude: end.lat,
        longitude: end.lon,
    }
    return convertDistance(getDistance(a, b), 'sm');
}

export const M_TO_FEET = 3.28084;

export function rgbToInt(r:number, g:number, b:number) {
    return (r * 255 << 16) + (g * 255 << 8) + (b * 255);
}