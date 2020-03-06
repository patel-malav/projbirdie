import { GraphQLString, GraphQLObjectType } from "graphql";

export const BirdNameType =  new GraphQLObjectType({
    name: 'Name',
    fields: {
        common: {type: GraphQLString},
        sci: {type: GraphQLString}
    }
});