import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInterfaceType } from "graphql";
import { BirdNameType } from "./name.object";

export const BirdType = new GraphQLObjectType(
    {
        name: 'Bird',
        fields: {
            id: {type: GraphQLID},
            name: {type: BirdNameType}
        }
    }
);