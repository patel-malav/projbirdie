import { ApolloServer, gql } from "apollo-server-express";
import { countries, Country } from "./country";

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
    Country: Country
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
