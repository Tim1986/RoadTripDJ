const wiki = require('wikijs').default;
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDj-_Xoa2q3k_8mdhM7xfuh-oHaGhbOIMk',
    Promise: Promise
});


const tripData = {
    getGeoData : address => {
        return googleMapsClient.geocode({ address: address })
            .asPromise()
            .then((response) => {
                let geoRes = {
                    input: address,
                    formattedAddress: response.json.results[0].formatted_address,
                    latLng: `${response.json.results[0].geometry.location.lat}, ${response.json.results[0].geometry.location.lng}`,
                }
                return geoRes
            })
    },

    geoDataLoop : (array) => {
        const geoPromises = [];
        for (let i = 3; i < array.length; i++) { //Had to change this to 3 to avoid undefined wiki
            geoPromises.push(tripData.getGeoData(array[i]))
        }
        return Promise.all(geoPromises)
    },

    getDistance : (static, alternating) => {
        return googleMapsClient.distanceMatrix({ origins: static.latLng, destinations: alternating.latLng, mode: 'driving' })
            .asPromise()
            .then((response) => {
                let resultObj = {
                    cityName: alternating.input,
                    from: static.input,
                    tripMinutes: response.json.rows[0].elements[0].duration.value * 60,
                    howClose: {
                        value: response.json.rows[0].elements[0].distance.value ,
                        unitString: response.json.rows[0].elements[0].distance.text
                    }
                }
                return resultObj
            })
            .catch((error) => {
                console.log("ERROR | getDistance Query: " + alternating.input + " | " + error)
            })
    },

    closestWiki : (staticAddress, addressArray) => {
        let staticObj;
        return tripData.getGeoData(staticAddress)
            .then(function (resultObj) {
                staticObj = resultObj
                return tripData.geoDataLoop(addressArray)
            })
            .then(function (addressArray) {
                const matrixPromises = []
                for (let i = 0; i < addressArray.length; i++) {
                    matrixPromises.push(tripData.getDistance(staticObj, addressArray[i]))
                }
                return Promise.all(matrixPromises)
            })
    },

    getClosestCities : address => {
        return wiki().pagesInCategory("Category:American musicians by city")
            .then((wikiList) => {
                console.log('\n...recieved comparison data for ' + address + '...')
                const places = []
                wikiList.forEach(category => {
                    let location = category.split(" from ")
                    places.push(location[1])
                });
                return tripData.closestWiki(address, places)
            })
            .then(function (results) {
                const sorted = results.filter(x => x !== undefined)
                sorted.sort((a, b) => parseFloat(a.howClose.value) - parseFloat(b.howClose.value))
                const closestCities = sorted.slice(0, 5)
                //closestCities now contains the 5 closest categories to query for artists
                console.log('\n...generated list of places to listen to near ' + address)
                console.table(closestCities)

                //first set of async calls to query wikipedia and find relevent artists  
                //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
                const vows = []
                for (let i = 0; i < 5; i++) {
                    let firstArg = `Musicians from ${closestCities[i].cityName}`
                    const arrayOfArtists = []
                    let arrayOfCategories = []
                    let arrayOfTotalCategories = []            
                    vows.push(tripData.getArrayOfArtists(firstArg, closestCities[i].cityName, arrayOfArtists, arrayOfCategories, arrayOfTotalCategories))
                    // getArrayOfArtists() on Line 51
                }

                // waits until each result is recieved and returns them all at once as the result of this function
                return Promise.all(vows)
            })
            .catch((error) => { console.log("closestWiki ERROR:" + error) })
    },

    getArrayOfArtists : (searchType, originalLocation, arrayOfArtists, arrayOfCategories, arrayOfTotalCategories) => {
        console.log("Finding array of artists for " + searchType + "...")

        return wiki().pagesInCategory(`Category:${searchType}`)
            .then((response) => {
                tripData.pushThisPageArtists(response, arrayOfArtists)
                // *****************************************************************
                // This used to be the getAdditionalCategories function call.
                // Can't do it anymore because I need both category arrays in scope.
                if (response.length > 0) {
                    for (let i = 1; i < 15; i++) {
                        if (response[response.length - i] && response[response.length - i].includes(":") && response[response.length - i].split(":")[0] === "Category") {
                            if (arrayOfTotalCategories.includes(response[response.length - i].split(":")[1]) || response[response.length - i].split(":")[1].includes("albums") || response[response.length - i].split(":")[1].includes("songs")) {
                            } else {
                                arrayOfCategories.push(response[response.length - i].split(":")[1])
                                arrayOfTotalCategories.push(response[response.length - i].split(":")[1])
                            }
                        }
                    }
                }
                // *****************************************************************
                if (arrayOfCategories[0]) {
                    let newSearchType = arrayOfCategories[0]
                    arrayOfCategories.shift();
                    return tripData.getArrayOfArtists(newSearchType, originalLocation, arrayOfArtists, arrayOfCategories, arrayOfTotalCategories)
                } else {
                    let noDupeArray = Array.from(new Set(arrayOfArtists))
                    let obj = {
                        name: originalLocation,
                        array: []
                    }
                    obj.array = noDupeArray
                    return obj
                }
            })
            .catch((error) => { console.log("wiki:" + error) })
    },

    pushThisPageArtists : (response, arrayOfArtists) => {
        for (let i = 0; i < response.length; i++) {
            if (response[i].split(":")[0] === "Category") {
            } else {
                if (response[i].split("(")) {
                    arrayOfArtists.push(response[i].split("(")[0].trim())
                } else {
                    arrayOfArtists.push(response[i])
                }
            }
        }
        return arrayOfArtists
    },

    getTrip : (start, end) => {
        return Promise.all([
            tripData.getGeoData(start),
            tripData.getGeoData(end)
        ])
        .then(res =>{        
        start = res[0]; end = res[1]
        return Promise.all([
            tripData.getClosestCities(start.formattedAddress),
            tripData.getClosestCities(end.formattedAddress),
            tripData.getDistance(start, end)
        ])
        })
    },

}

export default tripData

// let x = "20 Foxtail Pass, Acworth GA 30101"
// let y = "2044 Jefferson St. Memphis, TN"

// getClosestCities(x).then(function (results) { console.log(JSON.stringify(results, null, 2)) })


// tripData.getTripData(x,y)
//     .then(rawData =>{
//         //CONVENIENCE VARIABLES for you to use how you wish.
//         const startData = rawData[0]
//             // to get the artists from the city use startData[index].array
//         const endData = rawData[1]
//             //same with this one endData[index].array
//         const tripLength = rawData[2].tripMinutes

//         //-------------------CONSOLE.LOGS---------------------
//         const printConfirmFor = (array) => {
//             for (let i = 0; i < array.length;i++){
//                 console.log(`
// ... getting ${array[i].array.length} artists from ${array[i].name}...`)
//             }
//         }

//         printConfirmFor(startData)
//         printConfirmFor(endData)

//         console.log("\n... this trip is "+ tripLength + " minutes long\n")
//         // ---------------------------------------------------
        
//     })
