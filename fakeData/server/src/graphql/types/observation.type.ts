import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";
import CoordinateType from "./coordinate.type";
import UserType from "./user.type";
import ImageType from "./image.type";

const ObservationType = new GraphQLObjectType({
    name: 'Observation',
    fields: {
        id: {type: GraphQLID},
        user: {type: UserType},
        geo: {type: CoordinateType},
        images: {type: new GraphQLList(ImageType)}
    }
});
export default ObservationType;