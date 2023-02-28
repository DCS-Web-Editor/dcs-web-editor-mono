export function toRad(deg = 0) {
    return (deg * (Math.PI / 180))    
}

export function enhanceProperties(airports, airport, theatre) {
    airport.runways?.forEach && airport.runways.forEach(r => {
        const hasTrueNorth = DECLINATION[theatre]
        if (typeof declination === undefined) console.log('Declination not found for', theatre);
        if (!hasTrueNorth) r.trueCourse = r.course - toRad(airport.properties.declination);
    });

    const found = airports.find(a => a?.display_name === airport.properties.name);
    if (found) {
        airport.properties.code = found.code;
        airport.properties.class = found.class;
        airport.properties.civilian = found.civilian;
        airport.properties.runwayName = found.runwayName;
        airport.default_camera_position = found.default_camera_position;
    }
}

const DECLINATION = {
    Nevada: true,
    // Marianas have TN rwy courses
    MarianaIslands: true,
    Normandy: true,
    Caucasus: false,
    Syria: true,
    PersianGulf: true,
    TheChannel: true,
    Falklands: true,
}