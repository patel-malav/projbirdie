import { readFile, existsSync } from "fs";
import { join } from "path";

interface Args {
  ids: string[];
}

interface Data {
  centroid: Centroid;
  name:     string;
  cid:      string;
  model:    string;
}

interface Centroid {
  lat:  number;
  lng:  number;
  alti: null;
}

async function countries(parent: any, { ids }: Args) {
  let path = join(globalThis.assets, "/data.json");
  let file: Data[] = await new Promise((res, rej) => {
    readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (err) rej(err);
      else res(JSON.parse(data));
    });
  });
  
  if (ids) {
    file = file.filter((country) => ids.includes(country.cid));
  }
  return file;
}

export { countries };