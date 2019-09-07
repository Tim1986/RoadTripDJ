const google = require("./google")
const wikipedia = require("./wikipedia")
const spotifyNPM = require("./spotifyNPM")

const algorithm = {
    tracks :  (start, end, isPopular, userID, accessToken) => {
        return wikipedia.musicCities()
        .then(cityPool =>
        algorithm.initialize(start,end, cityPool)
        )
            
        
      },

    initialize : (start, end, arrayOfCities) => {
        return algorithm.step1(start, end)
        .then(userInput => { 
            const tripObj = {
                startPoint : userInput[0][0],
                endPoint : userInput[0][1],
                tripTime : userInput[1].tripMinutes
            }
        return algorithm.step2(tripObj.startPoint, tripObj.endPoint, arrayOfCities)
        })
        .then(cityPoints => {
        console.log("--Found Closest Cities...")
        return algorithm.step3(cityPoints)
        })
        .then(results =>
            console.log(results)
        )
        
    },
    
    step1 : (start, end) => {
        return google.startGeo(start,end)
    },
    
    step2 : (start, end, array) => {
        console.log("--Getting geoData for all supplied cities")
        return google.geoDataLoop(array, 0)
        .then(function (newArray) {
        return Promise.all([
            algorithm.closestWiki(start, newArray),
            algorithm.closestWiki(end, newArray)
            ])
        })
    },
    
    
    step3 : (closeArr) => {
        console.log("--Searching Wiki for artists in closest cities")
        return Promise.all([
            wikipedia.getArrayOfArtistsLoop(closeArr[0]),
            wikipedia.getArrayOfArtistsLoop(closeArr[1])
        ])
    },
    
    
    closestWiki : (staticObj, geoArray) => {
        console.log("--Getting distance between trip cities and wiki categories")
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
    
}
module.exports = algorithm