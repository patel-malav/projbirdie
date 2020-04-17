import env from 'dotenv';
import express, { Request, Response } from 'express';
import { join } from 'path';
import { connect } from 'mongoose';
import { ApolloGraphQLServer } from './graphql/graphql';

env.config();

connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected To DataBase');
  })
  .catch((err) => {
    console.error('Failed Connecting to DataBase', err);
  });

const graphql = new ApolloGraphQLServer();

const app = express();

graphql.applyMiddleware({ app, cors: true });

app.use('/', express.static(join(__dirname, process.env.PUBLIC)));

app.get('*', (req: Request, res: Response) => {
  res.sendFile('/', { root: join(__dirname, process.env.PUBLIC) });
});

app.listen(process.env.PORT, () =>
  console.log(`🧞 Server Started @http://localhost:${process.env.PORT}`)
);
