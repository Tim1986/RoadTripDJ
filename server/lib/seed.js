const State = require("../models/state"),
  WikiCity = require("../models/wikiCity"),
  Artist = require("../models/artist");

const seedData = require("../lib/seedData");

const seed = () => {
  console.log("Seeding the database...");
  let stateIndex = seedData.findIndex(state => {
    return state.name === "Ohio"
  })
  let cityIndex = seedData[stateIndex].wikiCities.findIndex(city => {
    return city.name === "Akron"
  })
  console.log(seedData[stateIndex].wikiCities[cityIndex])
};

module.exports = seed;
