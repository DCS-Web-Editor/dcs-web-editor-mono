import { mizToLL } from "@dcs-web-editor-mono/map-projection";
import { convertDMshort, M_TO_FEET } from "@dcs-web-editor-mono/utils";
export function toFlightPlan(data) {
    const waypoints = data.group?.route.points;
    const coordinates = [];
    waypoints.forEach((point) => {
        const latLon = mizToLL(point.y, point.x);
        coordinates.push(convertDMshort(latLon.lat, latLon.lon));
    });
    const speed = Math.round(data.unit?.speed);
    const speedString = speed ? speed.toString().padStart(4, '0') : '0200';
    const alt = Math.round((data.unit?.alt || 0) * M_TO_FEET / 1000);
    const altString = alt ? alt.toString().padStart(3, '0') : '010';
    const params = coordinates.map(wp => `${wp}`).join(' ');
    const zoom = 5;
    const SKYVECTOR_URL = `https://skyvector.com/?ll=${data.lat},${data.lon}&chart=301&zoom=${zoom}&fpl=N${speedString}A${altString} ${params}`;
    return SKYVECTOR_URL;
}
export function toPoint(lat, lon, zoom = 5) {
    const SKYVECTOR_URL = `https://skyvector.com/?ll=${lat},${lon}&chart=301&zoom=${skyVectorZoom[zoom]}`;
    return SKYVECTOR_URL;
}
export const skyVectorZoom = {
    22: 1,
    21: 1,
    20: 1,
    19: 1,
    18: 1,
    17: 1,
    16: 1,
    15: 1,
    14: 1,
    13: 1,
    12: 1,
    11: 1,
    10: 3,
    9: 5,
    8: 7,
    7: 9,
    6: 11,
    5: 13,
    4: 15,
    3: 17,
    2: 19,
    1: 21,
};
