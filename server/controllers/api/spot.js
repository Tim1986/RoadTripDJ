const axios = require("axios");
const PromiseThrottle = require('promise-throttle');
const timer = ms => new Promise(res => setTimeout(res, ms));

const promiseThrottle = new PromiseThrottle({
  requestsPerSecond: 5,
  promiseImplementation: Promise
});

const spot = {
    getTopSongs: (artistIDs, accessToken) => {
      let promises = []
      const spotifyURIs = [] // I moved this global because when it's with the promises, it gets overwritten when the function runs again

      artistIDs.forEach((artistID) => {
            promises.push(
              promiseThrottle.add(() => (axios({
                url: `https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=from_token`,
                method: "GET",
                headers: {
                  Authorization: "Bearer " + accessToken
                }
              })))
              )
      });
      return Promise.all(promises)
            .then(responses => {
              console.log('--Processing responses')

              responses.forEach((response) => {
                let trackNum = response.data.tracks.slice(0, 1)
                trackNum.forEach((track) => {
                  let URI = track.uri
                  spotifyURIs.push(URI)
                  console.log("Artist Names: ", track.artists[0].name);
                  // console.log("Song Names: ", track.name);                  
                })
              })
              console.log(spotifyURIs)
              console.log(spotifyURIs.length)


            }).catch(err => console.log(err))
          
        },
        
        populatePlaylist: (playlistID, spotifyURIs, accessToken, res) => {
          console.log("--Pushing songs to Playlist")
          console.log(spotifyURIs)
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