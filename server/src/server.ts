import path from "path";
import express from "express";
import { ApolloGraphQLServer } from "./graphql";

globalThis.port = 5555;
globalThis.public = path.join(__dirname, "./public");
globalThis.assets = path.join(__dirname, "./assets");

const graphql = new ApolloGraphQLServer();
const app = express();
graphql.applyMiddleware({ app, cors: true });
app.use("/", express.static(globalThis.public));

app.listen(globalThis.port, () =>
  console.log(`🧞 Server Started @http://localhost:${globalThis.port}`)
);