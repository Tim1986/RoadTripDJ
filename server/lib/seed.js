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
          console.log("Populating:", wikiCity.name)

          // Create each artist
          let countArtists = 0;
          let listArtists = [];
          wikiCity.artists.forEach((artist) => {
            Artist.create(
              {
                name: artist.artist,
                popularity: artist.popularity,
                spotifyID: artist.spotifyID
              },
              (err, newArtist) => {
                if (err) console.log(err);
                // Add array of newArtist id's to newWikiCity.wikiCities
                listArtists.push(newArtist._id);
                countArtists++;
                if (countArtists >= wikiCity.artists.length) {
                  console.log("Populated artists for:", newWikiCity.name);
                  newWikiCity.artists = listArtists;
                  newWikiCity.save();
                }
              }
            );
          });

          // Add array of newWikiCity id's to newState.wikiCities
          if (countWikiCity >= state.wikiCities.length) {
            console.log("Added state:", newState.name);
            newState.wikiCities = listWikiCities;
            newState.save();
          }
        });
      });
    }
  });
};

module.exports = seed;
