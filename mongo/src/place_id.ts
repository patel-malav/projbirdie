import { Country } from './country.model';
import { readFile } from 'fs';
import { join } from 'path';

let file = new Promise<any[]>((res, rej) => {
  readFile(
    join(__dirname, './output.json'),
    { encoding: 'utf-8' },
    (err, data) => {
      if (err) rej(err);
      else res(JSON.parse(data));
    }
  );
});

export const place_id = file
  .then((data) => {
    let queries = [];
    for (let country of data) {
      let objName = Object.keys(country)[0];
      if (country[Object.keys(country)[0]].length) {
        let obj = country[Object.keys(country)[0]][0];
        // console.log(`${objName} has id ${obj.id}`);
        let q = Country.updateOne(
          { name: objName },
          { inat: { place_id: obj.id } }
        );
        queries.push(q);
      } else {
        let q = Country.updateOne(
          { name: objName },
          { inat: { place_id: -1 } }
        );
        queries.push(q);
      }
    }
    return queries;
  })
  .then((promises) => Promise.all(promises));
