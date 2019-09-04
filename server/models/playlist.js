const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Your playlist muct have a name."
  },
  description: {
    type: String,
    trim: true
  },
  spotifyID: {
    type: String,
    unique: true
  },
  tracks: [
    {}
  ]
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;
