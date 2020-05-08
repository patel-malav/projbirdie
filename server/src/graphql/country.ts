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
    display_size: Int
    zoom_level: Int
  }
`;

export const CountryResolver = {
  level: (parent: Country) => {
    return parent.level;
  },
};

export async function CountriesQuery(parent: any, { ids }: Args) {
  if (ids) {
    return collection.find({ cid: { $in: ids } }).exec();
  }
  return collection.find().exec();
}
