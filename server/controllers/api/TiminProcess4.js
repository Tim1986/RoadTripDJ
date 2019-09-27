let test = [
    [
        { artist: 1, spotifyID: 1.5 },
        { artist: 2, spotifyID: 2.5 },
        { artist: 3, spotifyID: 3.5 },
        { artist: 4, spotifyID: 4.5 },
        { artist: 5, spotifyID: 5.5 },
    ],
    [
        { artist: 6, spotifyID: 6.5 },
        { artist: 7, spotifyID: 7.5 },
        { artist: 8, spotifyID: 8.5 },
    ],
    [
        { artist: 9, spotifyID: 9.5 },
        { artist: 10, spotifyID: 10.5 },
        { artist: 11, spotifyID: 11.5 },
        { artist: 12, spotifyID: 12.5 },
        { artist: 13, spotifyID: 13.5 },
        { artist: 14, spotifyID: 14.5 },
        { artist: 15, spotifyID: 15.5 },
        { artist: 16, spotifyID: 16.5 },
    ],
    [
        { artist: 17, spotifyID: 17.5 },
        { artist: 18, spotifyID: 18.5 },
        { artist: 19, spotifyID: 19.5 },
        { artist: 20, spotifyID: 20.5 },
        { artist: 21, spotifyID: 21.5 },
        { artist: 22, spotifyID: 22.5 },
        { artist: 23, spotifyID: 23.5 },
        { artist: 24, spotifyID: 24.5 },
        { artist: 25, spotifyID: 25.5 },
        { artist: 26, spotifyID: 26.5 },
        { artist: 27, spotifyID: 27.5 },
        { artist: 28, spotifyID: 28.5 },
        { artist: 29, spotifyID: 29.5 },
        { artist: 30, spotifyID: 30.5 },
    ],
    [{ artist: 31, spotifyID: 31.5 },]
]

// const birminghamALArtists = require("./birminghamalabama")
// const anchorageALArtists = require("./anchoragealaska")
// const riversideCAArtists = require("./riversidecalifornia")
// const richmondCAArtists = require("./richmondcalifornia")
// const comptonCAArtists = require("./comptoncalifornia")

// let test = [anchorageALArtists, birminghamALArtists, riversideCAArtists, richmondCAArtists, comptonCAArtists]

const pickTwenty = array => {
    const justTwenty = []
    searchCity(array, justTwenty, 0)
    if (justTwenty.length < 20) {
        searchCity(array, justTwenty, 1)
    }
    if (justTwenty.length < 20) {
        searchCity(array, justTwenty, 2)
    }
    if (justTwenty.length < 20) {
        searchCity(array, justTwenty, 3)
    }
    if (justTwenty.length < 20) {
        searchCity(array, justTwenty, 4)
    }
    return justTwenty
}

const searchCity = (array, justTwenty, city) => {
    let songsLeft = 20 - justTwenty.length
    if (array[city].length >= songsLeft) {
        // randomly push 20 from this array into justTwenty
        return getRandom(array, justTwenty, city)
    } else {
        for (let i = 0; i < array[city].length; i++) {
            // console.log(array[city][i])
            let obj = {
                name: array[city][i].artist,
                spotifyID: array[city][i].spotifyID
            }
            justTwenty.push(obj)
        }
    }
}

const getRandom = (array, justTwenty, city) => {
    let usedRandomNumbers = []
    while (justTwenty.length < 20) {
        let randomNum = Math.floor(Math.random() * array[city].length)
        // console.log("randomNum is: " + randomNum)
        if (!usedRandomNumbers.includes(randomNum)) {
            let obj = {
                name: array[city][randomNum].artist,
                spotifyID: array[city][randomNum].spotifyID
            }
            justTwenty.push(obj)
            usedRandomNumbers.push(randomNum)
            // console.log(usedRandomNumbers)
        }
    }
    return justTwenty
}

let finalArray = pickTwenty(test)
console.log(finalArray)
console.log(finalArray.length)
