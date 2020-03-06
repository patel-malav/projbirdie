import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";
import { BirdType } from "./bird.object";
import { UserType } from "./user.object";
import { CoordinateType } from "./coordinate.object";
import { ImageType } from "./image.object";

export const ObservationType = new GraphQLObjectType(
    {
        name: 'Observation',
        fields: {
            id: {type: GraphQLID,
                resolve: (parent, args, ctx) => {
                    let {results:[{id}]} = ctx.data;
                    return id;
                }
            },
            user: {
                type: UserType,
                resolve: (parent, args, ctx) => {
                    let {results:[{user: {id, name}}]} = ctx.data;
                    return {id, name};
                }
            },
            bird: {
                type: BirdType,
                resolve(parent, args, ctx) {
                    let {results:[{taxon}]} = ctx.data;
                    // console.log(taxon);
                    let {id, name: sci, preferred_common_name: common} = taxon;
                    return {id, name:{sci, common}};
                }
            },
            geo: {
                type: CoordinateType,
                resolve: (parent, args, ctx) => {
                    let {results:[{location}]} = ctx.data;
                    let [lat, long] = location.split(',');
                    lat = parseFloat(lat);
                    long = parseFloat(long);                    
                    return {lat, long};
                }
            },
            images: {
                type: new GraphQLList(ImageType),
                resolve: (parent, args, ctx) => {
                    let{results:[{photos}]} = ctx.data;
                    return photos;
                }
            }
        }
    }
)