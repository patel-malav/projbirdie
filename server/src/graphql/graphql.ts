import { ApolloServer, gql } from 'apollo-server-express';
import { CountryType, CountriesQuery, CountryResolver } from './country';
import { DocumentNode } from 'graphql';

const typeDefs: DocumentNode[] = [
  gql`
    type Query {
      hello: String!
      countries(ids: [String]): [Country]!
    }
  `,
  CountryType,
];

const resolvers = [
  {
    Country: CountryResolver,
  },
  {
    Query: {
      hello: () =>
        new Promise((res) => setTimeout(res, 4000, `Delayed Message`)),
      countries: CountriesQuery,
    },
  },
];

export class ApolloGraphQLServer extends ApolloServer {
  constructor() {
    super({ typeDefs, resolvers });
  }
}