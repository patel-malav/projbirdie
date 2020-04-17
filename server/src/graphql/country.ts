import { Country } from '../../typings/country';
import { Country as collection } from '../models/country.model';
import { gql } from 'apollo-server-express';

interface Args {
  ids: string[];
}

export const CountryType = gql`
  type Country {
    name: String!
    cid: ID!
    model: String
    # centroid: Coordinate
    level: Int
    displaySize: Int
    zoomLevel: Int
  }
`;

export const CountryResolver = {
  level: () => Math.floor(Math.random() * 10),
};

export async function CountriesQuery(parent: Country, { ids }: Args) {
  if (ids) {
    console.log(ids);
    return collection.find({ cid: { $in: ids } });
  }
  return collection.find();
}
