const axios = require("axios");
const spot = {
    getTopSongs: (songNum, playlistID, artistIDs, accessToken) => {
        let spotifyURIs = []
        let promises = []
      
        artistIDs.forEach((artistID) => {
          promises.push(axios({
            url: `https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=from_token`,
            method: "GET",
            headers: {
              Authorization: "Bearer " + accessToken
            }
          }))
        });
      
        return Promise.all(promises)
          .then((responses) => {
            responses.forEach((response) => {
              let trackNum = response.data.tracks.slice(0, songNum)
              trackNum.forEach((track) => {
                // console.log(track)
                let URI = track.uri
                spotifyURIs.push(URI)
                // console.log("Artist Names: ", track.artists);
                // console.log("Song Names: ", track.name);
                // // console.log(track);
                //push desired tracks into spotifyURIs array
        
              })
            })
            
            return spotifyURIs
          })
          .catch((err) => console.log(err));
      },
        
        // const populatePlaylist = (playlistID, spotifyURIs, accessToken) => {
        populatePlaylist : (playlistID, spotifyURIs, accessToken, res) => {
          axios({
            url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
            method: "POST",
            data: {
            //   uris: [
            //     "spotify:track:6qnM0XXPZOINWA778uNqQ9",
            //     "spotify:track:06WgOCf0LV2h4keYXDRnuh"
            //   ]
              uris: spotifyURIs
            },
            headers: {
              Authorization: "Bearer " + accessToken,
              "Content-Type": "application/json"
            }
          })
            .then(() => res.json(playlistID))
            .catch((err) => console.log(err));
          }
        
        }
module.exports = spot;
