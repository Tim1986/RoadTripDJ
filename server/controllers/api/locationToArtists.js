const axios = require("axios");
const wiki = require('wikijs').default;
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDj-_Xoa2q3k_8mdhM7xfuh-oHaGhbOIMk',
    Promise: Promise
    });

let arrayOfCategories = []

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
    .catch((error) =>{
        console.log("ERROR | getDistance Query: " + alternating.input +" | " + error)
    })
}

const closestWiki = (staticAddress, addressArray) => {
    let staticObj;
    return getGeoData(staticAddress)
    .then(function (resultObj) {
        staticObj = resultObj
        return geoDataLoop(addressArray)
    })
    .then(function(addressArray){
        const matrixPromises = []
        for (let i = 0; i < addressArray.length; i++){
            matrixPromises.push(getDistance(staticObj,addressArray[i]))
        }
        return Promise.all(matrixPromises)
    })
}

const getClosestCities = address => { 
   return wiki().pagesInCategory("Category:American musicians by city")
        .then((result) => {
            const places = []
            const arrayOfTimPromises = []
            result.forEach(category => {
                let test = category.split(" from ")
                places.push(test[1])
            });
            return closestWiki(address, places)
        })
        .then(function (results) { 
            const sorted = results.filter(x => x !== undefined)
            sorted.sort((a, b) => parseFloat(a.howClose.value) - parseFloat(b.howClose.value))
            const closestCities = sorted.slice(0,5)
            console.table(closestCities)
            //----------------------------------Tim's Calls----------------------------------
            const arrayOfTimPromises = []
            for (let i = 0; i < 5; i++) {
                arrayOfTimPromises.push(getArrayOfArtists("Musicians", closestCities[i].cityName))
            }
            return Promise.all(arrayOfTimPromises)
        })
    .catch((error) => { console.log("closestWiki ERROR:" + error) })
}

const getArrayOfArtists = (searchType, location) => {
    console.log("Finding array of artists for " + location + "...")

    const arrayOfArtists = []
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${searchType}_from_${location}&cmlimit=500&format=json`;
    
    return axios.get(url)
    .then(function (response) {
        pushThisPageArtists(response, arrayOfArtists)
            if (response.data.query.categorymembers[response.data.query.categorymembers.length - 1].title.includes(":")) {
                getAdditionalCategories(response)
            }
            if (arrayOfCategories[0]) {
                recursive(location)
            } else {
                arrayOfCategories.length = 0
                let obj = {
                    name: location,
                    array: []
                }
                obj.array = arrayOfArtists
                // daddyArray.push(obj)
                // console.log("----------------------------------------------------")
                // console.log(daddyArray)
                return obj
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}


const pushThisPageArtists = (response, arrayOfArtists) => {
    for (let i = 0; i < response.data.query.categorymembers.length; i++) {
        if (response.data.query.categorymembers[i].title.split(":")[0] === "Category") {
        } else {
            if (response.data.query.categorymembers[i].title.split("(")) {
                arrayOfArtists.push(response.data.query.categorymembers[i].title.split("(")[0].trim())
            } else {
                arrayOfArtists.push(response.data.query.categorymembers[i].title)
            }
        }
    }
    return arrayOfArtists
};

const getAdditionalCategories = (response) => {
    let lastEntry1 = response.data.query.categorymembers[response.data.query.categorymembers.length - 1].title
    let lastEntry2 = response.data.query.categorymembers[response.data.query.categorymembers.length - 2].title
    let lastEntry3 = response.data.query.categorymembers[response.data.query.categorymembers.length - 3].title
    let lastEntry4 = response.data.query.categorymembers[response.data.query.categorymembers.length - 4].title
    if (lastEntry1.split(":")[0] === "Category") {
        // console.log("lastEntry1 split is a Category")
        arrayOfCategories.push(lastEntry1.split(":")[1].split("from")[0].trim())
        // console.log("lastEntry1 split is pushed")
        if (lastEntry2.includes(":")) {
            // console.log("lastEntry2 includes :")
            if (lastEntry2.split(":")[0] === "Category") {
                // console.log("lastEntry2 split is a Category")
                arrayOfCategories.push(lastEntry2.split(":")[1].split("from")[0].trim())
                // console.log("lastEntry2 split is pushed")
                if (lastEntry3.includes(":")) {
                    // console.log("lastEntry3 includes :")
                    if (lastEntry3.split(":")[0] === "Category") {
                        // console.log("lastEntry3 split is a Category")
                        arrayOfCategories.push(lastEntry3.split(":")[1].split("from")[0].trim())
                        // console.log("lastEntry3 split is pushed")
                        if (lastEntry4.includes(":")) {
                            // console.log("lastEntry4 includes :")
                            if (lastEntry4.split(":")[0] === "Category") {
                                // console.log("lastEntry4 split is a Category")
                                arrayOfCategories.push(lastEntry4.split(":")[1].split("from")[0].trim())
                                // console.log("lastEntry4 split is pushed")
                            }
                        }
                    }
                }
            }
        }
    }
}

const recursive = (location) => {
    let newSearchType = arrayOfCategories[0]
    arrayOfCategories.shift();
    let newLocation = location
    getArrayOfArtists(newSearchType, newLocation)

}

getClosestCities("Albany, NY").then(function(results){console.log(JSON.stringify(results, null, 2))})