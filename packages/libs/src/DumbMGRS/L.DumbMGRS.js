/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
//* * Leaflet.DumbMGRS made by CPT James Pistell, 2020 */
//* * Complaints, comments, concerns send to jamespistell@gmail.com */
//* * This took me 340.33 hours to make. I worked on it from 18NOV19 to 14FEB20 */
import './L.DumbMGRS.css';

const L = window.L

// *********************************************************************************** //
// * Set initial map view                                                            * //
// *********************************************************************************** //
// const southFL = [27.381523191705053, -82.82592773437501];
// const map = L.map('map').setView(southFL, 5);
// window.map = map;


// *********************************************************************************** //
// * Leaflet.DumbMGRS - Forked version of mgrs.js (https://github.com/proj4js/mgrs)  * //
// *********************************************************************************** //
// UTM zones are grouped, and assigned to one of a group of 6 sets
const NUM_100K_SETS = 6;
// The column letters (for easting) of the lower left value, per set
const SET_ORIGIN_COLUMN_LETTERS = 'AJSAJS';
// The row letters (for northing) of the lower left value, per set
const SET_ORIGIN_ROW_LETTERS = 'AFAFAF';

const A = 65; // A
const I = 73; // I
const O = 79; // O
const V = 86; // V
const Z = 90; // Z

// Conversion from degrees to radians
function degToRad(deg) {
  return (deg * (Math.PI / 180));
}

// Conversion from radians to degrees
function radToDeg(rad) {
  return (180 * (rad / Math.PI));
}

// Calculates the MGRS letter designator for the given latitude
function getLetterDesignator(latitude) {
  if (latitude <= 84 && latitude >= 72) {
    // the X band is 12 degrees high
    return 'X';
  } if (latitude < 72 && latitude >= -80) {
    // Latitude bands are lettered C through X, excluding I and O
    const bandLetters = 'CDEFGHJKLMNPQRSTUVWX';
    const bandHeight = 8;
    const minLatitude = -80;
    const index = Math.floor((latitude - minLatitude) / bandHeight);
    return bandLetters[index];
  } if (latitude > 84 || latitude < -80) {
    // This is here as an error flag to show that the Latitude is
    // outside MGRS limits
    return 'Z';
  }
}

// Get the two-letter MGRS 100k designator given information
// translated from the UTM northing, easting and zone number.
function getLetter100kID(column, row, parm) {
  // colOrigin and rowOrigin are the letters at the origin of the set
  const index = parm - 1;
  const colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
  const rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);

  // colInt and rowInt are the letters to build to return
  let colInt = colOrigin + column - 1;
  let rowInt = rowOrigin + row;
  let rollover = false;

  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
    rollover = true;
  }

  if (colInt === I || (colOrigin < I && colInt > I) || ((colInt > I || colOrigin < I) && rollover)) {
    colInt += 1;
  }

  if (colInt === O || (colOrigin < O && colInt > O) || ((colInt > O || colOrigin < O) && rollover)) {
    colInt += 1;

    if (colInt === I) {
      colInt += 1;
    }
  }

  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
  }

  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
    rollover = true;
  } else {
    rollover = false;
  }

  if (((rowInt === I) || ((rowOrigin < I) && (rowInt > I))) || (((rowInt > I) || (rowOrigin < I)) && rollover)) {
    rowInt += 1;
  }

  if (((rowInt === O) || ((rowOrigin < O) && (rowInt > O))) || (((rowInt > O) || (rowOrigin < O)) && rollover)) {
    rowInt += 1;

    if (rowInt === I) {
      rowInt += 1;
    }
  }

  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
  }

  const twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
  return twoLetter;
}

// Given a UTM zone number, figure out the MGRS 100K set it is in
function get100kSetForZone(i) {
  let setParm = i % NUM_100K_SETS;
  if (setParm === 0) {
    setParm = NUM_100K_SETS;
  }
  return setParm;
}

// Get the two letter 100k designator for a given UTM easting, northing and zone number value
function get100kID(easting, northing, zoneNumber) {
  const setParm = get100kSetForZone(zoneNumber);
  const setColumn = Math.floor(easting / 100000);
  const setRow = Math.floor(northing / 100000) % 20;
  return getLetter100kID(setColumn, setRow, setParm);
}


// Converts a set of Longitude and Latitude co-ordinates to UTM using the WGS84 ellipsoid
function LLtoUTM(ll) {
  const Lat = ll.lat;
  //! added || ll.lng to comply with Leaflet
  const Long = ll.lon || ll.lng;
  const a = 6378137; // ellip.radius;
  const eccSquared = 0.00669438; // ellip.eccsq;
  const k0 = 0.9996;
  const LatRad = degToRad(Lat);
  const LongRad = degToRad(Long);
  let ZoneNumber;
  // (int)
  ZoneNumber = Math.floor((Long + 180) / 6) + 1;

  // Make sure the longitude 180 is in Zone 60
  if (Long === 180) {
    ZoneNumber = 60;
  }

  // Special zone for Norway
  if (Lat >= 56 && Lat < 64 && Long >= 3 && Long < 12) {
    ZoneNumber = 32;
  }

  // Special zones for Svalbard
  if (Lat >= 72 && Lat < 84) {
    if (Long >= 0 && Long < 9) {
      ZoneNumber = 31;
    } else if (Long >= 9 && Long < 21) {
      ZoneNumber = 33;
    } else if (Long >= 21 && Long < 33) {
      ZoneNumber = 35;
    } else if (Long >= 33 && Long < 42) {
      ZoneNumber = 37;
    }
  }

  const LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3;
  // +3 puts origin in middle of zone
  const LongOriginRad = degToRad(LongOrigin);

  const eccPrimeSquared = (eccSquared) / (1 - eccSquared);

  const N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
  const T = Math.tan(LatRad) * Math.tan(LatRad);
  const C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
  const A = Math.cos(LatRad) * (LongRad - LongOriginRad);

  const M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - (35 * eccSquared * eccSquared * eccSquared / 3072) * Math.sin(6 * LatRad));

  const UTMEasting = (k0 * N * (A + (1 - T + C) * A * A * A / 6 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120) + 500000);

  let UTMNorthing = (k0 * (M + N * Math.tan(LatRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720)));
  if (Lat < 0) {
    UTMNorthing += 10000000; // 10000000 meter offset for
    // southern hemisphere
  }

  return {
    northing: Math.trunc(UTMNorthing),
    easting: Math.trunc(UTMEasting),
    zoneNumber: ZoneNumber,
    zoneLetter: getLetterDesignator(Lat),
  };
}

// Converts UTM coords to lat/long, using the WGS84 ellipsoid. This is a convenience
// class where the Zone can be specified as a single string eg."60N" which
// is then broken down into the ZoneNumber and ZoneLetter
function UTMtoLL(utm) {
  const UTMNorthing = utm.northing;
  const UTMEasting = utm.easting;
  const {
    zoneLetter,
    zoneNumber,
  } = utm;
  // check the ZoneNumber is valid
  if (zoneNumber < 0 || zoneNumber > 60) {
    return null;
  }

  const k0 = 0.9996;
  const a = 6378137; // ellip.radius;
  const eccSquared = 0.00669438; // ellip.eccsq;
  const e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));

  // remove 500,000 meter offset for longitude
  const x = UTMEasting - 500000;
  let y = UTMNorthing;

  // We must know somehow if we are in the Northern or Southern
  // hemisphere, this is the only time we use the letter So even
  // if the Zone letter isn't exactly correct it should indicate
  // the hemisphere correctly
  if (zoneLetter < 'N') {
    y -= 10000000; // remove 10,000,000 meter offset used
    // for southern hemisphere
  }

  // There are 60 zones with zone 1 being at West -180 to -174
  const LongOrigin = (zoneNumber - 1) * 6 - 180 + 3; // +3 puts origin
  // in middle of
  // zone

  const eccPrimeSquared = (eccSquared) / (1 - eccSquared);

  const M = y / k0;
  const mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));

  const phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu);
  // double phi1 = ProjMath.radToDeg(phi1Rad);

  const N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
  const T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
  const C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
  const R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
  const D = x / (N1 * k0);

  let lat = phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
  lat = radToDeg(lat);

  let lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
  lon = LongOrigin + radToDeg(lon);

  let result;
  if (typeof utm.accuracy === 'number') {
    const topRight = UTMtoLL({
      northing: utm.northing + utm.accuracy,
      easting: utm.easting + utm.accuracy,
      zoneLetter: utm.zoneLetter,
      zoneNumber: utm.zoneNumber,
    });
    result = {
      top: topRight.lat,
      right: topRight.lon,
      bottom: lat,
      left: lon,
    };
  } else {
    result = {
      lat,
      lon,
    };
  }
  return result;
}

// Modified version of encode(),
// If prettyPrint is set to true, it prints out the MGRS grids in USNG format (basically adds spaces between GZD, 100k, and northing/easting)
// example: UTMtoMGRS(LLtoUTM({ lat: event.latlng.lat, lon: event.latlng.lng }), 5, true)
function UTMtoMGRS(utm, accuracy, prettyPrint = false) {
  // prepend with leading zeroes
  const southEasting = `00000${utm.easting}`;
  const southNorthing = `00000${utm.northing}`;

  if (prettyPrint) {
    // If true this will display MGRS coords like this: '18T TK 62050 42686'
    return `${utm.zoneNumber}${utm.zoneLetter} ${get100kID(utm.easting, utm.northing, utm.zoneNumber)} ${southEasting.substr(southEasting.length - 5, accuracy)} ${southNorthing.substr(southNorthing.length - 5, accuracy)}`;
  }

  // If false this will display MGRS coords like this: '18TTK6205042686'
  return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + southEasting.substr(southEasting.length - 5, accuracy) + southNorthing.substr(southNorthing.length - 5, accuracy);
}


// *********************************************************************************** //
// * Leaflet.DumbMGRS - Easting and Northing Grid Zone Designator boundaries         * //
// *********************************************************************************** //
// letter = a band of latitude
const northingDict = {
  X: {
    letter: 'X',
    top: 84,
    bottom: 72,
  },
  W: {
    letter: 'W',
    top: 72,
    bottom: 64,
  },
  V: {
    letter: 'V',
    top: 64,
    bottom: 56,
  },
  U: {
    letter: 'U',
    top: 56,
    bottom: 48,
  },
  T: {
    letter: 'T',
    top: 48,
    bottom: 40,
  },
  S: {
    letter: 'S',
    top: 40,
    bottom: 32,
  },
  R: {
    letter: 'R',
    top: 32,
    bottom: 24,
  },
  Q: {
    letter: 'Q',
    top: 24,
    bottom: 16,
  },
  P: {
    letter: 'P',
    top: 16,
    bottom: 8,
  },
  N: {
    letter: 'N',
    top: 8,
    bottom: 0,
  },
  M: {
    letter: 'M',
    top: 0,
    bottom: -8,
  },
  L: {
    letter: 'L',
    top: -8,
    bottom: -16,
  },
  K: {
    letter: 'K',
    top: -16,
    bottom: -24,
  },
  J: {
    letter: 'J',
    top: -24,
    bottom: -32,
  },
  H: {
    letter: 'H',
    top: -32,
    bottom: -40,
  },
  G: {
    letter: 'G',
    top: -40,
    bottom: -48,
  },
  F: {
    letter: 'F',
    top: -48,
    bottom: -56,
  },
  E: {
    letter: 'E',
    top: -56,
    bottom: -64,
  },
  D: {
    letter: 'D',
    top: -64,
    bottom: -72,
  },
  C: {
    letter: 'C',
    top: -72,
    bottom: -80,
  },
};

// id = UTM zone
const eastingDict = {
  1: {
    id: '1',
    left: -180,
    right: -174,
  },
  2: {
    id: '2',
    left: -174,
    right: -168,
  },
  3: {
    id: '3',
    left: -168,
    right: -162,
  },
  4: {
    id: '4',
    left: -162,
    right: -156,
  },
  5: {
    id: '5',
    left: -156,
    right: -150,
  },
  6: {
    id: '6',
    left: -150,
    right: -144,
  },
  7: {
    id: '7',
    left: -144,
    right: -138,
  },
  8: {
    id: '8',
    left: -138,
    right: -132,
  },
  9: {
    id: '9',
    left: -132,
    right: -126,
  },
  10: {
    id: '10',
    left: -126,
    right: -120,
  },
  11: {
    id: '11',
    left: -120,
    right: -114,
  },
  12: {
    id: '12',
    left: -114,
    right: -108,
  },
  13: {
    id: '13',
    left: -108,
    right: -102,
  },
  14: {
    id: '14',
    left: -102,
    right: -96,
  },
  15: {
    id: '15',
    left: -96,
    right: -90,
  },
  16: {
    id: '16',
    left: -90,
    right: -84,
  },
  17: {
    id: '17',
    left: -84,
    right: -78,
  },
  18: {
    id: '18',
    left: -78,
    right: -72,
  },
  19: {
    id: '19',
    left: -72,
    right: -66,
  },
  20: {
    id: '20',
    left: -66,
    right: -60,
  },
  21: {
    id: '21',
    left: -60,
    right: -54,
  },
  22: {
    id: '22',
    left: -54,
    right: -48,
  },
  23: {
    id: '23',
    left: -48,
    right: -42,
  },
  24: {
    id: '24',
    left: -42,
    right: -36,
  },
  25: {
    id: '25',
    left: -36,
    right: -30,
  },
  26: {
    id: '26',
    left: -30,
    right: -24,
  },
  27: {
    id: '27',
    left: -24,
    right: -18,
  },
  28: {
    id: '28',
    left: -18,
    right: -12,
  },
  29: {
    id: '29',
    left: -12,
    right: -6,
  },
  30: {
    id: '30',
    left: -6,
    right: 0,
  },
  31: {
    id: '31',
    left: 0,
    right: 6,
  },
  32: {
    id: '32',
    left: 6,
    right: 12,
  },
  33: {
    id: '33',
    left: 12,
    right: 18,
  },
  34: {
    id: '34',
    left: 18,
    right: 24,
  },
  35: {
    id: '35',
    left: 24,
    right: 30,
  },
  36: {
    id: '36',
    left: 30,
    right: 36,
  },
  37: {
    id: '37',
    left: 36,
    right: 42,
  },
  38: {
    id: '38',
    left: 42,
    right: 48,
  },
  39: {
    id: '39',
    left: 48,
    right: 54,
  },
  40: {
    id: '40',
    left: 54,
    right: 60,
  },
  41: {
    id: '41',
    left: 60,
    right: 66,
  },
  42: {
    id: '42',
    left: 66,
    right: 72,
  },
  43: {
    id: '43',
    left: 72,
    right: 78,
  },
  44: {
    id: '44',
    left: 78,
    right: 84,
  },
  45: {
    id: '45',
    left: 84,
    right: 90,
  },
  46: {
    id: '46',
    left: 90,
    right: 96,
  },
  47: {
    id: '47',
    left: 96,
    right: 102,
  },
  48: {
    id: '48',
    left: 102,
    right: 108,
  },
  49: {
    id: '49',
    left: 108,
    right: 114,
  },
  50: {
    id: '50',
    left: 114,
    right: 120,
  },
  51: {
    id: '51',
    left: 120,
    right: 126,
  },
  52: {
    id: '52',
    left: 126,
    right: 132,
  },
  53: {
    id: '53',
    left: 132,
    right: 138,
  },
  54: {
    id: '54',
    left: 138,
    right: 144,
  },
  55: {
    id: '55',
    left: 144,
    right: 150,
  },
  56: {
    id: '56',
    left: 150,
    right: 156,
  },
  57: {
    id: '57',
    left: 156,
    right: 162,
  },
  58: {
    id: '58',
    left: 162,
    right: 168,
  },
  59: {
    id: '59',
    left: 168,
    right: 174,
  },
  60: {
    id: '60',
    left: 174,
    right: 180,
  },
};


// *********************************************************************************** //
// * Leaflet.DumbMGRS - Grid Zone Designators                                        * //
// *********************************************************************************** //
const GZD = L.LayerGroup.extend({
  // Default options
  options: {
    showLabels: false,
    showGrids: false,
    maxZoom: 18,
    minZoom: 4,
    redraw: 'moveend',
    // default line style for 100K grids
    lineStyle: {
      color: 'red',
      weight: 5,
      opacity: 0.5,
      smoothFactor: 1,
      lineCap: 'butt',
      lineJoin: 'miter-clip',
      noClip: true,
      interactive: false,
      clickable: false, // legacy support
    },
  },

  initialize(options) {
    this._map = map;
    // Call the parent’s constructor
    L.LayerGroup.prototype.initialize.call(this);
    // Merge the provided options with the default options of the class.
    L.Util.setOptions(this, options);
    this.northObj = northingDict;
    this.eastObj = eastingDict;
    this.viz = [];
  },

  onAdd(map) {
    this._map = map;
    const graticule = this.getInBoundsGZDs();
    //! Cannot use 'move' event or it will freeze the entire app
    this._map.on(`viewreset ${this.options.redraw} move`, graticule.getInBoundsGZDs, graticule);
  },

  onRemove(map) {
    this._map = map;
    this._map.off(`viewreset ${this.options.redraw} move`, this._map);
		this.eachLayer(this.removeLayer, this);
  },

  hideGrids() {
    this.options.showGrids = true;
    this.getInBoundsGZDs();
  },

  hideLabels() {
    this.options.showLabels = false;
    this.getInBoundsGZDs();
  },

  showGrids() {
    this.options.showGrids = false;
    this.getInBoundsGZDs();
  },

  showLabels() {
    this.options.showLabels = true;
    this.getInBoundsGZDs();
  },

  // Find all the Grid Zone Designators that are in your view
  getInBoundsGZDs() {
    // Clear every grid off the map
    this.clearLayers();

    const currentZoom = this._map?.getZoom() ?? 0;

    // Do not create GZDs if the map is zoomed out at 4 or below
    if ((currentZoom >= this.options.minZoom) && (currentZoom <= this.options.maxZoom)) {
      // Combined the northingDict and eastingDict into one object
      const combinedObj = { ...this.northObj, ...this.eastObj };
      // Create an array to store the inBounds values for letter,top, and bottom
      const inBoundsLatitudeLetters = [];
      // Create an array to store the inBounds values for top, right, and id
      const inBoundsUTMNumbers = [];
      // This stores the current visible GZDs
      this.viz = [];
      const currentVisibleBounds = this._map.getBounds();

      Object.values(combinedObj).forEach((key) => {
        const { top } = key;
        const { bottom } = key;
        const { left } = key;
        const { right } = key;
        const { id } = key;

        // Since we don't want to create grids for what we can't see this returns all the valid inBounds properties in the northingDict
        if (currentVisibleBounds.getNorthEast().lat >= bottom && currentVisibleBounds.getSouthWest().lat <= top) {
          inBoundsLatitudeLetters.push(key);
        }

        // Same thing here but it returns the valid inBounds properties for the eastingDict
        if (currentVisibleBounds.getNorthEast().lng >= left && currentVisibleBounds.getSouthWest().lng <= right) {
          // Handle special GZDs
          if (id === '31' && currentVisibleBounds.getSouth() > 56) {
            // This is fired off when 31V AND 32V are in the visible bounds
            const adjustedVisibleBounds = new L.latLngBounds(currentVisibleBounds.getNorthEast(), currentVisibleBounds.getSouthWest());
            if (adjustedVisibleBounds.contains({ lat: currentVisibleBounds.getNorthEast().lat, lng: 3 })) {
              inBoundsUTMNumbers.push({ left: 0, right: 3, id: '31' });
              inBoundsUTMNumbers.push({ left: 3, right: 12, id: '32' });
            }
            // GZD 31V
            if (currentVisibleBounds.getWest() > 0 && currentVisibleBounds.getEast() < 3) {
              inBoundsUTMNumbers.push({ left: 0, right: 3, id: '31' });
            }
            // GZD 32V
            if (currentVisibleBounds.getWest() > 3 && currentVisibleBounds.getEast() < 12) {
              inBoundsUTMNumbers.push({ left: 3, right: 12, id: '32' });
            }
          } else {
            inBoundsUTMNumbers.push({ left, right, id });
          }
        }
      });

      // Define the "id" property in this object so we can store all the values returned from inBoundsUTMNumbers
      inBoundsLatitudeLetters.forEach((e) => {
        const letterKey = e;
        Object.defineProperties(letterKey, {
          id: {
            value: inBoundsUTMNumbers.map((j) => j),
            writable: true,
          },
        });
      });

      // Iterate over all the returned values and instantiate the class to create the grids
      Object.values(inBoundsLatitudeLetters).forEach((key) => {
        const letterID = key.letter;
        const { top } = key;
        const { bottom } = key;

        for (let index = 0; index < key.id.length; index += 1) {
          const element = key.id[index];
          const { left } = element;
          const { right } = element;
          let { id } = element;
          // This appends the number "0" to GZDs with an ID of less than 10
          // Without it the grids won't load since the ids will be parsed as a number
          // (eg- "01W" will default to "1W" which is invalid)
          if (id < 10) {
            id = `0${id}`;
          }

          this.buildGZD({
            top,
            bottom,
            letterID,
            left,
            right,
            id,
          });
        }
      });
    }
    return this;
  },

  buildGZD(params) {
    this.params = params;
    // Adjust coordinates for special GZDs around Norway and Svalbard
    const exceptionZones = `${this.params.id}${this.params.letterID}`;
    switch (exceptionZones) {
      case '31X':
        this.params.right = 9;
        break;
      case '32X':
        return;
      case '33X':
        this.params.left = 9;
        this.params.right = 21;
        break;
      case '34X':
        return;
      case '35X':
        this.params.left = 21;
        this.params.right = 33;
        break;
      case '36X':
        return;
      case '37X':
        this.params.left = 33;
        break;
      case '31V':
        this.params.right = 3;
        break;
      case '32V':
        this.params.left = 3;
        break;
      default:
        break;
    }
    // This is where the 100k grids gets it's data from
    this.viz.push({
      top: this.params.top,
      bottom: this.params.bottom,
      letterID: this.params.letterID,
      left: this.params.left,
      right: this.params.right,
      id: this.params.id,
    });

    const topLeft = new L.LatLng(this.params.top, this.params.left);
    const topRight = new L.LatLng(this.params.top, this.params.right);
    const bottomRight = new L.LatLng(this.params.bottom, this.params.right);
    // const bottomLeft = new L.LatLng(this.params.bottom, this.params.left);
    // We do not need bottomLeft and topLeft on the gzdBox, since they just overlap anyways
    const gzdBox = [topLeft, topRight, bottomRight];
    const gzdPolylineBox = new L.Polyline(gzdBox, this.options.lineStyle);

    const gzdPolylineBounds = gzdPolylineBox.getBounds();
    const gzdIdSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // Once the polylines are added to the map we can begin centering the Grid Zone Designator
    gzdIdSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    // Put this into an event listener where if the map zoom is <=7, adjust viewBox to '0 0 200 100' or something
    gzdIdSVG.setAttribute('viewBox', '75 50 50 50');
    gzdIdSVG.innerHTML = `
      <rect width="200" height="100" fill="orange" fill-opacity="0.3"/>
      <text x="100" y="70" fill="black" font-weight="bold" fill-opacity="0.3" font-family="Arial" font-size="30" text-anchor="middle" dominant-baseline="central">${this.params.id}${this.params.letterID}</text>`;
    gzdIdSVG.setAttributeNS(null, 'class', 'leaflet-grid-label');
    // Get the difference between the north east and southwest latitudes/longitudes and divide by 2
    const halfLat = (gzdPolylineBounds.getNorthEast().lat - gzdPolylineBounds.getSouthWest().lat) / 2; // (eg- 40.000 - 48.000 / 2 = 4)
    const halfLng = (gzdPolylineBounds.getNorthEast().lng - gzdPolylineBounds.getSouthWest().lng) / 2; // (eg- -72.000 - -78.000 / 2 = 3)
    // Now add those values to the southwest latitude/longitude to get the center point of the GZD
    const centerLat = gzdPolylineBounds.getSouthWest().lat + halfLat;
    const centerLng = gzdPolylineBounds.getSouthWest().lng + halfLng;
    // Add or subtract a small number on the center latitudes/longitudes, this will give us a legitimate new LatLngBounds
    // Add the pad() method at the end to add padding on all sides of the new boundaries so the GZD ID label can fit
    const centerBounds = new L.LatLngBounds([centerLat + 0.01, centerLng - 0.01], [centerLat - 0.01, centerLng + 0.01]).pad(10.5);
    // Now add the GZD overlays to the center of the GZD
    const gzdLabels = new L.svgOverlay(gzdIdSVG, centerBounds);
    if (this.options.showLabels) {
      // If the label is in the visible bounds, add it to the map
      if (this._map.getBounds().pad(0.1).contains(gzdLabels.getBounds().getCenter())) {
        this.addLayer(gzdLabels);
      }
    }
    if (this.options.showGrids) {
      this.addLayer(gzdPolylineBox);
    }
  },
});


// *********************************************************************************** //
// * Leaflet.DumbMGRS - 100k Grids                                                   * //
// *********************************************************************************** //
// TODO: Rename this.empty to something logical
// TODO: Fix northing grid errors for zone letter X
// TODO: Finish configuring the special zones exceptions
const MGRS100K = L.LayerGroup.extend({
  // Default options
  options: {
    showLabels: false,
    showGrids: false,
    maxZoom: 18,
    minZoom: 6,
    redraw: 'moveend',
    gridLetterStyle: 'color: #216fff; font-size:12px;',
    // default line style for 100K grids
    lineStyle: {
      color: 'black',
      weight: 2,
      opacity: 1,
      interactive: false,
      clickable: false, // legacy support
      fill: false,
      noClip: true,
      smoothFactor: 4,
      lineCap: 'butt',
      lineJoin: 'miter-clip',
    },
  },


  initialize(options) {
    this._map = map;
    // Call the parent's constructor from the child (like using super()) by accessing the parent class prototype
    L.LayerGroup.prototype.initialize.call(this);
    // Merge the provided options with the default options of the class.
    L.Util.setOptions(this, options);
    this.eastingArray = [];
    this.northingArray = [];
    // dumb name, but this temporarily holds the visible grids so I can iterate over them
    this.empty = [];
    // visible grid zones from this.empty will be dumped in here
    this.uniqueVisibleGrids = {};
    // gridInterval set at 100k meters, ideally this should be adjustable so I can use it for the 1000 meter grids
    this.gridInterval = 100000;
  },

  onAdd(map) {
    this._map = map;
    const graticule = this.getVizGrids();
    //! Cannot use 'move' event or it will freeze the entire app
    this._map.on(`viewreset ${this.options.redraw}`, graticule.getVizGrids, graticule);
  },

  onRemove(map) {
    this._map = map;
    this._map.off(`viewreset ${this.options.redraw}`, this._map);
		this.eachLayer(this.removeLayer, this);
  },

  hideGrids() {
    this.options.showGrids = false;
    this.getVizGrids();
  },

  hideLabels() {
    this.options.showLabels = false;
    this.getVizGrids();
  },

  showGrids() {
    this.options.showGrids = true;
    this.getVizGrids();
  },

  showLabels() {
    this.options.showLabels = true;
    this.getVizGrids();
  },

  getVizGrids() {
    // Clear every grid off the map
    this.clearLayers();
    const currentZoom = this._map?.getZoom();
    if ((currentZoom >= this.options.minZoom) && (currentZoom <= this.options.maxZoom)) {
      // empty the arrays so we can redraw the grids
      this.empty = [];
      this.eastingArray = [];
      this.northingArray = [];
      // Get the North/South/East/West visible bounds and add padding
      this.north = new L.latLngBounds(this._map.getBounds()).pad(this.getPaddingOnZoomLevel(this._map)).getNorth();
      this.south = new L.latLngBounds(this._map.getBounds()).pad(this.getPaddingOnZoomLevel(this._map)).getSouth();
      this.east = new L.latLngBounds(this._map.getBounds()).pad(this.getPaddingOnZoomLevel(this._map)).getEast();
      this.west = new L.latLngBounds(this._map.getBounds()).pad(this.getPaddingOnZoomLevel(this._map)).getWest();
      // GZ is the variable name for the GZD class I instantiated earlier
      generateGZDGrids.viz.forEach((visibleGrid) => {
      // This will tell us what grid squares are visible on the map
        this.empty.push(visibleGrid);
      });
      // This just creates a neater object where I can parse the data easier
      this.uniqueVisibleGrids = Object.keys(this.empty).reduce((acc, k) => {
        const grid = this.empty[k].id;
        acc[grid] = acc[grid] || [];
        acc[grid].push(this.empty[k]);
        return acc;
      }, {});
      this.prepGrids(this.uniqueVisibleGrids);
    }
    return this;
  },

  prepGrids(uniqueVisibleGrids) {
    this.uniqueVisibleGrids = uniqueVisibleGrids;
    const visibleGridsIterator = new Map(Object.entries(this.uniqueVisibleGrids));

    // Not sure how useful this promise is. It works fine with just a forEach loop
    //! use async/await or just a forEach loop?
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    visibleGridsIterator.forEach((grid) => {
      delay(20)
        .then(() => {
          // This is where all the grids are generated.
          this.generateGrids(grid);
          return delay(3000);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  },

  generateGrids(data) {
    this.data = data;
    const buffer = 0.00001;
    if (!this.options.showGrids) {
      return;
    }
    Object.values(this.data).forEach((x) => {
      // Get the corners of the visible grids and convert them from latlon to UTM
      const sw = LLtoUTM({ lat: x.bottom + buffer, lon: x.left + buffer });
      const se = LLtoUTM({ lat: x.bottom + buffer, lon: x.right - buffer });
      const ne = LLtoUTM({ lat: x.top - buffer, lon: x.right - buffer });
      const nw = LLtoUTM({ lat: x.top - buffer, lon: x.left + buffer });

      const hemisphere = this._map.getCenter().lat <= 0 ? 'South' : 'North';
      let northingIteratorNorthHemisphere = sw.northing;
      let eastingIteratorNorthHemisphere = sw.easting;
      let northingIteratorSouthHemisphere = sw.northing;
      let eastingIteratorSouthHemisphere = nw.easting;

      // Check which hemisphere the user is in and make adjustments
      switch (hemisphere) {
        case 'North':
          // Find all northing grids that are divisible by 100,000
          if (sw.zoneLetter === ne.zoneLetter) {
            while (northingIteratorNorthHemisphere <= ne.northing) {
              // This loop basically checks to make sure the easting grid is divisible by 100K
              if (northingIteratorNorthHemisphere % this.gridInterval === 0) {
                this.northingArray.push({
                  northing: northingIteratorNorthHemisphere,
                  zoneNumber: sw.zoneNumber,
                  zoneLetter: sw.zoneLetter,
                });
              }
              northingIteratorNorthHemisphere += 1;
            }
          }
          // Find all easting grids that are divisible by 100,000
          if (sw.zoneLetter === se.zoneLetter) {
            while (eastingIteratorNorthHemisphere <= se.easting) {
              if (eastingIteratorNorthHemisphere % this.gridInterval === 0) {
                this.eastingArray.push({
                  easting: eastingIteratorNorthHemisphere,
                  zoneNumber: sw.zoneNumber,
                  zoneLetter: sw.zoneLetter,
                });
              }
              eastingIteratorNorthHemisphere += 1;
            }
          }
          break;
        case 'South':
          // Find all northing grids that are divisible by 100,000
          if (sw.zoneLetter === ne.zoneLetter) {
            while (northingIteratorSouthHemisphere <= ne.northing) {
              // This loop basically checks to make sure the easting grid is divisible by 100K
              if (northingIteratorSouthHemisphere % this.gridInterval === 0) {
                this.northingArray.push({
                  northing: northingIteratorSouthHemisphere,
                  zoneNumber: nw.zoneNumber,
                  zoneLetter: nw.zoneLetter,
                });
              }
              northingIteratorSouthHemisphere += 1;
            }
          }
          // Find all easting grids that are divisible by 100,000
          if (nw.zoneLetter === ne.zoneLetter) {
            while (eastingIteratorSouthHemisphere <= ne.easting) {
              if (eastingIteratorSouthHemisphere % this.gridInterval === 0) {
                this.eastingArray.push({
                  easting: eastingIteratorSouthHemisphere,
                  zoneNumber: nw.zoneNumber,
                  zoneLetter: nw.zoneLetter,
                });
              }
              eastingIteratorSouthHemisphere += 1;
            }
          }
          break;
        default:
          break;
      }
    });


    //* Build the northing grid lines *//
    Object.entries(this.northingArray).forEach((na) => {
      const northingGridsArray = [];
      const bottomNorthing = na[1];
      const southWestCorner = new L.latLng({ lat: this.south, lon: this.west });
      const northEastCorner = new L.latLng({ lat: this.north, lon: this.east });
      const bounds = new L.latLngBounds(southWestCorner, northEastCorner);
      const bottomRow = this.eastingArray.map((j) => {
        if (j.zoneNumber === bottomNorthing.zoneNumber && j.zoneLetter === bottomNorthing.zoneLetter) {
          return [j, bottomNorthing];
        }
      });

      // Since bottomRow now contains grids from this.northingArray and this.eastingArray, we can add them to the empty array to loop over later
      bottomRow.forEach((k) => {
        if (k) {
          const northingGrids = UTMtoLL({
            northing: k[1].northing,
            easting: k[0].easting,
            zoneNumber: k[0].zoneNumber,
            zoneLetter: k[0].zoneLetter,
          });
          //! gen grid labels
          if (this.options.showLabels) {
            this.genLabels(k[1].northing, k[0].easting, k[0].zoneNumber, k[0].zoneLetter);
          }

          // If the northingGrids are within the visible boundaries of the map, then push them to the array
          if (bounds.contains(northingGrids)) {
            northingGridsArray.push(northingGrids);
          }
        }
      });

      const len = northingGridsArray.length;
      for (let index = 0; index < len; index += 1) {
        const element = [northingGridsArray[index], northingGridsArray[index + 1]];
        const northingLine = new L.Polyline([element], this.options.lineStyle);
        // Create a special grid for oddball grid zones like Norway and Svalbard
        this.handleSpecialZones(element);
        // Since element is an array of objects, check if the 2nd element is available in the array IOT generate a complete grid
        if (element[1]) {
          // If the user is scrolled all the way up to the X zone, then just run cleanLine
          if (this.data[0].letterID === 'X') {
            this.cleanLine(northingLine, this.data[0].left, this.data[0].right);
          }
          // If element[1]'s longitude is less than the right GZD boundary longitude and greater than the left GZD boundary
          if (element[1].lon <= this.data[0].right && element[0].lon >= this.data[0].left) {
            // This is where the northingLine grids will be output from
            // Basically what this.cleanLine aims to do is clip any polylines that go past their GZD boundaries
            this.cleanLine(northingLine, this.data[0].left, this.data[0].right);
            // This will "connect" the 100k grid to the east and west end of the GZD
            let count = 0;
            while (count < this.data.length) {
              // If any Polylines are less than 100k meters away from the GZD, we can then start connecting them
              // Convert element[0] to a LatLng so we can use the distanceTo() method
              const connectingNorthingLineWest = new L.latLng({ lat: element[0].lat, lng: element[0].lon });
              const connectingNorthingLineEast = new L.latLng({ lat: element[1].lat, lng: element[1].lon });
              this.connectingNorthingLine(connectingNorthingLineWest, element, 0, this.data, count, 'left');
              this.connectingNorthingLine(connectingNorthingLineEast, element, 1, this.data, count, 'right');
              count += 1;
              break;
            }
          }
        }
      }
    });

    //* Build the easting grid lines *//
    Object.entries(this.eastingArray).forEach((ea) => {
      // This empty array will hold all latlngs generated from the "bottomRow" forEach loop.
      const eastingGridsArray = [];
      const bottomEasting = ea[1];
      const southWestCorner = new L.latLng({ lat: this.south, lon: this.west });
      const northEastCorner = new L.latLng({ lat: this.north, lon: this.east });
      const bounds = new L.latLngBounds(southWestCorner, northEastCorner);
      const bottomRow = this.northingArray.map((j) => {
        // match grid zones and grid IDs together
        if (j.zoneNumber === bottomEasting.zoneNumber && j.zoneLetter === bottomEasting.zoneLetter) {
          return [j, bottomEasting];
        }
      });

      // Since bottomRow now contains grids from this.northingArray and this.eastingArray, we can add them to the empty array to loop over later
      bottomRow.forEach((k) => {
        if (k) {
          const eastingGrids = UTMtoLL({
            northing: k[0].northing,
            easting: k[1].easting,
            zoneNumber: k[0].zoneNumber,
            zoneLetter: k[0].zoneLetter,
          });

          // If the eastingGrids are within the visible boundaries of the map, then push them to the array
          if (bounds.contains(eastingGrids)) {
            eastingGridsArray.push(eastingGrids);
          }
        }
      });

      // I was told that setting the length of the loop like this has better performance than just array.length
      const len = eastingGridsArray.length;
      for (let index = 0; index < len; index += 1) {
        const element = [eastingGridsArray[index], eastingGridsArray[index + 1]];
        const eastingLine = new L.Polyline([element], this.options.lineStyle);
        this.handleSpecialZones(element);
        // Since element is an array of objects, check if the 2nd element is available in the array IOT generate a complete grid
        if (element[1]) {
          // If element[1]'s longitude is less than the left boundary and greater than the right boundary
          if (element[0].lon > this.data[0].left && element[0].lon < this.data[0].right) {
            // Basically what this.cleanLine aims to do is clip any polylines that go past their GZD boundaries
            this.cleanLine(eastingLine, this.data[0].left, this.data[0].right);
            // Connect the easting lines to the north and south parts of the GZD
            // IOT get the bottom latitude for each grid we need to loop over it
            let count = 0;
            while (count < this.data.length) {
              // If any Polylines are less than 100k meters away from the GZD, we can then start connecting them
              const connectingEastingLineSouth = new L.latLng({ lat: element[0].lat, lng: element[0].lon });
              const connectingEastingLineNorth = new L.latLng({ lat: element[1].lat, lng: element[1].lon });
              this.connectingEastingLine(connectingEastingLineSouth, element, 0, this.data, count, 'bottom');
              this.connectingEastingLine(connectingEastingLineNorth, element, 1, this.data, count, 'top');
              count += 1;
            }
          }
        }
      }
    });
  },

  // This function takes an easting or northing line and 2 bounds (left and right)
  // It returns a new line with the same slope but bounded
  // A line is defined by y = slope * x + b
  // The only difference here is testing first to see if bounds cut the line
  cleanLine(line, leftLongitudeLimit, rightLongitudeLimit) {
    // Line is going to be the eastingLine/northingLine variable the gets passed in
    const lineToClean = line.getLatLngs();
    // line style options passed in from eastingLine/northingLine
    const { options } = line;
    // pt1 is element[0]
    let pt1 = lineToClean[0][0];
    // pt2 is element[1]
    let pt2 = lineToClean[0][1];
    // slope is some funky math I copied from https://github.com/trailbehind/leaflet-grids
    const slope = (pt1.lat - pt2.lat) / (pt1.lng - pt2.lng);
    // adding some space to the longitude so lines are more accurate
    const lngBuffer = 0.00125;

    if (pt1.lng < leftLongitudeLimit) {
      const newLat = pt1.lat + (slope * (leftLongitudeLimit - pt1.lng) + lngBuffer);
      pt1 = new L.latLng(newLat, leftLongitudeLimit);
    }

    if (pt2.lng > rightLongitudeLimit) {
      const newLat = pt1.lat + (slope * (rightLongitudeLimit - pt1.lng) + lngBuffer);
      pt2 = new L.latLng(newLat, rightLongitudeLimit);
    }

    if (pt2.lng < leftLongitudeLimit) {
      const newLat = pt1.lat + (slope * (leftLongitudeLimit - pt1.lng) + lngBuffer);
      pt2 = new L.latLng(newLat, leftLongitudeLimit);
    }

    // Get the northEast and southWest corner of the map
    const nePoint = new L.point(this._map.latLngToLayerPoint(this._map.getBounds().getNorthEast()));
    const swPoint = new L.point(this._map.latLngToLayerPoint(this._map.getBounds().getSouthWest()));
    const cornerBounds = new L.bounds(nePoint, swPoint);
    // Clip the points that are outside of the visible map boundaries
    const clippedLines = L.LineUtil.clipSegment(this._map.latLngToLayerPoint(pt1), this._map.latLngToLayerPoint(pt2), cornerBounds);
    if (clippedLines) {
      const newLine = new L.Polyline([this._map.layerPointToLatLng(clippedLines[0]), this._map.layerPointToLatLng(clippedLines[1])], options);
      if (pt2.lat > this.south) {
        // ensures that the grid lines are valid northings
        // since some of them will have northing values of like 5799999, just round up
        if ((Math.round(LLtoUTM(pt1).northing / 10) * 10) % this.gridInterval === 0) {
          this.addLayer(newLine);
        }
      }
    }
  },

  // These next 2 functions will "connect" the northing and easting 100k grid lines to their adjacent GZD
  // CONNECTOR is the connecting line we pass in (eg - connectingEastingLineSouth)
  // ELEMENT is the grid lines generated from the for loop. The element is an object with 2 arrays containing latitudes & longitudes
  // DATA is the GZD data (example, this.data contains info on the corner boundaries of the visible GZDs)
  // COUNT is the index used in the while loop
  // DIRECTION is the information we want to access in "this.data[count].top/bottom/left/right"
  connectingEastingLine(connector, element, elementIndex, data, count, direction) {
    // If the map view latitude is above 60, then add a multiplier to the gridInterval since the 100k grids get more spaced out as you go north
    const northBuffer = this.north > 60 ? 1.5 : 1.03;
    const connectorDistance = connector.distanceTo({ lat: data[count][direction], lng: element[elementIndex].lon });
    if (connectorDistance <= this.gridInterval * northBuffer) {
      const eastingGridLineEndpoint = LLtoUTM({ lat: data[count][direction], lon: connector.lng });
      const extendedEastingLine = UTMtoLL({
        northing: eastingGridLineEndpoint.northing,
        // round the easting so it lines up with the bottom grid.
        easting: Math.round(eastingGridLineEndpoint.easting / this.gridInterval) * this.gridInterval,
        zoneNumber: eastingGridLineEndpoint.zoneNumber,
        zoneLetter: eastingGridLineEndpoint.zoneLetter,
      });

      const connectingEastingLineToGZD = new L.Polyline([connector, extendedEastingLine], this.options.lineStyle);
      // since some of them will have northing values of like 5799999, just round up
      if ((Math.round(LLtoUTM(connectingEastingLineToGZD.getLatLngs()[0]).northing / 10) * 10) % this.gridInterval === 0) {
        // Get the northEast and southWest corner of the map
        const nePoint = new L.point(this._map.latLngToLayerPoint(this._map.getBounds().getNorthEast()));
        const swPoint = new L.point(this._map.latLngToLayerPoint(this._map.getBounds().getSouthWest()));
        const cornerBounds = new L.bounds(nePoint, swPoint);
        // Clip the points that are outside of the visible map boundaries
        const clippedLines = L.LineUtil.clipSegment(this._map.latLngToLayerPoint(connector), this._map.latLngToLayerPoint(extendedEastingLine), cornerBounds);
        if (clippedLines) {
          const newLine = new L.Polyline([this._map.layerPointToLatLng(clippedLines[0]), this._map.layerPointToLatLng(clippedLines[1])], this.options.lineStyle);
          this.addLayer(newLine);
        }
      }
    }
  },

  connectingNorthingLine(connector, element, elementIndex, data, count, direction) {
    const southBuffer = this.south > -20 ? 1 : 1.51;
    // This garbage code is useful for dealing with GZD columns that are crossing the 0 degree longitude plane
    if (data[count].id === '30' || data[count].id === '31') {
      if (connector.distanceTo({ lat: connector.lat, lon: this.data[0].left - 0.0001 }) <= this.gridInterval * southBuffer) {
        const northingGridLineEndpoint = LLtoUTM({ lat: connector.lat, lon: this.data[0].left - 0.0001 });
        const extendedNorthingLine = UTMtoLL({
          northing: Math.round(northingGridLineEndpoint.northing / this.gridInterval) * this.gridInterval,
          easting: northingGridLineEndpoint.easting,
          zoneNumber: northingGridLineEndpoint.zoneNumber,
          zoneLetter: northingGridLineEndpoint.zoneLetter,
        });
        const connectingNorthingLineToGZD = new L.Polyline([connector, extendedNorthingLine], this.options.lineStyle);
        this.addLayer(connectingNorthingLineToGZD);
      }
      if (connector.distanceTo({ lat: connector.lat, lon: this.data[0].right + 0.0001 }) <= this.gridInterval * southBuffer) {
        const northingGridLineEndpoint = LLtoUTM({ lat: connector.lat, lon: this.data[0].right + 0.0001 });
        const extendedNorthingLine = UTMtoLL({
          northing: Math.round(northingGridLineEndpoint.northing / this.gridInterval) * this.gridInterval,
          easting: northingGridLineEndpoint.easting,
          zoneNumber: northingGridLineEndpoint.zoneNumber,
          zoneLetter: northingGridLineEndpoint.zoneLetter,
        });
        const connectingNorthingLineToGZD = new L.Polyline([connector, extendedNorthingLine], this.options.lineStyle);
        this.addLayer(connectingNorthingLineToGZD);
      }
      return;
    }
    // For any other GZD, just run this
    const connectorDistance = connector.distanceTo({ lat: element[elementIndex].lat, lng: data[count][direction] });
    if (connectorDistance <= this.gridInterval * southBuffer) {
      const northingGridLineEndpoint = LLtoUTM({ lat: connector.lat, lon: data[count][direction] });
      const extendedNorthingLine = UTMtoLL({
        northing: Math.round(northingGridLineEndpoint.northing / this.gridInterval) * this.gridInterval,
        easting: northingGridLineEndpoint.easting,
        zoneNumber: northingGridLineEndpoint.zoneNumber,
        zoneLetter: northingGridLineEndpoint.zoneLetter,
      });

      const connectingNorthingLineToGZD = new L.Polyline([connector, extendedNorthingLine], this.options.lineStyle);
      // since some of them will have easting values of like 5799999, just round up
      if ((Math.round(LLtoUTM(connectingNorthingLineToGZD.getLatLngs()[0]).easting / 10) * 10) % this.gridInterval === 0) {
        // Get the northEast and southWest corner of the map
        const nePoint = new L.point(this._map.latLngToLayerPoint(this._map.getBounds().getNorthEast()));
        const swPoint = new L.point(this._map.latLngToLayerPoint(this._map.getBounds().getSouthWest()));
        const cornerBounds = new L.bounds(nePoint, swPoint);
        // Clip the points that are outside of the visible map boundaries
        const clippedLines = L.LineUtil.clipSegment(this._map.latLngToLayerPoint(connector), this._map.latLngToLayerPoint(extendedNorthingLine), cornerBounds);
        if (clippedLines) {
          const newLine = new L.Polyline([this._map.layerPointToLatLng(clippedLines[0]), this._map.layerPointToLatLng(clippedLines[1])], this.options.lineStyle);
          this.addLayer(newLine);
        }
      }
    }
  },

  handleSpecialZones(element) {
    const elementUTM = LLtoUTM(element[0]);
    // 31V is that slim GZD between Norway and Britain.
    if (elementUTM.zoneNumber === 31 && elementUTM.zoneLetter === 'V') {
      if (elementUTM.northing % this.gridInterval === 0) {
        const specialLine = new L.Polyline([{ lat: element[0].lat, lng: element[0].lon }, UTMtoLL({
          northing: elementUTM.northing,
          easting: 499999,
          zoneNumber: elementUTM.zoneNumber,
          zoneLetter: elementUTM.zoneLetter,
        })], this.options.lineStyle);
        // 0.0179 is some dumbass number I came up with IOT adjust the specialLine2 start point in GZD 31V. It's not very accurate but 31V is a stupid fucking GZD and has no land on it anyways. Waste of my fucking time.
        const specialLine2 = new L.Polyline([{ lat: element[0].lat - 0.0179, lng: 0.0000001 }, UTMtoLL({
          northing: elementUTM.northing,
          easting: elementUTM.easting,
          zoneNumber: elementUTM.zoneNumber,
          zoneLetter: elementUTM.zoneLetter,
        })], this.options.lineStyle);
        this.addLayer(specialLine);
        this.addLayer(specialLine2);
      }
    }
    if (element[1]) {
      if (elementUTM.zoneNumber === 32 && elementUTM.zoneLetter === 'V') {
        // This is the western longitude of the previous GZD "31V"
        const westBounds = 3;
        if (element[1].lon > westBounds) {
          const eastingLine = new L.Polyline([element], this.options.lineStyle);
          const connectingNorthingLineWest = new L.latLng({ lat: element[0].lat, lng: element[0].lon });
          //! Remove this if statement and use this.connectingLine()
          // If any Polylines are less than 100k meters away from the GZD, we can then start connecting them
          if (connectingNorthingLineWest.distanceTo({ lat: element[0].lat, lng: westBounds }) <= this.gridInterval) {
            const eastingGridLineEndpoint = LLtoUTM({ lat: connectingNorthingLineWest.lat, lon: westBounds });
            const extendedLineWest = UTMtoLL({
              northing: Math.round(eastingGridLineEndpoint.northing / this.gridInterval) * this.gridInterval,
              easting: eastingGridLineEndpoint.easting,
              zoneNumber: eastingGridLineEndpoint.zoneNumber,
              zoneLetter: eastingGridLineEndpoint.zoneLetter,
            });
            const connectingNorthingLineWestToGZD = new L.Polyline([connectingNorthingLineWest, extendedLineWest], this.options.lineStyle);
            this.addLayer(connectingNorthingLineWestToGZD);
          }
          this.addLayer(eastingLine);
        }
      }
    }
  },

  genLabels(northingLabel, eastingLabel, zoneNumberLabel, zoneLetterLabel) {
    // do not fire off labels when the map is zoomed out (default is zoom level 6)
    if (this._map.getZoom() <= this.options.minZoom) {
      return;
    }

    if (this.options.showLabels) {
      let labelGrids = UTMtoLL({
        northing: northingLabel + this.gridInterval / 2,
        easting: eastingLabel,
        zoneNumber: zoneNumberLabel,
        zoneLetter: zoneLetterLabel,
      });
      const labelWestOfRightGZD = new L.latLng(labelGrids).distanceTo({ lat: labelGrids.lat, lng: this.data[0].right });
      const labelEastOfRightGZD = new L.latLng(labelGrids).distanceTo({ lat: labelGrids.lat, lng: this.data[0].left });

      // These are the labels that are right next to the LEFT of the visible GZD line
      if (labelWestOfRightGZD < this.gridInterval && labelWestOfRightGZD > this.gridInterval / 5) {
        labelGrids = UTMtoLL({
          northing: northingLabel + this.gridInterval / 2,
          easting: eastingLabel + (labelWestOfRightGZD / 2),
          zoneNumber: zoneNumberLabel,
          zoneLetter: zoneLetterLabel,
        });
        const labelGridsUTM = LLtoUTM(labelGrids);
        if (labelGrids.lon < this.data[0].right && labelGrids.lon > this.data[0].left) {
          const grid100kLabel = new L.Marker(labelGrids, {
            interactive: false,
            icon: new L.DivIcon({
              className: 'leaflet-grid-label',
              iconAnchor: new L.Point(10, 10),
              html: `<div class="grid-label-100k">${get100kID(labelGridsUTM.easting, labelGridsUTM.northing, labelGridsUTM.zoneNumber)}</div>`,
            }),
          });
          if (this._map.getBounds().pad(0.1).contains(labelGrids)) {
            this.addLayer(grid100kLabel);
          }
        }
      }
      // These are the labels that are right next to the RIGHT of the visible GZD line
      if (labelEastOfRightGZD < this.gridInterval && labelEastOfRightGZD > this.gridInterval / 5) {
        labelGrids = UTMtoLL({
          northing: northingLabel + this.gridInterval / 2,
          easting: eastingLabel - (labelEastOfRightGZD / 2),
          zoneNumber: zoneNumberLabel,
          zoneLetter: zoneLetterLabel,
        });
        const labelGridsUTM = LLtoUTM(labelGrids);
        if (labelGrids.lon < this.data[0].right && labelGrids.lon > this.data[0].left) {
          const grid100kLabel = new L.Marker(labelGrids, {
            interactive: false,
            icon: new L.DivIcon({
              className: 'leaflet-grid-label',
              iconAnchor: new L.Point(10, 10),
              html: `<div class="grid-label-100k">${get100kID(labelGridsUTM.easting, labelGridsUTM.northing, labelGridsUTM.zoneNumber)}</div>`,
            }),
          });
          if (this._map.getBounds().pad(0.1).contains(labelGrids)) {
            this.addLayer(grid100kLabel);
          }
        }
      }

      // These are the labels that are in between of the visible GZD lines
      labelGrids = UTMtoLL({
        northing: northingLabel + this.gridInterval / 2,
        easting: eastingLabel + this.gridInterval / 2,
        zoneNumber: zoneNumberLabel,
        zoneLetter: zoneLetterLabel,
      });
      const labelGridsUTM = LLtoUTM(labelGrids);

      // This is idiotic but I am going to keep it for now. 4 if statements is embarrassing ffs
      // Basically this finds all grids that are more than 50K meters from the right and left of the visible GZD lines
      if (new L.latLng(labelGrids).distanceTo({ lat: labelGrids.lat, lng: this.data[0].right }) > this.gridInterval / 2) {
        if (new L.latLng(labelGrids).distanceTo({ lat: labelGrids.lat, lng: this.data[0].left }) > this.gridInterval / 2) {
          if (labelGrids.lon < this.data[0].right && labelGrids.lon > this.data[0].left) {
          // This removes any "weird" eastings that are not divisible by 10. So for instance the easting "637851" would not pass this test
          // This also prevents labels overlapping
            if ((Math.round(labelGridsUTM.easting / 10) * 10) % this.gridInterval === this.gridInterval / 2) {
              const grid100kLabel = new L.Marker(labelGrids, {
                interactive: false,
                icon: new L.DivIcon({
                  className: 'leaflet-grid-label',
                  iconAnchor: new L.Point(10, 10),
                  html: `<div class="grid-label-100k">${get100kID(labelGridsUTM.easting, labelGridsUTM.northing, labelGridsUTM.zoneNumber)}</div>`,
                }),
              });
              // Only add grid labels that the user can see
              if (this._map.getBounds().pad(0.1).contains(labelGrids)) {
                this.addLayer(grid100kLabel);
              }
            }
          }
        }
      }
    }
  },

  getPaddingOnZoomLevel(map) {
    this._map = map;
    const northBuffer = this._map.getBounds().getNorth() >= 50 ? 2 : 0;
    const southBuffer = this._map.getBounds().getNorth() <= 0 ? 0.04 : 0;
    const zoom = this._map.getZoom();

    if (zoom >= this.options.maxZoom) {
      return 480;
    }

    switch (zoom) {
      case 17:
        return 240;
      case 16:
        return 120;
      case 15:
        return 60;
      case 14:
        return 30;
      case 13:
        return 15;
      case 12:
        return 7;
      case 11:
        return 4;
      case 10:
        return 1.5 + northBuffer + southBuffer;
      case 9:
        return 0.7 + northBuffer + southBuffer;
      case 8:
        return 0.3 + northBuffer + southBuffer;
      case 7:
        return 0.13 + northBuffer + southBuffer;
      case 6:
        // return 0.02 + northBuffer + southBuffer;
        return 1;
      default:
        break;
    }
    return this;
  },
});


// *********************************************************************************** //
// * Leaflet.DumbMGRS - 1000 Meter Grids                                             * //
// *********************************************************************************** //
// TODO: Rename this.empty to something descriptive.
// TODO: This plugin will get messed up on the southern hemisphere
const MGRS1000Meters = L.LayerGroup.extend({
  options: {
    showLabels: false,
    showGrids: false,
    redraw: 'move',
    maxZoom: 18,
    minZoom: 12,
    gridLetterStyle: 'color: black; font-size:12px;',
    lineStyle: {
      color: 'black',
      weight: 1,
      opacity: 0.5,
      interactive: false,
      clickable: false, // legacy support
      fill: false,
      noClip: true,
      smoothFactor: 4,
      lineCap: 'butt',
      lineJoin: 'miter-clip',
    },
  },

  initialize(options) {
    // Set class options (no need for user to edit this)
    this.gridInterval = 1000;
    this.splitGZD = false;
    this.direction = undefined;
    // Call the parent's constructor from the child (like using super()) by accessing the parent class prototype
    L.LayerGroup.prototype.initialize.call(this);
    // Merge the provided options with the default options of the class.
    L.Util.setOptions(this, options);
  },

  onAdd(map) {
    this._map = map;
    const grids1000Meters = this.regenerate();
    this._map.on(`viewreset ${this.options.redraw} moveend`, grids1000Meters.regenerate, grids1000Meters);
  },

  onRemove(map) {
    this._map = map;
    this._map.off(`viewreset ${this.options.redraw}`, this._map);
		this.eachLayer(this.removeLayer, this);
  },

  hideGrids() {
    this.options.showGrids = false;
    this.regenerate();
  },

  hideLabels() {
    this.options.showLabels = false;
    this.regenerate();
  },

  showGrids() {
    this.options.showGrids = true;
    this.regenerate();
  },

  showLabels() {
    this.options.showLabels = true;
    this.regenerate();
  },

  regenerate() {
    this.clearLayers();
    const currentZoom = this._map?.getZoom();

    if ((currentZoom >= this.options.minZoom) && (currentZoom <= this.options.maxZoom)) {
      this._bounds = this._map.getBounds().pad(this.getPaddingOnZoomLevel1000Meters());
      this.clearLayers();
      this.empty = [];

      if (currentZoom >= this.options.minZoom && currentZoom <= this.options.maxZoom) {
        // Call the GZD class and get the visible grid zone designators on the map
        //! This is dependent on you class constructor variable name. Not smart
        generateGZDGrids.viz.forEach((visibleGrid) => {
          // This will tell us what grid squares are visible on the map
          this.empty.push(visibleGrid);
        });

        if (this.empty.length <= 1) {
          // If there is no other GZD visible on the map, then just run it
          this.generateGrids(this.splitGZD = false);
        } else {
          // Since we are only checking if the split grid is a easting line (vertical), this will also check if the splitGZD is a northing line (horizontal)
          //! Issues with this on special grid zones (Norway and Svalbard)
          switch (this.empty.length) {
            case 4:
              // If there are 4 GZDs visible on screen, run both directions
              this.generateGrids(this.splitGZD = true, this.direction = 'left');
              this.generateGrids(this.splitGZD = true, this.direction = 'right');
              break;
            case 3:
              break;
            case 2:
              if (this.empty[0].right === this.empty[1].left) {
                // If the GZDs are splitting the screen vertically, run both directions
                this.generateGrids(this.splitGZD = true, this.direction = 'left');
                this.generateGrids(this.splitGZD = true, this.direction = 'right');
              } else {
                // If the GZDs are splitting the screen horizontally, run one direction
                this.generateGrids(this.splitGZD = false);
              }
              break;
            case 1:
              break;
            case 0:
              break;
            default:
              break;
          }
        }
      }
    }
    return this;
  },
  // Gets the minimum easting and northing of each 1000 meter grid line
  getMinimumBounds() {
    let nw;
    let west;
    switch (this.direction) {
      case undefined: {
        // Prevents the grids from "shifting" when the bounds are near a western GZD
        west = this.empty[0].left < this._bounds.getWest() ? this._bounds.getWest() : this.empty[0].left + 0.00001;
        nw = LLtoUTM({ lat: this._bounds.getNorth(), lon: west });
        break;
      }
      case 'left': {
        west = this.empty[0].left < this._bounds.getWest() ? this._bounds.getWest() : this.empty[0].left + 0.00001;
        nw = LLtoUTM({ lat: this._bounds.getNorth(), lon: west });
        break;
      }
      case 'right': {
        nw = LLtoUTM({ lat: this._bounds.getNorth(), lon: this.empty[1].left + 0.00001 });
        break;
      }
      default: {
        break;
      }
    }

    return {
      // rounds up to nearest multiple of x
      easting: Math.floor(nw.easting / this.gridInterval) * this.gridInterval,
      northing: Math.floor(nw.northing / this.gridInterval) * this.gridInterval,
      zoneNumber: nw.zoneNumber,
      zoneLetter: nw.zoneLetter,
    };
  },

  // Gets the number of easting and northing lines we need to draw on the map
  getLineCounts() {
    let east;
    let west;
    switch (this.direction) {
      case undefined: {
        // This will fix a bug where the GZD boundary is barely out of view
        // it adjusts the value so it grabs the furthest east/west boundary without going outside of the GZD
        east = this.empty[0].right > this._bounds.getEast() ? this._bounds.getEast() : this.empty[0].right - 0.00001;
        west = this.empty[0].left < this._bounds.getWest() ? this._bounds.getWest() : this.empty[0].left + 0.00001;
        break;
      }
      case 'left': {
        east = this.empty[0].right - 0.00001;
        west = this._bounds.getWest();
        break;
      }
      case 'right': {
        east = this._bounds.getEast();
        west = this.empty[1].left + 0.00001;
        break;
      }
      default: {
        break;
      }
    }

    const nw = LLtoUTM({ lat: this._bounds.getNorth(), lon: west });
    const ne = LLtoUTM({ lat: this._bounds.getNorth(), lon: east });
    const sw = LLtoUTM({ lat: this._bounds.getSouth(), lon: west });
    return {
      easting: Math.ceil((ne.easting - nw.easting) / this.gridInterval),
      northing: Math.ceil((nw.northing - sw.northing) / this.gridInterval),
    };
  },

  // Where the magic happens
  generateGrids(splitGZD = false, direction = undefined) {
    this.splitGZD = splitGZD;
    this.direction = direction;

    // Do not run this function if the grids hidden open is enabled
    if (!this.options.showGrids) {
      return;
    }

    const minimumBounds = this.getMinimumBounds();
    const gridCounts = this.getLineCounts();
    const gridLines = [];
    const gridLabels = [];

    //* * Easting Lines **//
    // Adding +1 on gridCounts.easting to fix error with connecting grid lines not showing up
    for (let i = 0; i <= gridCounts.easting + 1; i += 1) {
      const adjustedEasting = minimumBounds.easting + (this.gridInterval * i);
      const { northing } = minimumBounds;

      const northLine = UTMtoLL({
        northing,
        easting: adjustedEasting,
        zoneNumber: minimumBounds.zoneNumber,
        zoneLetter: minimumBounds.zoneLetter,
      });

      const southLine = UTMtoLL({
        northing: northing - (gridCounts.northing * this.gridInterval),
        easting: adjustedEasting,
        zoneNumber: minimumBounds.zoneNumber,
        zoneLetter: minimumBounds.zoneLetter,
      });

      const labelCoords = UTMtoLL({
        northing: LLtoUTM({ lat: this._map.getBounds().getSouth(), lon: southLine.lon }).northing,
        easting: adjustedEasting,
        zoneNumber: minimumBounds.zoneNumber,
        zoneLetter: minimumBounds.zoneLetter,
      });

      const eastingLine = new L.Polyline([southLine, northLine], this.options.lineStyle);

      // Slope is some funky math I copied from https://github.com/trailbehind/leaflet-grids
      // Used for any grid line that converges to the GZD boundaries
      const slope = (southLine.lat - northLine.lat) / (southLine.lon - northLine.lon);

      // This will ensure that the northing lines do not go past their GZD boundaries
      switch (this.direction) {
        case undefined:
          if (this.options.showLabels) {
            gridLabels.push(this.generateEastingLabel(labelCoords, adjustedEasting.toString().slice(1, -3)));
          }
          break;
        case 'left':
          if (northLine.lon >= this.empty[0].right) {
            const newLatLeft = southLine.lat + (slope * (this.empty[0].right - southLine.lon));
            eastingLine.setLatLngs([southLine, { lat: newLatLeft || southLine.lat, lng: this.empty[0].right - 0.00001 }]);
          }
          if (labelCoords.lon <= this.empty[0].right && this.options.showLabels) {
            gridLabels.push(this.generateEastingLabel(labelCoords, adjustedEasting.toString().slice(1, -3)));
          }
          break;
        case 'right':
          if (northLine.lon <= this.empty[1].left) {
            const newLatRight = southLine.lat + (slope * (this.empty[1].left - southLine.lon));
            eastingLine.setLatLngs([southLine, { lat: newLatRight, lng: this.empty[1].left + 0.00001 }]);
          }
          if (labelCoords.lon >= this.empty[1].left && this.options.showLabels) {
            gridLabels.push(this.generateEastingLabel(labelCoords, adjustedEasting.toString().slice(1, -3)));
          }
          break;
        default:
          break;
      }
      gridLines.push(eastingLine);
    }

    //* * Northing Lines **//
    for (let i = 0; i <= gridCounts.northing; i += 1) {
      const { easting } = minimumBounds;
      const adjustedNorthing = minimumBounds.northing - (this.gridInterval * i);

      let endEastingLineForNorthings;
      let beginEastingLineForNorthings;
      // If we need to get the northern bounds and we are in the southern hemisphere, grab the north, else grab the south
      const northernHemisphereBounds = this._map.getCenter().lat <= 0 ? this._bounds.getNorth() : this._bounds.getSouth();

      switch (this.direction) {
        case undefined: {
          beginEastingLineForNorthings = easting;
          endEastingLineForNorthings = easting + (gridCounts.easting * this.gridInterval);
          break;
        }
        case 'left': {
          beginEastingLineForNorthings = easting;
          endEastingLineForNorthings = LLtoUTM({ lat: northernHemisphereBounds, lon: this.empty[0].right - 0.00001 }).easting;
          break;
        }
        case 'right': {
          beginEastingLineForNorthings = LLtoUTM({ lat: northernHemisphereBounds, lon: this.empty[1].left + 0.00001 }).easting;
          endEastingLineForNorthings = easting + (gridCounts.easting * this.gridInterval);
          break;
        }
        default: {
          break;
        }
      }

      const westLine = UTMtoLL({
        northing: adjustedNorthing,
        easting: beginEastingLineForNorthings,
        zoneNumber: minimumBounds.zoneNumber,
        zoneLetter: minimumBounds.zoneLetter,
      });

      const eastLine = UTMtoLL({
        northing: adjustedNorthing,
        easting: endEastingLineForNorthings,
        zoneNumber: minimumBounds.zoneNumber,
        zoneLetter: minimumBounds.zoneLetter,
      });

      // These coordinates are the absolute western edge of the visible map
      const labelCoords = UTMtoLL({
        northing: adjustedNorthing,
        easting: LLtoUTM({ lat: westLine.lat, lon: this._map.getBounds().getWest() }).easting,
        zoneNumber: minimumBounds.zoneNumber,
        zoneLetter: minimumBounds.zoneLetter,
      });

      const northingLine = new L.Polyline([westLine, eastLine], this.options.lineStyle);

      // This will ensure that the northing lines do not go past their GZD boundaries
      switch (this.direction) {
        case undefined:
        // Putting the grid label options in the switch statement prevents them from duplicating if split GZDs are on screen
          if (this.options.showLabels) {
          // If adjustedNorthing is 4871000, then slice the first 2 chars off and then remove the last 3 to get "71" as your label
            gridLabels.push(this.generateNorthingLabel(labelCoords, adjustedNorthing.toString().slice(2, -3)));
          }
          break;
        case 'left':
          northingLine.setLatLngs([westLine, { lat: eastLine.lat, lng: this.empty[0].right - 0.00001 }]);
          if (this.options.showLabels) {
            gridLabels.push(this.generateNorthingLabel(labelCoords, adjustedNorthing.toString().slice(2, -3)));
          }
          break;
        case 'right':
          northingLine.setLatLngs([eastLine, { lat: westLine.lat, lng: this.empty[1].left }]);
          break;
        default:
          break;
      }

      gridLines.push(northingLine);
    }

    gridLines.forEach(this.addLayer, this);
    gridLabels.forEach(this.addLayer, this);
  },

  generateEastingLabel(pos, label) {
    const bounds = this._map.getBounds().pad(-0.001);
    return new L.Marker({ lat: bounds.getSouth(), lng: pos.lon }, {
      interactive: false,
      icon: new L.DivIcon({
        iconAnchor: [11, 22],
        className: 'leaflet-grid-label',
        html: `<div class="grid-label-1000m" style="${this.options.gridLetterStyle}">${label}</div>`,
      }),
    });
  },

  generateNorthingLabel(pos, label) {
    const bounds = this._map.getBounds().pad(-0.001);
    return new L.Marker({ lat: pos.lat, lng: bounds.getWest() }, {
      interactive: false,
      icon: new L.DivIcon({
        iconAnchor: [0, 8],
        className: 'leaflet-grid-label',
        html: `<div class="grid-label-1000m" style="${this.options.gridLetterStyle}">${label}</div>`,
      }),
    });
  },

  getPaddingOnZoomLevel1000Meters() {
    const zoom = this._map.getZoom();
    if (zoom >= this.options.maxZoom) {
      return 4;
    }
    switch (zoom) {
      case 17:
        return 1.5;
      case 16:
        return 0.75;
      case 15:
        return 0.4;
      case 14:
        return 0.18;
      case 13:
        return 0.1;
      case 12:
        return 0.04;
      default:
        break;
    }
    return this;
  },
});


// *********************************************************************************** //
// * Leaflet.DumbMGRS - Class Constructors                                           * //
// *********************************************************************************** //
// Enable the creation of the plugin to be chained with other function calls
// Grid Zone Designator (1 million by 1 million meters)
const generateGZDGrids = new GZD({
  // Example of initial options for GZD grids
  showLabels: true,
  showGrids: true,
  maxZoom: 18,
  minZoom: 4,
  redraw: 'moveend',
  lineStyle: {
    color: 'orange',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1,
    lineCap: 'butt',
    lineJoin: 'miter-clip',
    noClip: true,
    interactive: false,
  },
});

// 100K Meter Grids
const generate100kGrids = new MGRS100K({
  // Example of initial options for 100K grids
  showLabels: true,
  showGrids: true,
  maxZoom: 18,
  minZoom: 7,
  redraw: 'moveend',
  gridLetterStyle: 'color: #216fff; font-size:12px;',
  lineStyle: {
    color: 'black',
    weight: 1,
    opacity: 0.5,
    interactive: false,
    fill: false,
    noClip: true,
    smoothFactor: 4,
    lineCap: 'butt',
    lineJoin: 'miter-clip',
  },
});

// 1000 Meter Grids
const generate1000meterGrids = new MGRS1000Meters({
  // Example of initial options for 1000 meter grids
  showLabels: true,
  showGrids: true,
  redraw: 'move',
  maxZoom: 18,
  minZoom: 12,
  gridLetterStyle: 'color: black; font-size:12px;',
  lineStyle: {
    color: 'black',
    weight: 1,
    opacity: 0.5,
    interactive: false,
    fill: false,
    noClip: true,
    smoothFactor: 4,
    lineCap: 'butt',
    lineJoin: 'miter-clip',
  },
});

// Export Leaflet, the map, GZD grids, 100K grids, 1000M grids
// LLtoUTM/UTMtoMGRS is solely used for the example info boxes
export {
  L, generateGZDGrids, generate100kGrids, generate1000meterGrids, LLtoUTM, UTMtoMGRS,
};
