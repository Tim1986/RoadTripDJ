const wiki = require('wikijs').default;

let arrayOfArtists = []
let arrayOfCategories = []
const gotBrooklyn = false

const getArrayOfArtists = (searchType, location) => {
    if (searchType === "the New York metropolitan area") {
        return
    }
    if (
    searchType === "Musical groups from Brooklyn‎" || 
    searchType === "Rappers from Brooklyn" ||
    searchType === "Rappers from the Bronx"
    ) {
        console.log("later")
        if (arrayOfCategories[0]) {
            recursive(location)
        } else {
            weAreFinished()
        }
    }
    if (
    searchType === "San Francisco Conservatory of Music faculty" || 
    searchType === "Mormon Tabernacle Choir" || 
    searchType === "Choirs in Washington, D.C." || 
    searchType === "Dropkick Murphys" || 
    searchType === "Chicago blues musicians" || 
    searchType === "Old Town School of Folk musicians" || 
    searchType === "Chicago blues ensembles" || 
    searchType === "Detroit hip hop groups" || 
    searchType === "Winans family" || 
    searchType === "Buffalo Springfield" || 
    searchType === "Eagles (band)" || 
    searchType === "The Mamas & the Papas‎" || 
    searchType === "R5 (band)" || 
    searchType === "The Electric Prunes" || 
    searchType === "Thirty Seconds to Mars" || 
    searchType === "Toto (band)" || 
    searchType === "Choirs in Louisville, Kentucky" || 
    searchType === "Choirs in New York City" || 
    searchType === "Orchestras based in New York City" || 
    searchType === "The Strokes" || 
    searchType === "Swans (band)" || 
    searchType === "Talking Heads" || 
    searchType === "Yeah Yeah Yeahs" || 
    searchType === "New York Jazz Quartet members‎" || 
    searchType === "Bloodhound Gang" || 
    searchType === "Ween" || 
    searchType === "Philadelphia International Records artists‎" || 
    searchType === "Musicians from Queens, New York City" || 
    searchType === "Musicians from the Bronx" || 
    searchType === "Musicians from Brooklyn" || 
    searchType === "Musical groups from Queens, New York‎" ||
    searchType === "Rappers from Manhattan"
    ) {
wiki().pagesInCategory(`Category:${searchType}`)
    .then((response) => {
        pushThisPageArtists(response)
        if (response.length > 0) {
            getAdditionalCategories(response, location)
        }
        console.log("=====================")
        console.log(arrayOfArtists.length)
        console.log(arrayOfCategories.length)
        console.log("=====================")
        if (arrayOfCategories[0]) {
            recursive(location)
        } else {
            weAreFinished()
        }
    })
    .catch((error) => { console.log("wiki:" + error) })
}
wiki().pagesInCategory(`Category:${searchType}_from_${location}`)
    .then((response) => {
        pushThisPageArtists(response)
        if (response.length > 0) {
            getAdditionalCategories(response, location)
        }
        console.log("=====================")
        console.log(arrayOfArtists.length)
        console.log(arrayOfCategories)
        console.log("=====================")
        if (arrayOfCategories[0]) {
            recursive(location)
        } else {
            weAreFinished()
        }
    })
    .catch((error) => { console.log("wiki:" + error) })
}

const pushThisPageArtists = (response) => {
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
};

const getAdditionalCategories = (response, location) => {
    console.log("GETTING NEW CATEGORIES")
    for (let i = 1; i < 15; i++) {
        if (response[response.length - i] && response[response.length - i].includes(":") && response[response.length - i].split(":")[0] === "Category") {
            if (location === response[response.length - i].split(":")[1].split("from")[1].trim()) {
                arrayOfCategories.push(response[response.length - i].split(":")[1].split("from")[0].trim())
            } else {
                arrayOfCategories.push(response[response.length - i].split(":")[1])
            }
        } else {
            return
        }
    }
}

const recursive = (location) => {
    let newSearchType = arrayOfCategories[0]
    console.log("newSearchType: " + newSearchType)
    arrayOfCategories.shift();
    console.log("categories length: " + arrayOfCategories.length)
    let newLocation = location
    console.log("artists length: " + arrayOfArtists.length)
    getArrayOfArtists(newSearchType, newLocation)

}
const weAreFinished = () => {
    console.log(arrayOfArtists.length)
    console.log("return the array")
}

// getArrayOfArtists("Musicians", "Seattle")
// getArrayOfArtists("Musicians", "Albany,_New_York") // Musical_groups
// getArrayOfArtists("Musicians", "Baltimore") // Rappers
// getArrayOfArtists("Rappers", "Baltimore")
// getArrayOfArtists("Musicians", "Nashville,_Tennessee") // Singers
// getArrayOfArtists("Musicians", "New_Orleans") // Blues musicians, Jazz musicians, Rappers, Rhythm and blues musicians

// -----------bad cities with sub-categories:
// -----Chicago and Los Angeles and New York City and Philadelphia especially bad because of their size
// getArrayOfArtists("Musicians", "San Francisco")
// getArrayOfArtists("San Francisco Conservatory of Music faculty", "San Francisco")
// getArrayOfArtists("Musicians", "Salt Lake City")
// getArrayOfArtists("Musicians", "Boston")
// getArrayOfArtists("Musicians", "Philadelphia")
// getArrayOfArtists("Musicians", "Detroit")
// getArrayOfArtists("Musicians", "Louisville, Kentucky")
getArrayOfArtists("Musicians", "New York City")
// getArrayOfArtists("Musicians", "Washington, D.C.")