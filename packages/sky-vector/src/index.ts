import { activeMap, mizToLL } from "../../map-projection";
import { convertDMshort, M_TO_FEET } from "@dcs-web-editor-mono/utils";

export function toFlightPlan(data:any, theater: string) {
    const group = data.group || data.$group.leaflet.group;
    const waypoints = group?.route?.points;
    if (!waypoints?.length) return;

    activeMap(theater);

    const coordinates: string[] = [];

    waypoints.forEach((point: Record<string, number>) => {
        const latLon = mizToLL(point.y, point.x)
        coordinates.push(
            convertDMshort(latLon.lat, latLon.lon)
        );
    })

    const speed = Math.round(data.unit?.speed)
    const speedString = speed ? speed.toString().padStart(4, '0') : '0200';
    const alt = Math.round((data.unit?.alt || 0) * M_TO_FEET / 100)
    const altString = alt ? alt.toString().padStart(3, '0') : '010';
    
    const params = coordinates.map(wp => `${wp}`).join(' ');
    const zoom = 5;

    const SKYVECTOR_URL = `https://skyvector.com/?ll=${data.lat},${data.lon}&chart=301&zoom=${zoom}&fpl=N${speedString}A${altString} ${params}$´&referrer=DCS_Web_Editor`
    return SKYVECTOR_URL;
}

export function toPoint(lat: number, lon: number, zoom = 5) {
    const SKYVECTOR_URL = `https://skyvector.com/?ll=${lat},${lon}&chart=301&zoom=${skyVectorZoom[zoom]}&referrer=DCS_Web_Editor`
    return SKYVECTOR_URL;    
}
export function airport(code: string) {
    const SKYVECTOR_URL = `https://skyvector.com/search/site/${code}?referrer=DCS_Web_Editor`
    return SKYVECTOR_URL;    
}

export const skyVectorZoom: Record<number, number> = {
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
