
const minify = {
    correctNumberOfSongs : function (array, tripTime) {
        return new Promise(function(resolve,reject){
            const finalArray = []
            const totalSongNumber = Math.round(tripTime / 3.5)
            const halfSongNumber = Math.round(totalSongNumber / 2)
            console.log("halfSongNumber: " + halfSongNumber)
            console.log(array[4][0].spotifyID)
            minify.searchCity(array, finalArray, halfSongNumber, 0)
            if (finalArray.length < halfSongNumber) {
                minify.searchCity(array, finalArray, halfSongNumber, 1)
            }
            if (finalArray.length < halfSongNumber) {
                minify.searchCity(array, finalArray, halfSongNumber, 2)
            }
            if (finalArray.length < halfSongNumber) {
                minify.searchCity(array, finalArray, halfSongNumber, 3)
            }
            if (finalArray.length < halfSongNumber) {
                minify.searchCity(array, finalArray, halfSongNumber, 4)
            }
            // console.log(finalArray)
            resolve(finalArray)
            // return finalArray
        })
    },

    searchCity : function (array, finalArray, halfSongNumber, city) {
        return new Promise(function(resolve, reject){
            let songsLeft = halfSongNumber - finalArray.length
            if (array[city].length >= songsLeft) {
                // randomly push 20 from this array into finalArray
                resolve( minify.getRandom(array, finalArray, halfSongNumber, city))
            } else {
                for (let i = 0; i < array[city].length; i++) {
                    // console.log(array[city][i])
                    let obj = {
                        name: array[city][i].name,
                        spotifyID: array[city][i].spotifyID
                    }
                    finalArray.push(obj)
                }
            }
        })
    },

    getRandom : function (array, finalArray, halfSongNumber, city) {
        let usedRandomNumbers = []
        while (finalArray.length < halfSongNumber) {
            let randomNum = Math.floor(Math.random() * array[city].length)
            // console.log("randomNum is: " + randomNum)
            if (!usedRandomNumbers.includes(randomNum)) {
                let obj = {
                    name: array[city][randomNum].name,
                    spotifyID: array[city][randomNum].spotifyID
                }
                finalArray.push(obj)
                usedRandomNumbers.push(randomNum)
                // console.log(usedRandomNumbers)
            }
        }
        return finalArray
    }
}


module.exports = minify

// let finalArray = correctNumberOfSongs(test, 100)
// console.log(finalArray)
// console.log(finalArray.length)
// // console.log(test2[0].length)
// // console.log(test2[1].length)
// // console.log(test2[2].length)
// // console.log(test2[3].length)
// // console.log(test2[4].length)