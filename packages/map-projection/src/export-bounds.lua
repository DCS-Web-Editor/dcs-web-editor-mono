local NE_bound = terrain.GetTerrainConfig("NE_bound")
local SW_bound = terrain.GetTerrainConfig("SW_bound")

local nw_lat, nw_lon = terrain.convertMetersToLatLon(NE_bound[1]*1000,SW_bound[3]*1000)
local ne_lat, ne_lon = terrain.convertMetersToLatLon(NE_bound[1]*1000,NE_bound[3]*1000)

local se_lat, se_lon = terrain.convertMetersToLatLon(SW_bound[1]*1000,NE_bound[3]*1000)
local sw_lat, sw_lon = terrain.convertMetersToLatLon(SW_bound[1]*1000,SW_bound[3]*1000)

return {
    fiddleAdvanced = true,
    file = 'bounds_' .. _current_mission.mission.theatre,
    data = {
        nw_lat, nw_lon,
        ne_lat, ne_lon,
        se_lat, se_lon, 
        sw_lat, sw_lon,
    }
}