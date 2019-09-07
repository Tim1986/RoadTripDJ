const google = require("./google")
const wikipedia = require("./wikipedia")
const spotifyNPM = require("./spotifyNPM")

const algorithm = {
    tracks :  (start, end, isPopular, userID, accessToken) => {
        return wikipedia.musicCities()
        .then(cityPool =>{
        return algorithm.initialize(start,end, cityPool, isPopular)
        })

            
        
      },

    initialize : (start, end, arrayOfCities, isPopular) => {
        console.log("--Formatting user inputs for shear aesthetic appeal")
        return algorithm.step1(start, end)
            .then(userInput => { 
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
        const startArr = cityObjArr[0]
        const endArr = cityObjArr[1]
        const startNum = algorithm.getSongsPerArtist(Math.ceil(totalSongNumber/2) , startArr.length)
        const endNum = algorithm.getSongsPerArtist(Math.floor(totalSongNumber/2), endArr.length)


        

    },

    songCheck : (array, num, isPopular) => {
        spotifyNPM.getSpotifyForArray()
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