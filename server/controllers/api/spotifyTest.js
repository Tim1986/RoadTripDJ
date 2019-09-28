const spot = require("../api/spot.js")

const test = {

    controller : function(startArr, endArr, accessToken){
        return Promise.all([
            test.grabArtists(startArr, accessToken),
            test.grabArtists(endArr, accessToken),
        ])
    },

    grabArtists : function(arrayOfObjects, accessToken){
        //database grabbing of artist id's 
        const artistIDs = []
        arrayOfObjects.forEach(object => {
            artistIDs.push(object.spotifyID)
        })
        // spot.getTopSongs(numberOfSongs, playlistID, artistIDs, accessToken)
        return spot.getTopSongs(artistIDs, accessToken)
        // .then(URIs => {console.log(URIs)})

            
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