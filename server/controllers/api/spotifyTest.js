const spot = require("../api/spot.js")

const test = {

    controller : function(startArr, endArr, accessToken){
        return Promise.all([
            grabArtists(6009402,[
                { spotifyID: '1wVEYaqTmGsl3i7np7xQjW'},
                { spotifyID: '2qQLjtrCXMHvWF31LiQbyB'},
                { spotifyID: '1nzDJSsUJBn9uC7LJpY5wC'},
                { spotifyID: '0CdbG1eHVjqjkQsGoH2u1V'},
                { spotifyID: '6jpz8XE6j7M4q5DB5Cce6I'},
                { spotifyID: '4FXXf4RDJ6TIOX11JywHUg'},
                { spotifyID: '6IKq5gnh3GQrnxztypZKZR'},
                { spotifyID: '0lRHJ9PmO1uOD7LUO89KzI'},
                { spotifyID: '3KT4jB978CkSbdqWbLgT1x'},
                { spotifyID: '6gsEOKx8Z0CkVviR9DC3W6'}], accessToken),
            grabArtists(6009402,[{"_id":{"$oid":"5d897daa81ba0d56dff19069"},"artist":"Guerilla Black","spotifyID":"2eTcJVakGgCvZQMnw9Evbn","popularity":36.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff1906a"},"artist":"Greydon Square","spotifyID":"4ew79B4SqevHGtYGR9bY0t","popularity":36.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff1906b"},"artist":"Dem Jointz","spotifyID":"2AUT4fNQ2QC0e2f5pIxOCd","popularity":42.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff1906c"},"artist":"B.G. Knocc Out","spotifyID":"0gwtYWiJ1xK3wfDvkEWwad","popularity":36.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff1906d"},"artist":"CPO Boss Hogg","spotifyID":"5vKNduT1XEQtCsdTPlVPkT","popularity":0.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff1906e"},"artist":"Dr. Dre","spotifyID":"6DPYiyq5kWVQS4RGwxzPC7","popularity":79.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff1906f"},"artist":"Nadine Conner","spotifyID":"3f5YSIVw4Ggkn3r2ygcNvD","popularity":4.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff19070"},"artist":"Big Fase 100","spotifyID":"3bUQeZP9mKBwS8c3Zdturd","popularity":7.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff19071"},"artist":"Coolio","spotifyID":"3y24n3XhZ96wgwRXjvS17T","popularity":66.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff19072"},"artist":"Tha Chill","spotifyID":"7vPLHiyrVGx5OmaSPqJNGw","popularity":24.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff19073"},"artist":"Hot Dollar","spotifyID":"4rfcl5vW46isXf0TUI5lIx","popularity":16.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff19074"},"artist":"2nd II None","spotifyID":"1rlHVdoyfG6pQkzcMWI4dr","popularity":37.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff19075"},"artist":"Ernie C","spotifyID":"1nR2LD5frbLYXkrJiFItKt","popularity":0.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff19076"},"artist":"Dresta","spotifyID":"4kf7SKmUMiNmNvPgV9Uncb","popularity":29.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff19077"},"artist":"MC Ren","spotifyID":"4fbyGOEjViyE97W58eGEgU","popularity":54.0},
            {"_id":{"$oid":"5d897daa81ba0d56dff19078"},"artist":"The Fixxers","spotifyID":"5OoN9Ifb912te3rnAkXISP","popularity":23.0}], accessToken),
        ])
    },

    grabArtists : function(tripTime,arrayOfObjects, accessToken){
        console.log("___________________________________________________:"+ accessToken)
        let totalSongNumber = Math.round(tripTime / 3.5)
        const numberOfSongs = test.getSongsPerArtist(Math.ceil(totalSongNumber / 2), arrayOfObjects.length)
        //database grabbing of artist id's 
        const artistIDs = []
        arrayOfObjects.forEach(object => {
            artistIDs.push(object.spotifyID)
        })
  
        // spot.getTopSongs(numberOfSongs, playlistID, artistIDs, accessToken)
        return spot.getTopSongs(numberOfSongs, artistIDs, accessToken)
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