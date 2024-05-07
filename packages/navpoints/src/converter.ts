import { LLToMiz, activeMap, mapNames } from "../../map-projection";
import { js2Lua } from "../../utils";

const btn = document.getElementById("execute")!;
const geoInput = (<HTMLInputElement>document.getElementById("geojson"))!;
const mapSelect = (<HTMLInputElement>document.getElementById("mapselect"))!;
const output = (<HTMLInputElement>document.getElementById("output"))!;
const outputlua = (<HTMLInputElement>document.getElementById("outputlua"))!;
const start = (<HTMLInputElement>document.getElementById("start"))!;

mapNames.forEach((name) => {
  const o = document.createElement("option");
  o.label = name;
  o.value = name;
  mapSelect.append(o);
});

btn?.addEventListener("click", onClick);

function onClick() {
  const mapName = mapSelect.value;
  activeMap(mapName);

  const geoJson = JSON.parse(geoInput.value);
  console.log("geoJson", geoJson);

  const json: any[] = [];
  const startIndex = parseInt(start.value) || 0;

  geoJson.features.forEach((feature: any, i: number) => {
    const coords = feature.geometry.coordinates;

    const lon = coords[0];
    const lat = coords[1];
    const miz = LLToMiz(lon, lat);

    json.push({
      x: miz[0],
      y: miz[1],
      id: startIndex + i,
      callsignStr: feature.properties.Name,
      comment: feature.properties.description,
      type: "Default",
      properties: {
        angle: 0,
        scale: 0,
        steer: 2,
        vangle: 0,
        vnav: 1,
      },
    });
  });

  console.log("json", json);

  output.value = JSON.stringify(json, null, 2);

  const lua = js2Lua(json);
  outputlua.value = lua;

  console.log(lua);
}
