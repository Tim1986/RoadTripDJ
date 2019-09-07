const google = require("./google")
const wiki = require("./wikipedia")
const spotifyNPM = require("./spotifyNPM")

const algorithm = {
    tracks : (req) => {
        const start = req.body.startPoint,
              end = req.body.endPoint,
              isPopular = req.body.isPopular
              playlistName = start.formattedAddress + " to " + end.formattedAddress,
              userID = req.params.userID,
              accessToken = req.params.accessToken

        algorithm.step1(start,end)
            
        
      },

    step1 : (start, end) => {
        return google.geoDataLoop([start,end],0)
        .then(userData => {
            start = userData[0]
            end = userData[1]
            return wiki.musicCities()
        })
        .then(resultArray => {
        return Promise.all([
            algorithm.closestWiki(start, resultArray),
            algorithm.closestWiki(END, resultArray)
            ])
        })
        .then(closeArr => {
            return Promise.all([
                wiki.getArrayOfArtistsLoop(closeArr[0]),
                wiki.getArrayOfArtistsLoop(closeArr[1])
            ])
        })
        .then(results => console.log("\n",results))
    },
    
    closestWiki : (staticObj, addressArray) => {
        return google.geoDataLoop(addressArray)
            .then(function (addressArray) {
                const matrixPromises = []
                for (let i = 0; i < addressArray.length; i++) {
                    matrixPromises.push(google.getDistance(staticObj, addressArray[i]))
                }
                return Promise.all(matrixPromises)
            })
            .then(function (results) {
                const sorted = results.filter(x => x !== undefined)
                sorted.sort((a, b) => parseFloat(a.howClose.value) - parseFloat(b.howClose.value))
                const closestCities = sorted.slice(0, 5)
                //closestCities now contains the 5 closest categories to query for artists
                console.log('\n...generated list of places to listen to near ' + address)
                console.table(closestCities)

                return closestCities
                
            .catch(err => console.log("ClosestWiki ERROR: " + err))
        })
    },
    
    
}
module.exports = algorithm