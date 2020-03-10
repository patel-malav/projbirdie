import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import NameType from "./name.type";

const SearchResultType = new GraphQLObjectType({
    name: 'SearchResult',
    fields: {
        taxaId: {type: GraphQLID},
        name: {type: NameType},
        image: {type: GraphQLString}
    }
});

export default SearchResultType;