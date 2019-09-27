const search = require("../lib/switch");
const google = require("../lib/google");
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
  tracks: (start, end, isPopular, userID, accessToken) => {
    //Start and End point passed to geocoder to get Latitude/Longitude and formatted address for playlist name and database check
    return google.startGeo(start, end)
        .then((userInput) => {
          const tripObj = {
            startPoint: userInput[0][0],
            endPoint: userInput[0][1],
            tripTime: userInput[1].tripMinutes
          };
          console.log(tripObj)
          //-------------------------------------------------------------------------------------------------------
          // NEEDS: function that will be run for start and end point to check database to see if it has been searched before.
          // if it has then it will return the correct info and then skip to spotify track grabbing and playlist population
          // if not, it should return the regional list of cities to compare distance with
          //-------------------------------------------------------------------------------------------------------

        // Look up state in database, populated with searchedCities
        // return Promise.all([
            return algorithm.checkSearchedCities(tripObj.startPoint)
            // algorithm.checkSearchedCities(tripObj.endPoint),
            // tripObj.tripTime])
        })
        .then(result => {
            console.log(result)
        // const startClosest = result[0],
        //     endClosest = result[1],
        //     tripTime = result[2]

        // const startFormatted = algorithm.format(startClosest),
        //       endFormatted = algorithm.format(endClosest)

        // //NEEDS: function to save startFormatted and endFormatted arrays to searchCities collection

	    //NEEDS: function to grab stuff from the wikiCities collection

        })
        .catch((err) => console.log("\nERROR | Tracks error | " + err))
    
  },

  checkSearchedCities: function(mapPoint) {
    // const addressSplit = mapPoint.formattedAddress.split(", ")
    // let userCity, userState
    // if (addressSplit.length === 4){
    //     userState = addressSplit[2].split(" ")[0];
    //     userCity = addressSplit[1];
    // } else if ( addressSplit.length === 3) {
    //     userState = addressSplit[1].split(" ")[0];
    //     userCity = addressSplit[0];
    // } else {
    //     console.log("Address Not formatted correctly")
    // }
    const userCity = mapPoint.city,
          userState = mapPoint.state
    console.log(userState, userCity)

    State.find({ abbr: userState }).populate("searchedCities").exec((err, foundState) => {
      // Check if returnedState.searchedCities includes a city.name === userInput
      let doesExist = false;
      foundState.searchedCities.forEach((city) => {
        // If that city exists
        if (city.name === userCity) {
            return city.closestCities
        }
        return "there are no cities"

        // If city doesn't exist, find the closest cities and save it to the database
        //return listClosestCities
      });
    });
  },

  format : function( objArr ) {
    const array = []
    objArr.forEach(city => {
        if (city.includes(",")){
            const obj = {
                city: city.to.split(", ")[0],
                state: city.to.split(", ")[1],
            }
            array.push(obj)
        } else {
            const obj = {
                city: city.to,
                state: city.toFormatted.split(", ")[2].split(" ")[0]
                }
            }
        })
    },

    getSearch : function (pointObj){
        const split = pointObj.formattedAddress.split(", ")
        const abrv = split[2].split(" ")
        return search.citySearch(abrv[0])
    },


    findClosest: function(point){
        const array = algorithm.getSearch(point)
        console.log("--Getting geoData for all supplied cities")
        return google.geoDataLoop(array, 0)
            .then(function (arrayGlob) {
                return algorithm.closestWiki(point, arrayGlob)
            })
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
  },

  getSongsPerArtist: (songNumber, artistNumberFirstGroup) => {
    if (Math.ceil(songNumber / artistNumberFirstGroup) >= 3) {
      return 3;
    } else if (Math.ceil(songNumber / artistNumberFirstGroup) <= 1) {
      return 1;
    } else {
      return 2;
    }
  }
};

module.exports = algorithm