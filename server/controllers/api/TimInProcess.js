const wiki = require('wikijs').default;

let arrayOfArtists = []
let arrayOfCategories = []
let arrayOfTotalCategories = []
const gotBrooklyn = false

const getArrayOfArtists = (searchType) => {
    if (searchType === "Musicians from the New York metropolitan area") {
        return
    }
    if (
        searchType === "Musical groups from Brooklyn‎" ||
        searchType === "Rappers from Brooklyn" ||
        searchType === "Rappers from the Bronx"
    ) {
        console.log("later")
        if (arrayOfCategories[0]) {
            recursive()
        } else {
            weAreFinished()
        }
    }
    wiki().pagesInCategory(`Category:${searchType}`)
        .then((response) => {
            pushThisPageArtists(response)
            if (response.length > 0) {
                getAdditionalCategories(response)
            }
            console.log("=====================")
            console.log(arrayOfArtists.length)
            console.log(arrayOfCategories.length)
            console.log("=====================")
            if (arrayOfCategories[0]) {
                recursive()
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

const getAdditionalCategories = (response) => {
    for (let i = 1; i < 15; i++) {
        if (response[response.length - i] && response[response.length - i].includes(":") && response[response.length - i].split(":")[0] === "Category") {
            if (arrayOfTotalCategories.includes(response[response.length - i].split(":")[1]) || response[response.length - i].split(":")[1].includes("albums") || response[response.length - i].split(":")[1].includes("songs")) {
                return
            }
            arrayOfCategories.push(response[response.length - i].split(":")[1])
            arrayOfTotalCategories.push(response[response.length - i].split(":")[1])
        } else {
            return
        }
    }
}

const recursive = () => {
    let newSearchType = arrayOfCategories[0]
    console.log("newSearchType: " + newSearchType)
    arrayOfCategories.shift();
    console.log("categories length: " + arrayOfCategories.length)
    console.log("artists length: " + arrayOfArtists.length)
    getArrayOfArtists(newSearchType)

}
const weAreFinished = () => {
    console.log("**************************")
    console.log(arrayOfTotalCategories)
    arrayOfTotalCategories.length = 0
    console.log(arrayOfArtists.length)
    console.log("return the array")
}

const location = "Philadelphia"
getArrayOfArtists("Musicians from " + location)
