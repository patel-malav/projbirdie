import axios, { AxiosResponse } from 'axios';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import SearchResultType from './types/search-result';
import TaxanomyType from './types/taxa.type';

const url = 'https://api.inaturalist.org/v1';

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
    resolve: async (parent: any, args: any) => {
        let resp: AxiosResponse<any>;
        try {
            resp = await axios.get(`${url}/taxa/autocomplete?q=${args.term}`);
        } catch(err) {
            console.log(`Error in API call TaxanomySearch For Term:- ${args.term}`,err);
            return null;
        }

        let output = [];
        // console.log(`From INaturalist:- Results Length = ${resp.data.results.length} Per_Page = ${resp.data.per_page} Total_Result = ${resp.data.total_results}`);
        for(let result of resp.data.results) {
            let {id: taxaId, name: common, preferred_common_name: sci, default_photo: {url: image}} = result;
            output.push({taxaId, name: {common, sci}, image});
        }
        return output;
    }
}

const observations = {

}

const taxanomy = {
    type: TaxanomyType,
    args: {
        id: {type: GraphQLID}
    },
    resolve: async (parent: any, args:{id: any}) => {
        // console.log(args.id);
        let resp: AxiosResponse<any>;
        try {
            resp = await axios.get(`${url}/taxa/${args.id}`);
        } catch (err) {
            console.log(`Error in API call For TaxaId For Id:- ${args.id}`,err);
            return null;
        }
        // console.log(resp.data);
        let {
            id, 
            name: sci, 
            preferred_common_name: common,
            default_photo: image
        } = resp.data.results.pop();
        // console.log(image);

        return {id, name: {common, sci}, image};
    }
}

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        hello,
        search,
        taxanomy
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