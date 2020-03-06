import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export const ImageType = new GraphQLObjectType({
    name: 'Image',
    fields: {
        id: {type: GraphQLID},
        url: {type: GraphQLString}
    }
});