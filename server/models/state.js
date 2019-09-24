const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StateSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  cities: [
    {}
  ],
  closestStates: [
    {}
  ]
});

const State = mongoose.model("State", StateSchema);

module.exports = State;
