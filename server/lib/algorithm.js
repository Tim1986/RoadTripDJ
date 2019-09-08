const google = require("./google")
const wikipedia = require("./wikipedia")
const spotifyNPM = require("./spotifyNPM")

const algorithm = {
    tracks :  (start, end, isPopular, userID, accessToken) => {
        return wikipedia.musicCities()
        .then(cityPool =>{
        return algorithm.initialize(start,end, cityPool, isPopular)
        })
        .catch(err => console.log("\nERROR | Tracks error | " + err))
            
        
      },

    initialize : (start, end, arrayOfCities, isPopular) => {
        return algorithm.step1(start, end)
        .then(userInput => { 
            console.log("--Formatted user inputs for shear aesthetic appeal")

            const tripObj = {
                startPoint : userInput[0][0],
                endPoint : userInput[0][1],
                tripTime : userInput[1].tripMinutes
            }
            return algorithm.step2(tripObj.startPoint, tripObj.endPoint, arrayOfCities, tripObj.tripTime)
        })
        .then(cityPoints => {
            console.log("--Found Closest Cities...")
            return algorithm.step3(cityPoints, cityPoints[2])
        })
        .then(results => {
            console.log("--Found relevent artists for start and end points")
            return algorithm.step4(results, results[2], isPopular)
        })
        .then(trackURIs => {
            console.log(`--Collected ${trackURIs.length} songs to hand over to spotify `)
            //PSUEDO: sort the start/end arrays of track object into one big array of spotify URIs
            return trackURIs
        })
        .catch()
    },
    
    step1 : (start, end) => {
        return google.startGeo(start,end)
    },
    
    step2 : (start, end, array, tripTime) => {
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
    
    
    step3 : (closeArr, tripTime) => {
        console.log("--Searching Wiki for artists in closest cities")
        return Promise.all([
            wikipedia.getArrayOfArtistsLoop(closeArr[0]),
            wikipedia.getArrayOfArtistsLoop(closeArr[1]),
            tripTime
        ])
    },
    
    step4 : (cityObjArr, tripTime, isPopular) => {
        console.log(cityObjArr)
        console.log(tripTime)
        let totalSongNumber = Math.round(tripTime / 3.5)
        const startObjArr = cityObjArr[0],
              endObjArr = cityObjArr[1],
              startNum = algorithm.getSongsPerArtist(Math.ceil(totalSongNumber/2) , startObjArr.length),
              endNum = algorithm.getSongsPerArtist(Math.floor(totalSongNumber/2), endObjArr.length),
              first = algorithm.getTracks(startObjArr,totalSongNumber, startNum, isPopular),
              second = algorithm.getTracks(endObjArr,totalSongNumber, endNum, isPopular)
        
        return Promise.all([first, second])
        .then(trackObjs =>{
            const URIs = []
            for ( array of trackObjs){
                for (obj of array){
                    let uri = obj.id
                    URIs.push(uri)
                }
            }
            return URIs
            // parse the results and return an array of spotify track URI's
        })

        

    },

    getTracks : (array, total, perArtist, isPopular) => {
        let totalToGet = total //probably unecessary but makes me feel safe and warm
        return () => {                  //returns the results of this funtion. I think this will make sure that the for loop completes
            const songs = []            //empty array for which to push the track objects into.
            for (let city of array) {   //for loop that loops through each of the 5 closest city objects 
                while (totalToGet < 0){      //checks how many songs are needed. If it is more than 0 than it continues to the spotify query
                    return spotifyNPM.getSpotifyForArray(city.array, perArtist, isPopular) 
                    .then(returnedSongs => {
                        totalToGet = totalToGet - returnedSongs.length //subtracts total number of tracks returned from the total
                        songs.push(returnedSongs)
                    })
                    .catch(err => console.log("\nERROR | getTracks -> getSpotifyForArray in " + city.name + " | " + err + "\n"))
                }
            }
            return songs
            
        }
    },
    
    closestWiki : (staticObj, geoArray) => {
        console.log("--Getting distance between " + staticObj.formattedAddress + " and wiki categories")
        const matrixPromises = []
        for (let cityObj of geoArray) {
            matrixPromises.push(google.getDistance(staticObj, cityObj))
            }
        return Promise.all(matrixPromises)

        .then((results)=>{
            console.log("--checking which cities are closest to " + staticObj.formattedAddress)
            return algorithm.closestify(results)
        })
    },

    closestify : (results) => {
        const sorted = results.filter(x => x !== undefined)
        sorted.sort((a, b) => parseFloat(a.howClose.value) - parseFloat(b.howClose.value))
        const closestCities = sorted.slice(0, 5)
        //closestCities now contains the 5 closest categories to query for artists
        console.table(closestCities)

        return closestCities
    },

    getSongsPerArtist : (songNumber, artistNumberFirstGroup) => {
    
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