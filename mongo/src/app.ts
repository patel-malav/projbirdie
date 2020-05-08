import { connect, disconnect } from 'mongoose';
import { Country } from './country.model';
import chalk from 'chalk';

let db = `mongodb://malav:patelmalav@projbirdie.tech:27017/projbirdie`;

connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.error(err);
  else console.log(`Connected to DB!!`);
});

// .finally(() => disconnect());
