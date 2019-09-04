const wiki = require('wikijs').default;


const getArrayOfArtists = (searchType) => {
    console.log("Finding array of artists for " + searchType + "...")
    const arrayOfArtists = []
    let arrayOfCategories = []
    let arrayOfTotalCategories = []


    if (searchType === "Musicians from the New York metropolitan area") {
        return
    }
    return wiki().pagesInCategory(`Category:${searchType}`)
        .then((response) => {
            pushThisPageArtists(response)
            if (response.length > 0) {
                getAdditionalCategories(response)
            }
            if (arrayOfCategories[0]) {
                recursive()
            } else {
                weAreFinished()
            }
        })
        .catch((error) => { console.log("wiki:" + error) })
}





const location = "Philadelphia"
getArrayOfArtists("Musicians from " + location)
