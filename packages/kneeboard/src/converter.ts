import { calcDistance, calcBearing, LatLon, isTranslation, translate } from '@dcs-web-editor-mono/utils'
import { mizToLL, activeMap } from '@dcs-web-editor-mono/map-projection'
import _ from 'lodash';

interface Point {
  // original DCS properties
  name?: string;
  ETA: number;
  ETA_locked?: boolean;
  action: string;
  alt: number;
  alt_type: string;
  formation_template?: string;
  speed: number;
  speed_locked: boolean; task: any
  type: string;
  x: number;
  y: number;
  airdromeId?: any;
  
  // calculated or converted by this script
  lat?: number;
  lon?: number;
  altitude?: string;
  heading?: number;
  distance?: number;
  time?: number;
}

export function getWaypoints(group: any, mission: any, dictionary: any) {
  
  // set map projection
  activeMap(mission.theatre);
  

  const points = group.route.points;

  let previousPoint: Point;
  
  // convert all waypoints
  return points.map((point: Point) => {
    setDefaults(point, dictionary);
    convertCoordinates(point);
    convertTime(point, mission.start_time);
    convertAlt(point);
    calculateDistance(point, previousPoint);
    calculateHeading(point, previousPoint);
  
    previousPoint = point;
    
    const picked = _.pick(point, ['name', 'type', 'altitude', 'speed', 'distance', 'heading', 'time', 'lat', 'lon', 'x', 'y'])

    const values = Object.values(picked);
    // Notes
    values.push('');

    return values;
  });
}

function setDefaults(point: Point, dictionary: any) {
  
  _.defaults(point, {
    name: '',
    alt: 0,
    speed: 0,
    ETA: 0,
    x: 0,
    y: 0,
    heading: 0,
    distance: 0,
  });

  console.log(point.ETA)

  point.name = isTranslation(point.name as string) ? translate(point.name as string, dictionary) : point.name;
  point.name = point.name || point.action;
}

function convertCoordinates(point: Point) {
  const latLng = mizToLL(point.y, point.x);
  point.lat = latLng.lat;
  point.lon = latLng.lon;
}

function convertTime(point: Point, start_time: number) {
  point.time = Math.round(point.ETA * 1000) + (start_time * 1000) + 1;
}

function convertAlt(point: Point) {
  const alt = Math.round(point.alt);
  point.altitude = alt + (point.alt_type === 'BARO' ? ' MSL' : ' AGL');
}

function calculateDistance(point: Point, prevPoint:Point) {
  if (!prevPoint) return;
  point.distance = calcDistance(point as LatLon, prevPoint as LatLon); // nm
}

function calculateHeading(point: Point, prevPoint:Point) {
  if (!prevPoint) return;
  point.heading = calcBearing(prevPoint as LatLon, point as LatLon); // nm
}


export const SELECTED_CLASS = "selected";
export const ODD_ROW_CLASS = "odd";
