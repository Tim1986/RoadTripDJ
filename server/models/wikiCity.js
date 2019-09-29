const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WikiCitySchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  artists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist"
    }
  ]
});

const WikiCity = mongoose.model("WikiCity", WikiCitySchema);

module.exports = WikiCity;
