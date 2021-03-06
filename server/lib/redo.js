const search = require("../lib/switch");
const google = require("../lib/google");
const minify = require("../controllers/api/minify")
const test = require("../controllers/api/spotifyTest")
const wikipedia = require("./wikipedia");
const spotifyNPM = require("./spotifyNPM");
const spot = require("../controllers/api/spot");
const _ = require("lodash");

//=====================================
// Import Database Models
//-------------------------------------

const State = require("../models/state"),
  WikiCity = require("../models/wikiCity"),
  SearchedCity = require("../models/searchedCity"),
  Artist = require("../models/artist");

//=====================================
// Algorithm Object
//-------------------------------------

const algorithm = {
  //   tracks: (start, end, isPopular, userID, accessToken, newPlaylistID) => {
  tracks: (start, end, isPopular, userID, accessToken, newPlaylistID) => {
    //Start and End point passed to geocoder to get Latitude/Longitude and formatted address for playlist name and database check

    return google
      .startGeo(start, end)
      .then((userInput) => {
        const tripObj = {
          startPoint: userInput[0][0],
          endPoint: userInput[0][1],
          tripTime: userInput[1].tripMinutes,
        };

        // Look up state in database, populated with searchedCities
        return Promise.all([
          algorithm.checkSearchedCities(tripObj.startPoint),
          algorithm.checkSearchedCities(tripObj.endPoint),
          tripObj.tripTime,
        ]);
      })
      .then((result) => {
        // const startClosest = result[0],
        //     endClosest = result[1],
        //     tripTime = result[2]
        // const startFormatted = algorithm.format(startClosest),
        //       endFormatted = algorithm.format(endClosest)
        // NEEDS: function to save startFormatted and endFormatted arrays to searchCities collection
        // NEEDS: function to grab stuff from the wikiCities collection
        //
        // result contains 3 items:
        //    result.startPoint, result.endPoint, and result.tripTime

        // Create an array to hold the arrays of startPoint Artists
        return Promise.all([
          algorithm.getArtists(result[0]),
          algorithm.getArtists(result[1]),
          result[2],
        ]);
      })
      .then(wikiCityResultsAndTripTime =>{
        const start = wikiCityResultsAndTripTime[0],
              end = wikiCityResultsAndTripTime[1],
              tripTime = wikiCityResultsAndTripTime[2]
              console.log("tripTime: " + tripTime)
        
        // const  startArr = minify.correctNumberOfSongs(start, tripTime),
        //        endArr = minify.correctNumberOfSongs(end, tripTime),
        //        testArr = [startArr, endArr]
        
        //        return Promise.all(testArr)
        

        return Promise.all([
          minify.correctNumberOfSongs(start, tripTime),
          minify.correctNumberOfSongs(end, tripTime)
        ])
      })
      .then(culledArr => {
        return Promise.all([
          test.controller(culledArr[0],culledArr[1], accessToken),
          accessToken, 
          newPlaylistID
        ])
      })
      .catch((err) => console.log("\nERROR | Tracks error | " + err));
  },

  getArtists: function(arr) {
      const result = [];
      arr.forEach((id) => {
        result.push(algorithm.getWikiCityArtists(id))
        });
      if (result.length === 5) {
        return Promise.all(result)
      }
  },

  checkSearchedCities: function(mapPoint) {
    return new Promise(function(resolve, reject) {
      const userCity = mapPoint.city,
        userState = mapPoint.state;
      // console.log("User State:", userState, "User City", userCity);

      State.findOne({ abbr: userState })
        .populate({
          path: "searchedCities",
          match: { name: userCity },
          populate: { path: "closestCities" }
        })
        .exec((err, foundState) => {
          if (err) {
            console.log(err);
          } else {
            // If the city doesn't exist in the DB...
            if (foundState.searchedCities[0] === undefined) {
              console.log("That city doesn't exist. Adding to database...");
              algorithm.getClosest(mapPoint).then((listClosestCities) => {
                // If city doesn't exist, find the closest cities and save it to the database
                return algorithm
                  .createSearchedCity(foundState, userCity, listClosestCities)
                  .then((listCityIDs) => {
                    resolve(listCityIDs);
                  });
              });
              // If the city does exist in the DB...
            } else {
              let listCities = foundState.searchedCities[0].closestCities,
                listCityIDs = [];
              listCities.forEach((city) => listCityIDs.push(city._id));
              resolve(listCityIDs);
            }
          }
        });
    });
  },

  createSearchedCity: function(state, cityName, cityArray) {
    return new Promise(function(resolve, reject) {
      // Create the new SearchedCity
      let countCities = 0;
      let listCities = [];
      SearchedCity.create({ name: cityName }, (err, newSearchedCity) => {
        console.log("Adding", newSearchedCity.name, "to", state.name);
        state.searchedCities.push(newSearchedCity);
        state.save();
        // Loop through the array of closestCity Objects
        cityArray.forEach((city) => {
          // Find each state and it's matching city
          State.findOne({ abbr: city.state })
            .populate({
              path: "wikiCities",
              match: { name: city.name }
            })
            .exec((err, foundState2) => {
              console.log("========================================")
              console.log(city.name)
              console.log(foundState2)
              console.log("========================================")
              listCities.push(foundState2.wikiCities[0]._id);
              countCities++;
              if (countCities === 5) {
                newSearchedCity.closestCities = listCities;
                newSearchedCity.save();
                resolve(listCities);
              }
            });
        });
      });
    });
  },

  getWikiCityArtists: function(id) {
    return new Promise(function(resolve, reject) {
      WikiCity.findById(id).populate("artists").exec((err, foundWikiCity) => {
        resolve(foundWikiCity.artists);
      });
    });
  },

  format: function(objArr) {
    const array = [];
    objArr.forEach((city) => {
      if (city.includes(",")) {
        const obj = {
          city: city.to.split(", ")[0],
          state: city.to.split(", ")[1]
        };
        array.push(obj);
      } else {
        const obj = {
          city: city.to,
          state: city.toFormatted.split(", ")[2].split(" ")[0]
        };
      }
    });
  },

  getSearch: function(state) {
    return search.citySearch(state);
  },

  getClosest: function(point) {
    return algorithm.getSearch(point.state).then((array) => {
      console.log("--Getting geoData for all supplied cities");
      return google.geoDataLoop(array, 0).then(function(arrayGlob) {
        return algorithm.closestWiki(point, arrayGlob);
      });
    });
  },

  closestWiki: (staticObj, geoArray) => {
    console.log(
      "--Getting distance between " + staticObj.formattedAddress + " and wiki categories"
    );
    const matrixPromises = [];
    for (let cityObj of geoArray) {
      matrixPromises.push(google.getDistance(staticObj, cityObj));
    }
    return Promise.all(matrixPromises).then((results) => {
      console.log("--checking which cities are closest to " + staticObj.formattedAddress);
      return algorithm.closestify(results);
    });
  },

  closestify: (results) => {
    const sorted = results.filter((x) => x !== undefined);
    sorted.sort((a, b) => parseFloat(a.howClose.value) - parseFloat(b.howClose.value));
    const closestCities = sorted.slice(0, 5);
    //closestCities now contains the 5 closest categories to query for artists
    console.table(closestCities);

    return closestCities;
  }
};

module.exports = algorithm;
