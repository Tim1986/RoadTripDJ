const google = require("./google")
const wikipedia = require("./wikipedia")
const spotifyNPM = require("./spotifyNPM")
const spot = require("../controllers/api/spot")
const _ = require("lodash")

const timer = ms => new Promise(res => setTimeout(res, ms));

const algorithm = {
    tracks: (start, end, isPopular, userID, accessToken, newPlaylistID) => {

        return wikipedia.musicCities() //UPDATE: stored in Database database query
            .then(cityPool => {

                return algorithm.initialize(start, end, cityPool, isPopular, newPlaylistID, accessToken)
            })
            .then(result => {
                return Promise.all([
                    result,
                    userID,
                    accessToken,
                    newPlaylistID
                ])
            })

            .catch(err => console.log("\nERROR | Tracks error | " + err))


    },

    initialize: (start, end, arrayOfCities, isPopular, playlistID, accessToken) => {
        // return console.log("this error")
        return algorithm.step1(start, end)
            .then(userInput => {
                console.log("--Formatted user inputs for shear aesthetic appeal")

                const tripObj = {
                    startPoint: userInput[0][0],
                    endPoint: userInput[0][1],
                    tripTime: userInput[1].tripMinutes
                }
                return algorithm.step2(tripObj.startPoint, tripObj.endPoint, arrayOfCities, tripObj.tripTime)
            })
            .then(cityPoints => {
                console.log("--Found Closest Cities...")
                return algorithm.step3(cityPoints, cityPoints[2])
            })
            .then(results => {
                console.log("--Found relevent artists for start and end points")
                return algorithm.step4(results, results[2], isPopular, playlistID, accessToken)
                // return algorithm.step4(arrays, 6009402, isPopular, playlistID)
            })
            .then(trackURIs => {
              const newArray =  _.flattenDeep(trackURIs)
                console.log(newArray)

                console.log(`--Collected ${newArray.length} artists to hand over to spotify `)
                //PSUEDO: sort the start/end arrays of track object into one big array of spotify URIs
                return trackURIs
            })
            .catch()
    },

    step1: (start, end) => {
        return google.startGeo(start, end)
    },

    step2: (start, end, array, tripTime) => {
        console.log("--Getting geoData for all supplied cities")
        return google.geoDataLoop(array, 0)
            .then(function (newArray) {
                return Promise.all([
                    algorithm.closestWiki(start, newArray),
                    algorithm.closestWiki(end, newArray),
                    tripTime
                ])
            })
    },


    step3: (closeArr, tripTime) => {
        console.log("--Searching Wiki for artists in closest cities")
        return Promise.all([
            wikipedia.getArrayOfArtistsLoop(closeArr[0]),
            wikipedia.getArrayOfArtistsLoop(closeArr[1]),
            tripTime
        ])
    },

    step4: (cityObjArr, tripTime, isPopular, playlistID, accessToken) => {
        // console.log(cityObjArr)
        // console.log(tripTime)
        let totalSongNumber = Math.round(tripTime / 3.5)
        const startObjArr = cityObjArr[0],
            endObjArr = cityObjArr[1],
            startNum = algorithm.getSongsPerArtist(Math.ceil(totalSongNumber / 2), startObjArr.length),
            endNum = algorithm.getSongsPe
            rArtist(Math.floor(totalSongNumber / 2), endObjArr.length),
            first = algorithm.getTracks(startObjArr, totalSongNumber, startNum, isPopular, playlistID, accessToken),
            second = algorithm.getTracks(endObjArr, totalSongNumber, endNum, isPopular, playlistID, accessToken)

        return Promise.all([first, second])
            .then(trackObjs => {
                console.log(trackObjs)
                const URIs = []
                trackObjs.forEach(x => {
                    for (let i = 0; i < x.length; i++) {
                        let uri = x[i].id
                        URIs.push(uri)
                    }
                })
                return URIs
                // parse the results and return an array of spotify track URI's
            })
            .catch(err => console.log("Step4 ERROR: " + err))
    },

    getTracksForArtists: (songs, total, indexStart, perArtist, playlistID, artistIDs, accessToken) => {
        if (total <= 0) return;

        return spot.getTopSongs(perArtist, playlistID, artistIDs[indexStart], accessToken)
            .then(returnedIDs => {
                songs.push(returnedIDs)
                total = total - returnedIDs.length;
                indexStart = indexStart + 1

                
                console.log("--Pausing for 100ms")
                return timer(100);
            })
            .then(() => {
                return algorithm.getTracksForArtists(songs, total, indexStart, perArtist, playlistID, artistIDs, accessToken)
            })
    },

    getTracks: (array, total, perArtist, isPopular, playlistID, accessToken) => {
        const songs = [] //empty array for which to push the track objects into.
        const promises = []
        for (let city of array) { //for loop that loops through each of the 5 closest city objects 
            promises.push(spotifyNPM.getSpotifyForArray(city.array, perArtist, isPopular))
        }
        return Promise.all(promises)
            .then(returnedArtists => {
                // console.log(returnedArtists)
                const artistIDs = _.flattenDeep(returnedArtists).map(x => x.id)
                // console.log(artistIDs)
                return algorithm.getTracksForArtists(songs, total, 0, perArtist, playlistID, artistIDs, accessToken);
            })
            .catch(err => console.log("\nERROR | getTracks -> getSpotifyForArray in " + city.name + " | " + err + "\n"))
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
module.exports = algorithm