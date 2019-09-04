const axios = require("axios");
const wiki = require('wikijs').default;

let arrayOfArtists = []
let arrayOfCategories = []

const getArrayOfArtists = (searchType, location) => {
    if (searchType === "the New York metropolitan area") {
        return
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
    searchType === "Philadelphia International Records artists‎"
    ) {
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${searchType}&cmlimit=500&format=json`;
        axios.get(url).then(
            function (response) {
                pushThisPageArtists(response)
                if (response.data.query.categorymembers.length > 0) {
                    getAdditionalCategories(response)
                }
                if (arrayOfCategories[0]) {
                    recursive(location)
                } else {
                    weAreFinished()
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
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${searchType}_from_${location}&cmlimit=500&format=json`;
    axios.get(url).then(
        function (response) {
            pushThisPageArtists(response)
            if (response.data.query.categorymembers.length > 0) {
                getAdditionalCategories(response)
            }
            if (arrayOfCategories[0]) {
                recursive(location)
            } else {
                weAreFinished()
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
};

const pushThisPageArtists = (response) => {
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
};

const getAdditionalCategories = (response) => {
    console.log("GETTING NEW CATEGORIES")
    let members = response.data.query.categorymembers
    for (let i = 1; i < 15; i++) {
        if (members[members.length - i].title && members[members.length - i].title.includes(":") && members[members.length - i].title.split(":")[0] === "Category") {
            arrayOfCategories.push(members[members.length - i].title.split(":")[1].split("from")[0].trim())
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
// getArrayOfArtists("Musicians", "Chicago")
// getArrayOfArtists("Musicians", "Detroit")
// getArrayOfArtists("Musicians", "Louisville, Kentucky")
// getArrayOfArtists("Musicians", "New York City")
// getArrayOfArtists("Musicians", "Washington, D.C.")