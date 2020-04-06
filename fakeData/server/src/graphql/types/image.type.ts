import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

const inat_img_url = `https://static.inaturalist.org/photos/`;

const ImageType = new GraphQLObjectType({
    name: 'Image',
    fields: {
        id: {type: GraphQLID},
        square: {
            type: GraphQLString,
            resolve: (parent) => `${inat_img_url}${parent.id}/square.jpg`
        },
        small: {
            type: GraphQLString,
            resolve: (parent) => {
                console.log(`Parent ------` + parent.id);
                return `${inat_img_url}${parent.id}/small.jpg`;
            }
        },
        medium: {
            type: GraphQLString,
            resolve: (parent) => `${inat_img_url}${parent.id}/medium.jpg`
        },
        large: {
            type: GraphQLString,
            resolve: (parent) => `${inat_img_url}${parent.id}/large.jpg`
        },
        original: {
            type: GraphQLString,
            resolve: (parent) => `${inat_img_url}${parent.id}/original.jpg`
        }
    },
});

export default ImageType;