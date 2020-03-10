import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import ImageType from "../types/image.type";
import NameType from "./name.type";

const TaxanomyType = new GraphQLObjectType({
    name: 'Taxonomy',
    fields: {
        id: {type: GraphQLID},
        name: {type: NameType},
        image: {type: ImageType}
    }
});

export default TaxanomyType;