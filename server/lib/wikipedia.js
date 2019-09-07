const wiki = require('wikijs').default;

const wikipedia = {

    musicCities : () => {
        return wiki().pagesInCategory("Category:American musicians by city")
            .then((wikiList) => {
                console.log('-Wikipedia category data recieved.')
                const places = []
                wikiList.forEach(category => {
                    let location = category.split(" from ")
                    places.push(location[1])
                });
                const fixPlaces = places.slice(3) //this slices of the nonplace returning
                const noHonolulu = fixPlaces.filter(item => item !== "Honolulu") //Who takes a roadtrip to Hawaii? 
                return noHonolulu
            })
        },
    
    getArrayOfArtistsLoop : (arrayOfCities) => {
        const arrayOfArtists = [],
              arrayOfTotalCategories =[],
              arrayOfCategories = []
        
        const vows = [];
        for (let i = 0; i < arrayOfCities.length; i++) {
             let searchType = `Musicians from ${arrayOfCities[i].to}`
             vows.push(wikipedia.getArrayOfArtists(searchType, arrayOfCities[i].to, arrayOfArtists, arrayOfCategories, arrayOfTotalCategories))
        }

        return Promise.all(vows)
    },

    getArrayOfArtists : (searchType, originalLocation, arrayOfArtists, arrayOfCategories, arrayOfTotalCategories) => {
        return wiki().pagesInCategory(`Category:${searchType}`)
        .then((response) => {
            console.log(searchType + "...")
                wikipedia.pushThisPageArtists(response, arrayOfArtists)
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
                if (arrayOfCategories[0]) {
                    let newSearchType = arrayOfCategories[0]
                    arrayOfCategories.shift();
                    return wikipedia.getArrayOfArtists(newSearchType, originalLocation, arrayOfArtists, arrayOfCategories, arrayOfTotalCategories)
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
            .catch((error) => { console.log("\nWIKI: Get array of Artists: " + error) })
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
}

module.exports = wikipedia