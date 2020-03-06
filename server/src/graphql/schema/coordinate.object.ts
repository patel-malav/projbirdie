import { GraphQLFloat, GraphQLObjectType } from "graphql";

export const CoordinateType =  new GraphQLObjectType({
    name: 'Coordiante',
    fields: {
        lat: {type: GraphQLFloat},
        long: {type: GraphQLFloat}
    }
})