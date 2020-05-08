// let api = `https://api.inaturalist.org/v1/observations?verifiable=true&place_id=6681&iconic_taxa=Aves`;
import axios from 'axios';
import chalk from 'chalk';
import { Country } from './country.model';

export async function getObsCount(id: number) {
  const api = `https://api.inaturalist.org/v1/observations?place_id=${id}&iconic_taxa=Aves`;
  try {
    let data = await axios.get(api).then((resp) => resp.data);
    console.log(
      chalk`Resolved => {green ${id}} with {yellow : ${data.total_results}}`
    );
    return data.total_results;
  } catch (err) {
    throw chalk`Problem with : {red ${id}}`;
  }
}

export async function updateObsCount(id: number, count: number) {
  return Country.updateOne(
    { 'inat.place_id': id },
    { $set: { 'inat.obs_count': count } }
  ).exec();
}

export const totalObervation = Country.find({}, { 'inat.place_id': 1, _id: 0 })
  .exec()
  .then((data) => data.map((v) => v.toObject().inat.place_id))
  .then(async (ids) => {
    for (let id of ids) {
      try {
        let count = await getObsCount(id);
        let test = await updateObsCount(id, count);
        console.log(chalk`{green ${id}} : {red ${test}}`);
      } catch (err) {
        console.error(chalk.redBright('Problem in this --->', id));
      }
    }
  })
  .catch((err) => console.error(err));
