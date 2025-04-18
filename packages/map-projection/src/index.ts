import proj4 from "proj4";

/**
 * Values taken from https://github.com/pydcs/dcs all credit goes to their team
 * @date 2/8/2023 - 1:06:49 PM
 *
 * @type {Record<string, any>}
 */
const config: Record<string, any> = {
    Syria: {
        central_meridian: 39,
        false_easting: 282801.00000003993,
        false_northing: -3879865.9999999935,
        scale_factor: 0.9996,
    },
    SinaiMap: {
        central_meridian: 33,
        false_easting: 169222,
        false_northing: -3325313,
        scale_factor: 0.9996,
    },
    SouthEastAsia: {
        // guesstimate to be adjusted, but should not affect projection
        central_meridian: 107,
        false_easting: 200000,
        false_northing: -1800000,
        scale_factor: 0.9996,
    },
    Caucasus: {
        central_meridian: 33,
        false_easting: -99516.9999999732,
        false_northing: -4998114.999999984,
        scale_factor: 0.9996,
    },
    Falklands: {
        central_meridian: -57,
        false_easting: 147639.99999997593,
        false_northing: 5815417.000000032,
        scale_factor: 0.9996,
    },
    MarianaIslands: {
        central_meridian: 147,
        false_easting: 238417.99999989968,
        false_northing: -1491840.000000048,
        scale_factor: 0.9996,
    },
    Nevada: {
        central_meridian: -117,
        false_easting: -193996.80999964548,
        false_northing: -4410028.063999966,
        scale_factor: 0.9996,
    },
    PersianGulf: {
        central_meridian: 57,
        false_easting: 75755.99999999645,
        false_northing: -2894933.0000000377,
        scale_factor: 0.9996,
    },
    Normandy: {
        central_meridian: -3,
        false_easting: -195526.00000000204,
        false_northing: -5484812.999999951,
        scale_factor: 0.9996,
    },
    TheChannel: {
        central_meridian: 3,
        false_easting: 99376.00000000288,
        false_northing: -5636889.00000001,
        scale_factor: 0.9996,
    },
    TopEndAustralia: {
        central_meridian: 135,
        false_easting: 500000,
        false_northing: 10000000,
        scale_factor: 0.9996,
    },
    Kola: {
        central_meridian: 21,
        false_easting: -62702,
        false_northing: -7543625,
        scale_factor: 0.9996,
    },
    Afghanistan: {
        central_meridian: 63,
        false_easting: -300150,
        false_northing: -3759657,
        scale_factor: 0.9996,
    },
    Iraq: {
        central_meridian: 45,
        false_easting: 72290,
        false_northing: -3680057,
        scale_factor: 0.9996,
    },
    GermanyCW: {
        central_meridian: 21,
        false_easting: 35427.62,
        false_northing: -6061633.128,
        scale_factor: 0.9996,
    },
};

/**
 * proj4 projector
 * @date 2/8/2023 - 1:06:49 PM
 *
 * @type {*}
 */
let projector: any;

/**
 * set active DCS map / theater
 * @date 2/8/2023 - 1:06:49 PM
 *
 * @export
 * @param {string} mapName
 * @returns {*}
 */
export function activeMap(mapName: string) {
    const mapConfig = config[mapName];
    if (!mapConfig) throw new Error("Missing map config for " + mapName);

    projector = proj4(
        `+proj=tmerc +lat_0=0 +lon_0=${mapConfig.central_meridian} +k_0=${mapConfig.scale_factor} +x_0=${mapConfig.false_easting} +y_0=${mapConfig.false_northing} +towgs84=0,0,0,0,0,0,0 +units=m +vunits=m +ellps=WGS84 +no_defs +axis=neu`
    );
    return projector;
}

/**
 * Mission x / y coordinates to Lat Lon
 * @date 2/8/2023 - 1:06:49 PM
 *
 * @export
 * @param {number} y
 * @param {number} x
 * @returns {{ lat: number; lon: number; }}
 */
export function mizToLL(y: number, x: number) {
    if (!projector) throw new Error("Projector not defined, call activeMap");
    const [xa, ya] = projector.inverse([y, x]);
    return {
        lat: ya,
        lon: xa,
    };
}

/**
 * Lat Lon to DCS x y mission format
 * @date 2/8/2023 - 1:06:49 PM
 *
 * @export
 * @param {number} lon
 * @param {number} lat
 * @returns {{x, y}}
 */
export function LLToMiz(lon: number, lat: number): number[] {
    if (!projector) throw new Error("Projector not defined, call activeMap");
    const [y, x] = projector.forward([lon, lat]);
    return [x, y];
}

import timeZones from "./TimeZones.json";
export const TimeZones = timeZones;

export { COORDINATES } from "./mapCoordinates";

export const mapNames = Object.keys(config);

export function calcRotationOffset(marker: any, project: Function) {
    // calculate TM -> WM projection rotation offset
    const LLoffset = mizToLL(marker.leaflet.json.y + 10, marker.leaflet.json.x);
    const xyOffset = project([LLoffset.lat, LLoffset.lon]);

    const d = (marker.y - xyOffset.y) / (marker.x - xyOffset.x);
    const rad = Math.tan(d);
    return rad;
}
