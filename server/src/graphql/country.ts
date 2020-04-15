import { readFile } from "fs";
import { join } from "path";

interface Args {
  ids: string[];
}

interface Data {
  centroid: Centroid;
  name: string;
  cid: string;
  model: string;
}

interface Centroid {
  lat: number;
  lng: number;
  alti: null;
}

interface DisplayInfo {
  name: string;
  displaySize: number;
  zoomLevel: number;
}

let path = join(globalThis.assets, "/data.json");
let file: Promise<Data[]> = new Promise((res, rej) => {
  readFile(path, { encoding: "utf-8" }, (err, data) => {
    if (err) rej(err);
    else res(JSON.parse(data));
  });
});

let displayInfo = new Promise<DisplayInfo[]>((res, rej) =>
  readFile(
    join(globalThis.assets, "/name display.json"),
    { encoding: "utf-8" },
    (err, data) => {
      if (err) rej(err);
      else res(JSON.parse(data));
    }
  )
);

async function countries(parent: any, { ids }: Args) {
  let output: Data[];
  if (ids) {
    output = (await file).filter((country) => ids.includes(country.cid));
  } else {
    output = await file;
  }
  return output;
}

const Country = {
  level: () => Math.floor(Math.random() * 10),
  displaySize: async (parent: any) => {
    let output = (await displayInfo).find((ele) => parent.name === ele.name)?.displaySize;
    if(!output) {
      console.log(output);
      output = null;
    }
    return output;
  },
  zoomLevel: async (parent: any) => {
    return (await displayInfo).find((ele) => parent.name === ele.name)?.zoomLevel;
  },
};

export { countries, Country };
