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
  spotifyID: {
    type: String,
    unique: true
  }
});

const Artist = mongoose.model("Artist", ArtistSchema);

module.exports = Artist;
