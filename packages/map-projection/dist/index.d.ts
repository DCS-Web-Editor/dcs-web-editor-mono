/**
 * set active DCS map / theater
 * @date 2/8/2023 - 1:06:49 PM
 *
 * @export
 * @param {string} mapName
 * @returns {*}
 */
export declare function activeMap(mapName: string): any;
/**
 * Mission x / y coordinates to Lat Lon
 * @date 2/8/2023 - 1:06:49 PM
 *
 * @export
 * @param {number} y
 * @param {number} x
 * @returns {{ lat: number; lon: number; }}
 */
export declare function mizToLL(y: number, x: number): {
    lat: any;
    lon: any;
};
/**
 * Lat Lon to DCS x y mission format
 * @date 2/8/2023 - 1:06:49 PM
 *
 * @export
 * @param {number} lon
 * @param {number} lat
 * @returns {{x, y}}
 */
export declare function LLToMiz(lon: number, lat: number): number[];
export { COORDINATES } from './mapCoordinates';
