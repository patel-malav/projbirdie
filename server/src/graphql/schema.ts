import axios, { AxiosResponse } from "axios";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from "graphql";
import SearchResultType from "./types/search-result";
import TaxanomyType from "./types/taxa.type";
import ObservationType from "./types/observation.type";

const url = "https://api.inaturalist.org/v1";

/**
 * Hello Message
 */
const hello = {
  type: GraphQLString,
  resolve: () => "Hi from projbirdie server"
};

/**
 * Autocomplete give 10 results max
 */
const search = {
  type: new GraphQLList(SearchResultType),
  args: {
    term: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (parent: any, args: any) => {
    let resp: AxiosResponse<any>,
      output: any[] = [];
    try {
      resp = await axios.get(`${url}/taxa/autocomplete?q=${args.term}`);
    } catch (err) {
      console.log(
        `Error in API call TaxanomySearch For Term:- ${args.term}`,
        err
      );
      return null;
    }
    // console.log(`From INaturalist:- Results Length = ${resp.data.results.length} Per_Page = ${resp.data.per_page} Total_Result = ${resp.data.total_results}`);
    for (let result of resp.data.results) {
      let {
        id: taxaId,
        name: sci,
        preferred_common_name: common,
        default_photo: { url: image }
      } = result;
      output.push({ taxaId, name: { common, sci }, image });
    }
    return output;
  }
};

/**
 * Taxanomy Id Query From Taxanomy Id
 */
const taxanomy = {
  type: TaxanomyType,
  args: {
    id: { type: GraphQLID }
  },
  resolve: async (parent: any, args: { id: any }) => {
    // console.log(args.id);
    let resp: AxiosResponse<any>, output: any;
    try {
      resp = await axios.get(`${url}/taxa/${args.id}`);
    } catch (err) {
      console.log(`Error in API call For TaxaId For Id:- ${args.id}`, err);
      return null;
    }
    // console.log(resp.data);
    let {
      id,
      name: sci,
      preferred_common_name: common,
      default_photo: image
    } = resp.data.results.pop();
    output = { id, name: { common, sci }, image };

    return output;
  }
};

/**
 * Observation Query from Observation Id
 */
const observation = {
  type: ObservationType,
  args: {
    id: { type: GraphQLID }
  },
  resolve: async (parent: any, args: { id: any }) => {
    let resp: AxiosResponse<any>, output: any;
    try {
      resp = await axios.get(`${url}/observations/${args.id}`);
    } catch (err) {
      console.log(`Error in API call Observation Id For Id:- ${args.id}`, err);
      return null;
    }
    // console.log(resp.data);
    let { id, location, photos, user } = resp.data.results.pop();
    let [lat, long] = location.split(",");
    output = { id, user, geo: { lat, long }, images: photos };
    return output;
  }
};

/**
 * 
 */
const observations = {
  type: new GraphQLList(ObservationType),
  args: {
    ids: { type: new GraphQLList(GraphQLID) },
    taxaId: { type: GraphQLID }
  },
  resolve: async (parent: any, args: { ids: any[]; taxaId: number }) => {
    let resp: AxiosResponse<any>,
      output: any[] = [];
    try {
      if (args.ids) {
        resp = await axios.get(`${url}/observations/${args.ids}`);
      } else if (!!args.taxaId) {
        resp = await axios.get(`${url}/observations?taxon_id=${args.taxaId}`);
      }
    } catch (err) {
      console.log(`Error in API call Observations :- ${args.ids}`);
      return null;
    }
    for (let result of resp.data.results) {
      let { id, location, photos, user } = result;
      let geo: {[key: string]: string} = {};
      if(location) {
          [geo.lat, geo.long] = location.split(",");
      }
      // console.log(user);
      output.push({ id, user, geo, images: photos });
    }
    return output;
  }
};

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    hello,
    search,
    taxanomy,
    observation,
    observations
  }
});

export default new GraphQLSchema({
  query: RootQuery
});
