const geoArtists = require("./../../lib/algorithm")
const router = require("express").Router(),
  axios = require("axios");

//=================================================
// Functions
//=================================================

const getTopSongs = (songNum, playlistID, artistIDs, accessToken, res) => {
  let spotifyURIs = []
  artistIDs.forEach((artistID) => {
    axios({
      url: `https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=from_token`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
      .then((response) => {
        response.data.tracks.forEach((track) => {
          console.log(track)
          // console.log("Artist Names: ", track.artists);
          // console.log("Song Names: ", track.name);
          // // console.log(track);
          //push desired tracks into spotifyURIs array
        });
      })
      .catch((err) => console.log(err));
  });
  // populatePlaylist(playlistID, accessToken, res);
  // populatePlaylist(playlistID, spotifyURIs, accessToken, res)
};

// const populatePlaylist = (playlistID, spotifyURIs, accessToken) => {
const populatePlaylist = (playlistID, accessToken, res) => {
  axios({
    url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
    method: "POST",
    data: {
      uris: [
        "spotify:track:6qnM0XXPZOINWA778uNqQ9",
        "spotify:track:06WgOCf0LV2h4keYXDRnuh"
      ]
      // uris: spotifyURIs
    },
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json"
    }
  })
    .then(() => res.sendStatus(200).end())
    .catch((err) => console.log(err));
};

const tracks = (req) => {
  
        playlistName = start.formattedAddress + " to " + end.formattedAddress,
        userID = req.params.userID,
        accessToken = req.params.accessToken
        
  
  
}

//=================================================
// Routes
//=================================================

router.get("/login", (req, res) => {
  console.log("You logged in to Spotify!");
  const scopes = "playlist-modify-private user-read-private user-read-email";
  res.json(
    "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      process.env.SPOTIFY_ID +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent(process.env.REDIRECT_URI)
  );
});

router.get("/exchangeToken/:authCode", (req, res) => {
  axios({
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    params: {
      grant_type: "authorization_code",
      code: req.params.authCode,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.SPOTIFY_ID,
      client_secret: process.env.SPOTIFY_SECRET
    }
  })
    .then((response) => res.json(response.data))
    .catch((err) => console.log(err));
});

router.get("/user/:accessToken", (req, res) => {
  axios({
    url: "https://api.spotify.com/v1/me",
    method: "GET",
    headers: {
      Authorization: "Bearer " + req.params.accessToken
    }
  })
    .then((response) => res.json(response.data))
    .catch((err) => console.log(err));
});

router.post("/playlist/new/:userID/:accessToken", (req, res) => {
  const start = req.body.startPoint,
        end = req.body.endPoint,
        isPopular = req.body.isPopular
  return algorithm.step1(start, end)
  
  .then( results => { 
    console.log(results)
  })  
  .catch((err) => console.log(err));
});

router.get("/artist/:accessToken", (req, res) => {
  axios({
    url: `/artist/${req.params.accessToken}`,
    method: "GET"
  })
    .then((response) => {
      // console.log(response);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
