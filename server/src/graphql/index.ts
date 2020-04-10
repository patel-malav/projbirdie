import { ApolloServer, gql } from "apollo-server-express";
import { countries } from "./country";

const typeDefs = gql`
  enum PolygonType {
    MULTIPOLYGON
    POLYGON
  }
  type Coordinate {
    lat: Float!
    lng: Float!
    alti: Float
  }
  type Border {
    type: PolygonType!
    polygon: [[Coordinate]]!
  }
  type Country {
    name: String!
    id: String!
    border: Border
  }
  type Query {
    hello: String!
    countries(ids: [String]): [Country]!
  }
`;

let resolvers = [
  {
    Query: {
      hello() {
        return "Hello From ProjBirdie 🐦!!!";
      },
      countries
    },
  },
];

export class ApolloGraphQLServer extends ApolloServer {
  constructor() {
    super({ typeDefs, resolvers });
  }
}
