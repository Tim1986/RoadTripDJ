const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Your playlist muct have a name."
  },
  artist: {
    type: String,
    trim: true
  },
  position: {
    type: String,
    trim: true
  },
  spotifyURI: {
    type: String,
    unique: true
  },
  relevance: {
    type: String,
    trim: true
  }
});

const Track = mongoose.model("Track", TrackSchema);

module.exports = Track;
