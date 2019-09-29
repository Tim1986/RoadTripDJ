const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StateSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  abbr: {
    type: String,
    trim: true
  },
  searchedCities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SearchedCity"
    }
  ],
  wikiCities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WikiCity"
    }
  ]
});

const State = mongoose.model("State", StateSchema);

module.exports = State;
