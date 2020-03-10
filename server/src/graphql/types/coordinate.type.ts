import { GraphQLObjectType, GraphQLString } from "graphql";

const CoordinateType = new GraphQLObjectType({
    name: 'Coordinate',
    fields: {
        lat: {type: GraphQLString},
        long: {type: GraphQLString}
    }
});

export default CoordinateType;