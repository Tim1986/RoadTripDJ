const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  popularity: {
    type: String,
    trim: true
  },
  spotifyID: String
});

const Artist = mongoose.model("Artist", ArtistSchema);

module.exports = Artist;
