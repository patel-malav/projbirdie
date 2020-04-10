import { readFile } from "fs";
import { join } from "path";
import { Geojson, Feature } from "../../typings/geojson";

interface Args {
  ids: string[];
}

async function countries(parent: any, args: Args) {
  let geojson: Geojson = await new Promise((res) => {
    let path = join(globalThis.assets, "countries.json");
    readFile(path, { encoding: "utf-8" }, (err, data) => res(JSON.parse(data)));
  });

  let filtered: Feature[];
  if (args.ids?.length && !args.ids.includes("WORLD") ) {
    filtered = geojson.features.filter((feature) =>
      args.ids.includes(feature.id)
    );
  } else {
    filtered = geojson.features;
  }

  let output = filtered.map(
    ({
      id,
      properties: { name },
      geometry: { type: geoType, coordinates },
    }) => {
      let type = geoType.toUpperCase();
      let polygon: any[];
      if (type === "POLYGON") {
        polygon = [coordinates];
      } else {
        polygon = coordinates;
      }
      polygon = polygon.map((subpoly: any[]) =>
        subpoly[0].map((coord: any[]) => {
          return { lng: coord[0], lat: coord[1] };
        })
      );
      return { id, name, border: { type, polygon } };
    }
  );

  return output;
}

export { countries };
