import axios from 'axios';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import { BirdType } from "./schema/bird.object";
import { ObservationType } from "./schema/observation.object";

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => 'data From projbirdie server'
        },
        observation: {
            type: ObservationType,
            args: {
                id: {type: GraphQLID}
            },
            resolve: async (parent, args, ctx) => {
                let resp: any;
                try {
                    let url = `https://api.inaturalist.org/v1/observations/${args.id}`;
                    console.log(`Requesting - ${url}`);
                    resp = await axios(url);
                    ctx.data = resp.data;
                } catch(err) {
                    console.log(err);
                    return null;
                }
                return {};
            }
        },
        bird: {
            type: BirdType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                return {
                    id: args.id
                }
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery
})