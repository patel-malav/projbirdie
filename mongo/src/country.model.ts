import { model, Schema } from 'mongoose';

let countrySchema = {
  name: {
    type: String,
    required: true,
  },
  centroid: {
    lat: Number,
    lng: Number,
    alti: Number,
  },
  cid: {
    type: String,
    required: true,
  },
  model: String,
  zoomLevel: Number,
  displaySize: Number,
  level: Number,
  inat: {
    place_id: Number,
    obs_count: Number,
  },
};

export const Country = model('country', new Schema(countrySchema));
