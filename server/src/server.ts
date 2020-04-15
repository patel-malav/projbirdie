import { join } from "path";

globalThis.port = 5555;
globalThis.public = join(__dirname, "./public");
globalThis.assets = join(__dirname, "./assets");

import express from "express";
import { ApolloGraphQLServer } from "./graphql";

const graphql = new ApolloGraphQLServer();
const app = express();
graphql.applyMiddleware({ app, cors: true });
app.use("/", express.static(globalThis.public));

app.listen(globalThis.port, () =>
  console.log(`🧞 Server Started @http://localhost:${globalThis.port}`)
);
