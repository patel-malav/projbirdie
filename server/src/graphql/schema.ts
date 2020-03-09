import axios, { AxiosResponse } from 'axios';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { TaxaSearch } from './typings';
import { BirdType } from "./schema/bird.object";
import { ObservationType } from "./schema/observation.object";
import SearchResultType from './types/search-result';

/**
 * Hello Message
 */
const hello = {
    type: GraphQLString,
    resolve: () => 'Hi from projbirdie server'
}

/**
 * search query
 */
const search = {
    type: new GraphQLList(SearchResultType),
    args: {
        term: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async (parent: any, { term }) => {
        let resp: AxiosResponse<TaxaSearch>;
        try {
            resp = await axios.get(`https://api.inaturalist.org/v1/taxa/autocomplete?q=${term}`);
        } catch(err) {
            console.log(err);
            return null;
        }

        let output = [];
        for(let result of resp.data.results) {
            let {id, name, default_photo: {id: photo_id}} = result;
            output.push({id, name, images: {id: photo_id}});
        }
        return output;
    }
}

const observations = {

}

const taxa = {

}

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        hello,
        search,

        // observation: {
        //     type: ObservationType,
        //     args: {
        //         id: {type: GraphQLID}
        //     },
        //     resolve: async (parent, args, ctx) => {
        //         let resp: any;
        //         try {
        //             console.log(args.id);
        //             // let url = `https://api.inaturalist.org/v1/observations/${args.id}`;
        //             // console.log(`Requesting - ${url}`);
        //             // resp = await axios(url);
        //             // ctx.data = resp.data;
        //             return null;
        //         } catch(err) {
        //             console.log(err);
        //             return null;
        //         }
        //         return {};
        //     }
        // },
        // observations: {
        //     type: new GraphQLList(ObservationType),
        //     args: {
        //         id: {type: new GraphQLList(GraphQLID)}
        //     },
        //     resolve: (parent, args) => {
                
        //         return [];
        //     }
        // },
        // bird: {
        //     type: BirdType,
        //     args: {id: {type: GraphQLID}},
        //     resolve: (parent, args) => {
        //         return {
        //             id: args.id
        //         }
        //     }
        // }
    }
});

export default new GraphQLSchema({
    query: RootQuery
})