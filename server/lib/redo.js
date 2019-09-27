const search = require("switch.js")
const google = require("./google")
const wikipedia = require("./wikipedia")
const spotifyNPM = require("./spotifyNPM")
const spot = require("../controllers/api/spot")
const _ = require("lodash")

const algorithm = {
    tracks: (start, end, isPopular, userID, accessToken, newPlaylistID) => {
        //Start and End point passed to geocoder to get Latitude/Longitude and formatted address for playlist name and database check
        return google.startGeo(start, end)
            .then(userInput => {
            const tripObj = {
                startPoint: userInput[0][0],
                endPoint: userInput[0][1],
                tripTime: userInput[1].tripMinutes
            }
        //-------------------------------------------------------------------------------------------------------
        // function that will be run for start and end point to check database to see if it has been searched before. 
        // if it has then it will return the correct info and then skip to spotify track grabbing and playlist population
        // if not, it should return the regional list of cities to compare distance with
        //-------------------------------------------------------------------------------------------------------

        if (itExistsInDB) {
            //code to grab the artists from the from the searchCities
            //and then pass that to the spotifyTest function
        } else {

        const startArray = algorithm.getSearch(tripObj.startPoint)
        const endArray = algorithm.getSearch(tripObj.endPoint)

        return algorithm.findClosest(tripObj.startPoint, tripObj.endPoint, startArray, endArray, tripObj.tripTime) 
        }
        })
        .then(result => {
        const startClosest = result[0],
            endClosest = result[1],
            tripTime = result[2]
        
        const startFormatted = algorithm.format(startClosest),
              endFormatted = algorithm.format(endClosest)
        
        //function to grab stuff 

        })
        .catch(err => console.log("\nERROR | Tracks error | " + err))
        
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


    findClosest: function(start, end, startArray, endArray, tripTime){
        console.log("--Getting geoData for all supplied cities")
        return promise.all([google.geoDataLoop(startArray, 0),google.geoDataLoop(endArray, 0)])
            .then(function (arrayGlob) {
                return Promise.all([
                    algorithm.closestWiki(start, arrayGlob[0]),
                    algorithm.closestWiki(end, arrayGlob[1]),
                    tripTime
                ])
            })
    },

    closestWiki: (staticObj, geoArray) => {
        console.log("--Getting distance between " + staticObj.formattedAddress + " and wiki categories")
        const matrixPromises = []
        for (let cityObj of geoArray) {
            matrixPromises.push(google.getDistance(staticObj, cityObj))
        }
        return Promise.all(matrixPromises)

            .then((results) => {
                console.log("--checking which cities are closest to " + staticObj.formattedAddress)
                return algorithm.closestify(results)
            })
    },

    closestify: (results) => {
        const sorted = results.filter(x => x !== undefined)
        sorted.sort((a, b) => parseFloat(a.howClose.value) - parseFloat(b.howClose.value))
        const closestCities = sorted.slice(0, 5)
        //closestCities now contains the 5 closest categories to query for artists
        console.table(closestCities)

        return closestCities
    },
    
    getSongsPerArtist: (songNumber, artistNumberFirstGroup) => {

        if (Math.ceil(songNumber / artistNumberFirstGroup) >= 3) {
            return 3;
        } else if (Math.ceil(songNumber / artistNumberFirstGroup) <= 1) {
            return 1;
        } else {
            return 2;
        }
    },
}

    