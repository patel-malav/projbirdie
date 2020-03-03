// Package's Import
import axios from 'axios';

/**
 *  Class to handel resolver's related to BirdType
 *  # Also Handel Future Mongoose Integration
 */
export class Bird {
    image: String; // image url
    location = {          // Geo Coordinate # Make class to handle CoordinateType
        lat: 22.550495,   // Lattitude
        long: 72.9192952  // Longitude
    };
    url = {                             // Urls Object for various # revision needed for this
        wiki: 'https://projbirdie.tech' // Wikipedia Link
    }
    // Constructor has 2 Args which are Not Null.
    constructor(
        public id: string,  // Id for bird # revision needed
        public name: string // Name of bird # revison needed
    ) { }

    /**
     *  Very Loose Test type Resolver for getting data using BirdID.
     *  # Rethink about the function.
     */

    static async getByID(_id = 39450352) {
        let resp: any;
        try {
            resp = await axios.get(`https://api.inaturalist.org/v1/observations/${_id}`)
        } catch(err) {
            return null;
        }
        let {
            data:{ 
                results: [
                    {
                        id,
                        taxon: { preferred_common_name: name, wikipedia_url: wiki},
                        location,
                        photos: [{ id: photo_id, url: photo_url}]
                    }
                ]
            }
        } = resp;

        let [lat, long] = location.split(',');
        let image = `https://static.inaturalist.org/photos/${photo_id}/original.jpeg`

        // let data = {id, name, photo: {photo_id, photo_url},image, location: { lat, long}, url: { wiki }};
        return {id, name, photo: {photo_id, photo_url},image, location: { lat, long}, url: { wiki }};
    }
}