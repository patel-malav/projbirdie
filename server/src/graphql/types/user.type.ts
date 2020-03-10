import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    }
});

export default UserType;