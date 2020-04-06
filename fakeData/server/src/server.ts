// Node Imports
import path from 'path';

// Package's Imports
import express, { Request, Response } from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';

// User Code Imports
import schema from './graphql/schema';

const _port = 5555; // NGINX Port. # Change to use NODE_ENV
const _public = path.join(__dirname, './public'); // Angular Static Website Folder.
const app = express();

app.use(express.json()); // Parse headers and body to JSON format.

// CORS Middleware
app.use(cors()); // Enable Cross Origin Resource Sharing.

// GraphQL Middleware
app.use('/graphql', graphqlHTTP({
    schema, // GraphQL Schema
    graphiql: true // Interface to test API Endpoint.
}));

// Express Static Middleware
app.use('/', express.static(_public)); //  Serving Angular Static Website Folder to '/' Endpoint.

// app.get('/test', (req, res) => {});

// Sending index.html to any non relative path. # Redirect to Error 404 page
app.get('*', (req: Request, res: Response) => {
    res.sendFile('/', {root: _public});
});

app.listen(_port, () => { console.log(`SERVER STARTED @ http://localhost:${_port}`); });