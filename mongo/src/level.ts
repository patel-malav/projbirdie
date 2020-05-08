// Evaluates to blevel + zeroes * 3
// 0,   100,    250,   500,  100 0, 250 0, 500 0, 100 00, 250 00,    500 00,   100 000, 250 000, 500 000;
// -1, 0+0+0,  0+1+0, 0+2+0, 2+0+1, 2+1+1, 2+2+1, 4+0+2,  4+1+2, 4 + 2 + 2, 6 + 0 + 3,  6 + 1 + 3,      11

import { Country } from './country.model';
import chalk from 'chalk';

// -1,   0,      0,     0,     1,     1,     1,     2,      2,         2,         3,       3,       3
function calcLevel(val: number, clamp: number = 10): number {
  if (!val || val < 100) return -1;
  let zeros = val.toString().length - 3;
  let cval = parseInt(val.toString().substr(0, 3));
  let blevel;
  if (cval < 100) blevel = 0;
  else if (cval < 250) blevel = 1;
  else if (cval < 500) blevel = 2;
  else blevel = 3;
  console.log(
    chalk`{cyan ${val}} : cval - ${cval}, {red ${blevel}} + {blue ${zeros}} = {red ${
      blevel + zeros * 3
    }}`
  );
  let output = blevel + zeros * 3;
  return output < clamp ? output : clamp;
}

export const level = Country.find()
  .select({ 'inat.obs_count': 1 })
  .sort({ 'inat.obs_count': -1 })
  .then((docs) =>
    docs.map((doc) =>
      doc
        .updateOne({
          $set: { level: calcLevel(doc.toObject().inat?.obs_count) },
        })
        .exec()
    )
  )
  .then((promises) => {
    promises.forEach((promise) => promise.then((data) => console.log(data)));
    return Promise.all(promises);
  });
