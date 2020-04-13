import { readFile, existsSync } from "fs";
import { join } from "path";
import { CountriesCapital } from "../../typings/countries_capital";

interface Args {
  ids: string[];
}

async function countries(parent: any, { ids }: Args) {
  let path = join(globalThis.assets, "/country_centroids_az8.json");
  console.log(`🧞 🔮 📃 ${path}`);
  let file: CountriesCapital = await new Promise((res, rej) => {
    readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (err) rej(err);
      else res(JSON.parse(data));
    });
  });
  if (ids) {
    let countries = file.features.map((feature) => feature.properties.admin);
    console.log(`📮 => ${ids.join(" ")}`);
    return [{ name: "Malav", id: "Mal", model: "/Person/Malav" }];
  }
  console.log("📮 => All Countries");
  // get all countries
  let output = file.features.map(({ properties: { admin, adm0_a3 } }) => {
    let model = "Countries/" + admin + '.obj';
    if (!existsSync(join(__dirname, "../public/assets", model))) {
      // console.log(admin); // List out Missing Countries
      model = null;
    }
    return { name: admin, cid: adm0_a3, model };
  });
  return output;
}

export { countries };