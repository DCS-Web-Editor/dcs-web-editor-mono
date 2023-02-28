
local magvar = require('magvar')

local month = env.mission.date.Month
local year = env.mission.date.Year
magvar.init(month,year)


--[[
DCS World Airbase & Parking export script.

For Mission and GUI environments

This code is under MIT licence, you can find the complete file at https://opensource.org/licenses/MIT
]]--
local features = {}

local categories = { "AIRDROME", "HELIPAD", "SHIP" }

function addAirbase (airbase)
    local feature = {}
    
    -- Build up Coordinates
    point = Airbase.getPoint(airbase)
    lat, lon, alt = coord.LOtoLL(point)

    feature.coordinates = {}
    feature.coordinates[1] = lon
    feature.coordinates[2] = lat
    feature.coordinates[3] = alt


    desc = Airbase.getDesc(airbase)
    --Build up Properties
    feature.properties = {}
    feature.properties.wordId = Airbase.getWorldID(airbase)
    feature.properties.callsign = Airbase.getCallsign(airbase)
    feature.properties.id = Airbase.getID(airbase)
    feature.properties.category = Airbase.getCategory(airbase)
    feature.properties.t = Airbase.getTypeName(airbase)
    feature.properties.name = desc.displayName
    feature.properties.type = categories[desc.category + 1]
    feature.properties.point = point

    local decl = magvar.get_mag_decl(lat, lon)
    feature.properties.declination = math.deg(decl)


    -- add Runways
    feature.runways = {}
    for r, runway in pairs(Airbase.getRunways(airbase)) do
        addRunway(airbase, runway, feature.runways)
    end

    -- add Parking
    feature.parkings = {}
    for _, parking in pairs(Airbase.getParking(airbase)) do
        addParking(airbase, parking, feature.parkings)
    end

    --Add Feature to Collection
    table.insert(features, feature)
end

function addParking (airbase, parking, p)
    local feature = {}

    -- Build up Coordinates
    lat, lon, alt = coord.LOtoLL(parking.vTerminalPos)

    feature.coordinates = {}
    feature.coordinates[1] = lon
    feature.coordinates[2] = lat
    feature.coordinates[3] = alt

    -- build up Properties
    feature.Term_Index = parking.Term_Index
    feature.Term_Index_0 = parking.Term_Index_0
    feature.Term_Type = parking.Term_Type
    feature.point = parking.vTerminalPos

    --Add Feature to Collection
    table.insert(p, feature)
end

function addRunway (airbase, runway, r)
    local feature = {}

    -- Build up Geometry
    lat, lon, alt = coord.LOtoLL(runway.position)
    feature.coordinates = {}
    feature.coordinates[1] = lon
    feature.coordinates[2] = lat
    feature.coordinates[3] = alt

    -- build up Properties
    feature.name = runway.Name
    feature.course = runway.course
    feature.width = runway.width
    feature.length = runway.length

    local decl = magvar.get_mag_decl(lat, lon)
    feature.trueCourse = runway.course - decl

    table.insert(r, feature)
end

-- Mission
if world then
    for _, airbase in pairs(world.getAirbases()) do
        addAirbase(airbase)
    end
    return {
        fiddleAdvanced = true,
        file = 'airbase_mission_' .. env.mission.theatre,
        data = features
    }

-- GUI
else
    return {
        fiddleAdvanced = true,
        file = 'airbase_gui_' .. _current_mission.mission.theatre,
        data = terrain.GetTerrainConfig("Airdromes")
    } 
end
