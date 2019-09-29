const router = require("express").Router(),
  axios = require("axios"),
  spotifyTest = require("../api/spotifyTest.js"),
  algorithm = require("../../lib/redo.js"),
  spot = require("../api/spot");



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
  const startPoint = req.body.startPoint
  const endPoint = req.body.endPoint
  const playlistName = startPoint + " to " + endPoint
  const isPopular = req.body.isPopular
  
  const userID = req.params.userID,
    accessToken = req.params.accessToken;
    
  axios({
    url: `https://api.spotify.com/v1/users/${userID}/playlists`,
    method: "POST",
    data: {
      name: playlistName,
      description: `A playlist for your trip from ${startPoint} to ${endPoint}.`,
      public: "false"
    },
    headers: {
      Authorization: "Bearer " + accessToken
    }
  })
    .then((response2) => {
      const newPlaylistID = response2.data.id;
      return algorithm.tracks(startPoint, endPoint, isPopular, userID, accessToken, newPlaylistID)
    })
    .then( results => { 
      console.log("this is the final link---------------------------------------------------------------------------------------------------------------------")
      console.log("RESULTS: ", results)
      return spot.populatePlaylist(results[2], results[0], results[1], res)
      //this is the send to the front-end end

    })  
    .catch((err) => console.log(err));
})
  



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

//=================================================
// Functions in spot.js
//=================================================

module.exports = router;