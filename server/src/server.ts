import path from "path";
import express from "express";

/**
 * Port to start server.
 */
const $_port: number = 5555;
/**
 * Folder to serve static content.
 */
const $_public = path.join(__dirname, "./public");
const app = express();

app.use(express.json());

// app.use("/graphql");

app.use("/", express.static($_public));

app.listen($_port, () =>
  console.log(`Server Started @http://localhost:${$_port}`)
);
