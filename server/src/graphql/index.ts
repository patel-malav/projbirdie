import { ApolloServer, gql } from "apollo-server-express";
import { countries } from "./country";

const typeDefs = gql`
  type Coordinate {
    lat: Float!
    lng: Float!
    alti: Float
  }
  type Country {
    name: String!
    cid: ID!
    model: String
    centroid: Coordinate
    level: Int
    displaySize: Int
    zoomLevel: Int
  }
  type Query {
    hello: String!
    countries(ids: [String]): [Country]!
  }
`;

let resolvers = [
  {
    Country: {
      level: () => Math.floor(Math.random() * 10),
      displaySize: () => 10,
      zoomLevel: () => 1
    }
  },
  {
    Query: {
      hello: () =>
        new Promise((res) => setTimeout(res, 4000, `Hello From Server 👨🏼‍💻`)),
      countries,
    },
  },
];

export class ApolloGraphQLServer extends ApolloServer {
  constructor() {
    super({ typeDefs, resolvers });
  }
}
