const State = require("../models/state"),
  WikiCity = require("../models/wikiCity"),
  Artist = require("../models/artist");

const seedData = require("../lib/seedData");

const seed = () => {
  console.log("Seeding the database...");
   // let stateIndex = seedData.findIndex(state => {
  //   return state.name === "Ohio"
  // })
  // let cityIndex = seedData[stateIndex].wikiCities.findIndex(city => {
  //   return city.name === "Akron"
  // })
  // console.log(seedData[stateIndex].wikiCities[cityIndex])
  
  seedData.forEach((state) => {
    // Create each State
    State.create(
      {
        name: state.name,
        abbr: state.abbr
      },
      (err, newState) => {
        if (err) console.log(err);
        // Create each WikiCity
        state.wikiCities.forEach((wikiCity) => {
          WikiCity.create({ name: wikiCity.name }, (err, newWikiCity) => {
            if (err) console.log(err);
            // Create each artist
            // wikiCity.artists.forEach((artist) => {
            //   Artist.create(
            //     {
            //       name: artist.artist,
            //       popularity: artist.popularity,
            //       spotifyID: artist.spotifyID
            //     },
            //     (err, newArtist) => {
            //       if (err) console.log(err);
            //       // Puse newArtist into newWikiCity.artists
            //       newWikiCity.artists.push(newArtist);
            //       newWikiCity.save();
            //     }
            //   );
            // });
            // Push newWikiCity into newState.wikiCities
            newState.wikiCities.push(newWikiCity);
            newState.save();
          });
        });
      }
    );
  });
 
};

module.exports = seed;
