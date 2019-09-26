const spot = require("../api/spot.js")

const test = {

    controller : function(startArr, endArr, accessToken){
        return Promise.all([
            test.grabArtists(6009402,startArr, accessToken),
            test.grabArtists(6009402,endArr, accessToken),
        ])
    },

    grabArtists : function(tripTime,arrayOfObjects, accessToken){
        let totalSongNumber = Math.round(tripTime / 3.5)
        const numberOfSongs = test.getSongsPerArtist(Math.ceil(totalSongNumber / 2), arrayOfObjects.length)
        //database grabbing of artist id's 
        const artistIDs = []
        arrayOfObjects.forEach(object => {
            artistIDs.push(object.spotifyID)
        })
  
        // spot.getTopSongs(numberOfSongs, playlistID, artistIDs, accessToken)
        return spot.getTopSongs(totalSongNumber, numberOfSongs, artistIDs, accessToken)
        // .then(URIs => {console.log(URIs)})

            
    },
    getSongsPerArtist: function(songNumber, artistNumberFirstGroup){

        if (Math.ceil(songNumber / artistNumberFirstGroup) >= 3) {
            return 3;
        } else if (Math.ceil(songNumber / artistNumberFirstGroup) <= 1) {
            return 1;
        } else {
            return 2;
        }
    },

}

module.exports = test






// getTracksForArtists: (songs, total, indexStart, perArtist, playlistID, artistIDs, accessToken) => {
//     if (total <= 0) return;

//     return spot.getTopSongs(perArtist, playlistID, artistIDs[indexStart], accessToken)
//         .then(returnedIDs => {
//             songs.push(returnedIDs)
//             total = total - returnedIDs.length;
//             indexStart = indexStart + 1

            
//             return timer(100);
//         })
//         .then(() => {
//             return algorithm.getTracksForArtists(songs, total, indexStart, perArtist, playlistID, artistIDs, accessToken)
//         })
// },