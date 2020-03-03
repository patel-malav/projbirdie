// Package's Imports
import { buildSchema } from "graphql";

/** 
 * Parse string to get GraphQL Schema.
 *  - type Query is Root Type in GraphQL
 *  - hello - for GraphQL test
 */
const schema = buildSchema(`
    type Messages {
        world: String
        user: String
    }

    type Coordinate {
        lat: Float!
        long: Float!
    }

    type Links {
        wiki: String
    }

    type Bird {
        id: ID!
        name: String!
        image: String
        location: Coordinate
        url: Links
    }

    type Query {
        hello: Messages
        getBird(id: ID): Bird
    }
`);

export default schema;