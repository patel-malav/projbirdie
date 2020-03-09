import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import ImageType from "../types/image.type";

const SearchResultType = new GraphQLObjectType({
    name: 'SearchResult',
    fields: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        images: {type: ImageType}
    }
});

export default SearchResultType;