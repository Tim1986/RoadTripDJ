const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SearchedCitySchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  closestCities: [
    String
  ]
});

const SearchedCity = mongoose.model("SearchedCity", SearchedCitySchema);

module.exports = SearchedCity;
