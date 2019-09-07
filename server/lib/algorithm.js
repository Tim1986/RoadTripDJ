const google = require("./google")
const wikipedia = require("./wikipedia")
const spotifyNPM = require("./spotifyNPM")

const algorithm = {
    tracks :  (start, end, isPopular, userID, accessToken) => {
        return wikipedia.musicCities()
        .then(cityPool =>
        algorithm.step1(start,end, cityPool)
        )
            
        
      },

    step1 : (start, end, arrayOfCities) => {
        return google.startGeo(start,end)
        .then(userInput => {
            const tripObj = {
                 startPoint : userInput[0][0],
                  endPoint : userInput[0][1],
                  tripTime : userInput[1].tripMinutes
            }

        return algorithm.step2(tripObj.startPoint, tripObj.endPoint, arrayOfCities)
        })
        .then(closestCities => {
        return algorithm.step3(closestCities)
        })   
        
    },

    step2 : (start, end, array) => {
        console.log("--Found the closest Cities to " + start.formattedAddress + " and " + end.formattedAddress)
        return Promise.all([
            algorithm.closestWiki(start, array),
            algorithm.closestWiki(end, array)
        ])
        },
    

    step3 : (closeArr) => {
        return Promise.all([
            wikipedia.getArrayOfArtistsLoop(closeArr[0]),
            wikipedia.getArrayOfArtistsLoop(closeArr[1])
        ])
    },

    
    closestWiki : (staticObj, addressArray) => {
        return google.geoDataLoop(addressArray, 0)
            .then(function (newArray) {
                const matrixPromises = []
                for (let i = 0; i < newArray.length; i++) {
                    matrixPromises.push(google.getDistance(staticObj, newArray[i]))
                }
                return Promise.all(matrixPromises)
            })
            .then((results)=>(
                algorithm.closestify(results)
            ))

                
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