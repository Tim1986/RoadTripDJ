const axios = require("axios");
const PromiseThrottle = require('promise-throttle');
const timer = ms => new Promise(res => setTimeout(res, ms));

const promiseThrottle = new PromiseThrottle({
  requestsPerSecond: 3,
  promiseImplementation: Promise
});

const spot = {
    getTopSongs: (totalNum, songNum, artistIDs, accessToken) => {
      const spotifyURIs = []
      let promises = []

      artistIDs.forEach((artistID) => {
        console.log("--finding songs for " + artistID)
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
                let trackNum = response.data.tracks.slice(0, songNum)
                trackNum.forEach((track) => {
                  let URI = track.uri
                  spotifyURIs.push(URI)
                  console.log("Artist Names: ", track.artists);
                  console.log("Song Names: ", track.name);
                  // // console.log(track);
                  //push desired tracks into spotifyURIs array
                  
                })
                // let startIndex = 0 
                // let endIndex = songNum
                // spot.parseResults(startIndex, endIndex, response)
              })
              // const uriLength = spotifyURIs.length
              // if (uriLength >= totalNum) {
              //   return spotifyURIs
              // } else {
              //   startIndex = endIndex + 1
              //   endIndex = endIndex + 2
              //   spot.parseResults(spotifyURIs, startIndex, endIndex, response)
              // }

              const uriLength = spotifyURIs.length
              if (uriLength >= totalNum) {
                return spotifyURIs
              } else { 
              let newTracks = response.data.tracks.slice(songNum, songNum + 1)
              // push this shit to the uri array

              }
              let newTracks = response.data.tracks.slice(songNum + 1, songNum + 2)
              // push this shit to the uri array
              if (uriLength >= totalNum) {
                return spotifyURIs
              }



            }).catch(err => console.log(err))
        
          
        },
        
        parseResults : function (spotifyURIs, startIndex, endIndex, response) {
          let grabbedTracks = response.data.tracks.slice(startIndex, endIndex)
          grabbedTracks.forEach((track) => {
            let URI = track.uri
            spotifyURIs.push(URI)
          })
        },

        populatePlaylist: (playlistID, spotifyURIs, accessToken, res) => {
          console.log("--Pushing songs to Playlist")
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