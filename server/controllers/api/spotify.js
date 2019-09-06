const geoArtists = require("./../../lib/geoArtists")
const router = require("express").Router(),
  axios = require("axios");

router.get("/login", (req, res) => {
  console.log("You logged in to Spotify!");
  const scopes = "playlist-modify-private user-read-private user-read-email";
  res.redirect(
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

router.get("/playlist/new/:accessToken", (req, res) => {
  axios({
    url: "https://api.spotify.com/v1/me",
    method: "GET",
    headers: {
      Authorization: "Bearer " + req.params.accessToken
    }
  })
    .then((response1) => {
      const userID = response1.data.id;
      axios({
        url: `https://api.spotify.com/v1/users/${userID}/playlists`,
        method: "POST",
        data: {
          name: "Test Playlist",
          description: "Test Description",
          public: "false"
        },
        headers: {
          Authorization: "Bearer " + req.params.accessToken
        }
      })
        .then((response2) => {
          const newPlaylistID = response2.data.id;
          console.log(response2);
          // populatePlaylistbyArtist(newPlaylistID, req);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/playlist/populate/:accessToken", (req, res) => {});

router.get("/album/:accessToken", (req, res) => getAlbumTrackList(req, res));

router.get("/artist/:accessToken", (req, res) => {
  axios({
    url: `/artist/${req.params.accessToken}`,
    method: "GET"
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
