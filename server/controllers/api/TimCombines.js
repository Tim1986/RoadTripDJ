const wiki = require('wikijs').default;
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDj-_Xoa2q3k_8mdhM7xfuh-oHaGhbOIMk',
    Promise: Promise
});

const getGeoData = address => {
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
}

const geoDataLoop = (array) => {
    const geoPromises = [];
    for (let i = 3; i < array.length; i++) { //Had to change this to 3 to avoid undefined wiki
        geoPromises.push(getGeoData(array[i]))
    }
    return Promise.all(geoPromises)
}

const getDistance = (static, alternating) => {
    return googleMapsClient.distanceMatrix({ origins: static.latLng, destinations: alternating.latLng, mode: 'driving' })
        .asPromise()
        .then((response) => {
            let resultObj = {
                cityName: alternating.input,
                from: static.input,
                howClose: {
                    value: response.json.rows[0].elements[0].distance.value,
                    unitString: response.json.rows[0].elements[0].distance.text
                }
            }
            return resultObj
        })
        .catch((error) => {
            console.log("ERROR | getDistance Query: " + alternating.input + " | " + error)
        })
}

const closestWiki = (staticAddress, addressArray) => {
    let staticObj;
    return getGeoData(staticAddress)
        .then(function (resultObj) {
            staticObj = resultObj
            return geoDataLoop(addressArray)
        })
        .then(function (addressArray) {
            const matrixPromises = []
            for (let i = 0; i < addressArray.length; i++) {
                matrixPromises.push(getDistance(staticObj, addressArray[i]))
            }
            return Promise.all(matrixPromises)
        })
}

const getClosestCities = address => {
    return wiki().pagesInCategory("Category:American musicians by city")
        .then((result) => {
            const places = []
            result.forEach(category => {
                let test = category.split(" from ")
                places.push(test[1])
            });
            return closestWiki(address, places)
        })
        .then(function (results) {
            const sorted = results.filter(x => x !== undefined)
            sorted.sort((a, b) => parseFloat(a.howClose.value) - parseFloat(b.howClose.value))
            const closestCities = sorted.slice(0, 5)
            console.table(closestCities)
            //----------------------------------Tim's Calls----------------------------------
            const arrayOfTimPromises = []
            for (let i = 0; i < 5; i++) {
                let firstArg = `Musicians from ${closestCities[i].cityName}`
                const arrayOfArtists = []
                let arrayOfCategories = []
                let arrayOfTotalCategories = []            
                arrayOfTimPromises.push(getArrayOfArtists(firstArg, closestCities[i].cityName, arrayOfArtists, arrayOfCategories, arrayOfTotalCategories))
            }
            return Promise.all(arrayOfTimPromises)
        })
        .catch((error) => { console.log("closestWiki ERROR:" + error) })
}

const getArrayOfArtists = (searchType, originalLocation, arrayOfArtists, arrayOfCategories, arrayOfTotalCategories) => {
    console.log("Finding array of artists for " + searchType + "...")

    return wiki().pagesInCategory(`Category:${searchType}`)
        .then((response) => {
            pushThisPageArtists(response, arrayOfArtists)
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
                return getArrayOfArtists(newSearchType, originalLocation, arrayOfArtists, arrayOfCategories, arrayOfTotalCategories)
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
}

const pushThisPageArtists = (response, arrayOfArtists) => {
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
}

getClosestCities("20 Foxtail Pass, Acworth GA 30101").then(function (results) { console.log(JSON.stringify(results, null, 2)) })