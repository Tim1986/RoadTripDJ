const spot = require("../api/spot.js")

const test = {

    controller : function(startArr, endArr, accessToken){
        return Promise.all([
            grabArtists()
        ])
    },

    grabArtists : function(tripTime,arrayOfObjects, accessToken){
        console.log("___________________________________________________:"+ accessToken)
        let totalSongNumber = Math.round(tripTime / 3.5)
        const numberOfSongs = test.getSongsPerArtist(Math.ceil(totalSongNumber / 2), arrayOfObjects.length)
        //database grabbing of artist id's 

        const artistIDs = [ 
            '1wVEYaqTmGsl3i7np7xQjW',
            '2qQLjtrCXMHvWF31LiQbyB',
            '1nzDJSsUJBn9uC7LJpY5wC',
            '0CdbG1eHVjqjkQsGoH2u1V',
            '6jpz8XE6j7M4q5DB5Cce6I',
            '4FXXf4RDJ6TIOX11JywHUg',
            '6IKq5gnh3GQrnxztypZKZR',
            '0lRHJ9PmO1uOD7LUO89KzI',
            '3KT4jB978CkSbdqWbLgT1x',
            '6gsEOKx8Z0CkVviR9DC3W6']
        // spot.getTopSongs(numberOfSongs, playlistID, artistIDs, accessToken)
        spot.getTopSongs(numberOfSongs, artistIDs, accessToken)
        .then(URIs => {console.log(URIs)})

            
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