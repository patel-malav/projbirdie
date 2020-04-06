import { GraphQLObjectType, GraphQLString } from "graphql";

const NameType = new GraphQLObjectType({
    name: 'Name',
    fields: {
        common: {type: GraphQLString},
        sci: {type: GraphQLString}
    }
});

export default NameType;