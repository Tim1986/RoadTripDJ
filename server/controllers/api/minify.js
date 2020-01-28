const minify = {
  correctNumberOfSongs : function(array, tripTime) {
    return new Promise(function(resolve, reject) {
      const finalArray = [];
      const totalSongNumber = Math.round(tripTime / 3.5);
      const halfSongNumber = Math.round(totalSongNumber / 2);
      console.log('halfSongNumber: ' + halfSongNumber);
      minify.searchCity(array, finalArray, halfSongNumber, 0);
      console.log(finalArray.length);
      if (finalArray.length < halfSongNumber && finalArray.length < 50) {
        minify.searchCity(array, finalArray, halfSongNumber, 1);
      }
      console.log(finalArray.length);
      if (finalArray.length < halfSongNumber && finalArray.length < 50) {
        minify.searchCity(array, finalArray, halfSongNumber, 2);
      }
      console.log(finalArray.length);
      if (finalArray.length < halfSongNumber && finalArray.length < 50) {
        minify.searchCity(array, finalArray, halfSongNumber, 3);
      }
      console.log(finalArray.length);
      if (finalArray.length < halfSongNumber && finalArray.length < 50) {
        minify.searchCity(array, finalArray, halfSongNumber, 4);
      }
      console.log(finalArray.length);
      if (finalArray.length > 50) {
        finalArray.length = 50;
      }
      console.log('finalArray.length: ' + finalArray.length);
      // return finalArray
      resolve(finalArray);
    });
  },

  searchCity           : function(array, finalArray, halfSongNumber, city) {
    return new Promise(function(resolve, reject) {
      let songsLeft = halfSongNumber - finalArray.length;
      if (array[city].length >= songsLeft) {
        resolve(minify.getRandom(array, finalArray, halfSongNumber, city));
      } else {
        for (let i = 0; i < array[city].length; i++) {
          let obj = {
            name      : array[city][i].name,
            spotifyID : array[city][i].spotifyID
          };
          finalArray.push(obj);
        }
      }
    });
  },

  getRandom            : function(array, finalArray, halfSongNumber, city) {
    let usedRandomNumbers = [];
    while (finalArray.length < halfSongNumber) {
      let randomNum = Math.floor(Math.random() * array[city].length);
      if (!usedRandomNumbers.includes(randomNum)) {
        let obj = {
          name      : array[city][randomNum].name,
          spotifyID : array[city][randomNum].spotifyID
        };
        finalArray.push(obj);
        usedRandomNumbers.push(randomNum);
      }
    }
    return finalArray;
  }
};

module.exports = minify;

// let finalArray = correctNumberOfSongs(test, 100)
// console.log(finalArray)
// console.log(finalArray.length)
// // console.log(test2[0].length)
// // console.log(test2[1].length)
// // console.log(test2[2].length)
// // console.log(test2[3].length)
// // console.log(test2[4].length)
