
const wiki = require('wikijs').default;
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLEAPI,
    Promise: Promise
});

const Spotify = require('node-spotify-api');
const spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET,
});

const geoArtists = {
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
            geoPromises.push(geoArtists.getGeoData(array[i]))
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
                console.log("\nERROR | getDistance Query: " + alternating.input + " | " + error)
            })
    },

    closestWiki : (staticAddress, addressArray) => {
        let staticObj;
        return geoArtists.getGeoData(staticAddress)
            .then(function (resultObj) {
                staticObj = resultObj
                return geoArtists.geoDataLoop(addressArray)
            })
            .then(function (addressArray) {
                const matrixPromises = []
                for (let i = 0; i < addressArray.length; i++) {
                    matrixPromises.push(geoArtists.getDistance(staticObj, addressArray[i]))
                }
                return Promise.all(matrixPromises)
            })
            .catch(err => console.log("\nClosestWiki ERROR (getGeoData, geoDataLoop, getDistance): " + err))
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
                return geoArtists.closestWiki(address, places)
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
                    vows.push(geoArtists.getArrayOfArtists(firstArg, closestCities[i].cityName, arrayOfArtists, arrayOfCategories, arrayOfTotalCategories))
                    // getArrayOfArtists() on Line 51
                }

                // waits until each result is recieved and returns them all at once as the result of this function
                return Promise.all(vows)
            })
            .catch((error) => { console.log("\nGetClosestCities ERROR:" + error + "\n") })
    },

    getArrayOfArtists : (searchType, originalLocation, arrayOfArtists, arrayOfCategories, arrayOfTotalCategories) => {
        console.log("Finding array of artists for " + searchType + "...")

        return wiki().pagesInCategory(`Category:${searchType}`)
            .then((response) => {
                geoArtists.pushThisPageArtists(response, arrayOfArtists)
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
                    return geoArtists.getArrayOfArtists(newSearchType, originalLocation, arrayOfArtists, arrayOfCategories, arrayOfTotalCategories)
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
            .catch((error) => { console.log("\nGet array of Artists: " + error) })
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
        // return Promise.all([
        //     geoArtists.getGeoData(start),
        //     geoArtists.getGeoData(end)
        // ])
        // .then(res =>{        
        return Promise.all([
            geoArtists.getClosestCities(start.formattedAddress),
            geoArtists.getClosestCities(end.formattedAddress),
            geoArtists.getDistance(start, end)
        ])
    },
    



    getSpotifyGenres : (artist) => {
        return spotify.search({ type: 'artist', query: artist })
        .then(data =>{
            if (data && data.artists.items.length > 0) {
                return newObj = {
                        artist: artist,
                        id: data.artists.items[0].id,
                        popularity: data.artists.items[0].popularity
                    }
            }}
        )
        .catch(err => {
            return undefined
        })
    },

    getSpotifyForArray : (array, isPopular) => {
        const vows = []
        // console.log(array)
        for (let i = 0; i < array.length; i++){
            vows.push(geoArtists.getSpotifyGenres(array[i]))
        }
        return Promise.all(vows)
        .then(res => res.filter(resolved => 
            resolved !== undefined))
        .then(filtered => {
            if (isPopular) {
            return filtered.sort((a,b) => parseFloat(b.popularity) - parseFloat(a.popularity))
            } else {
            return filtered.sort((a,b) => parseFloat(a.popularity) - parseFloat(b.popularity))
            
            }
        })
        .catch(err => console.log("\ngetSpotifyForArray Error: " + err))
    },



    getStage1 : (array1, array2, isPopular) =>{
        return Promise.all([
            geoArtists.getSpotifyForArray(array1, isPopular),
            geoArtists.getSpotifyForArray(array2, isPopular),
        ])
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


    wrap : (start, end, isPopular) => {
        let tripLength; 
        geoArtists.getTrip(start, end)
            .then(rawData =>{
                //CONVENIENCE VARIABLES for you to use how you wish.
                // to get the artists from the city use startData[index].array
                //same with this one endData[index].array
                const startData = rawData[0]
                const endData = rawData[1]
                tripLength = rawData[2].tripMinutes

                return geoArtists.getStage1(startData[0].array, endData[0].array, isPopular) //gets the CLOSEST cities artists for both start and end cities
            })
            .then(result => {
                
                const startArr = result[0]
                const endArr = result[1]
                let totalSongNumber = Math.round(tripLength / 3.5)
                const startSongNum = geoArtists.getSongsPerArtist(Math.ceil(totalSongNumber/2) , startArr.length)
                const endSongNum = geoArtists.getSongsPerArtist(Math.floor(totalSongNumber/2), endArr.length)

                console.log(result)
                // console.log(endArr)
                console.log(startSongNum)
                console.log(endSongNum)
                // return Promise.all([
                //     res,
                //     startSongNum, endSongNum
                // ])
                return result
        })
    },
}

let x = "20 Foxtail Pass, Acworth GA 30101"
let y = "2044 Jefferson St. Memphis, TN"
        
module.exports = geoArtists

// geoArtists.wrap(x,y, true).then(result => console.log(result))