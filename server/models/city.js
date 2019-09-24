const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  closestCities: [
    {}
  ],
  artists: [
    {}
  ]
});

const City = mongoose.model("City", CitySchema);

module.exports = City;
