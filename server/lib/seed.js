const State = require("../models/state"),
  WikiCity = require("../models/wikiCity"),
  Artist = require("../models/artist");

const seedData = require("../lib/seedData");

const seed = () => {
  console.log("Seeding the database...");
  seedData.forEach((state) => {
    // Create each State
    const newState = new State({
      name: state.name,
      abbr: state.abbr
    });

    // Create each WikiCity
    let countWikiCity = 0;
    let listWikiCities = [];
    if (state.wikiCities.length === 0) {
      newState.save();
    } else {
      state.wikiCities.forEach((wikiCity) => {
        WikiCity.create({ name: wikiCity.name }, (err, newWikiCity) => {
          if (err) console.log(err);
          listWikiCities.push(newWikiCity._id);
          countWikiCity++;
          console.log("Count:", countWikiCity);
          console.log("listWikiCities", listWikiCities);

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

          // Add array of newWikiCity id's to newState.wikiCities
          if (countWikiCity >= state.wikiCities.length) {
            console.log("Populated", newState.name);
            newState.wikiCities = listWikiCities;
            newState.save();
          }
        });
      });
    }
  });
};

module.exports = seed;
