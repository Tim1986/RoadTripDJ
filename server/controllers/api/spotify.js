const algorithm = require("./../../lib/algorithm")
const spot = require("./spot.js")
const router = require("express").Router(),
  axios = require("axios");


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
  console.log(req.body)
  const start = req.body.startPoint,
        end = req.body.endPoint,
        isPopular = req.body.isPopular,
    //  const start = "test",
    //     end = "test",
    //     isPopular = false,
        userID = req.params.userID,
        accessToken = req.params.accessToken,
        playlistName = start + " to " + end
  
  const axiosPromise = axios({
        url: `https://api.spotify.com/v1/users/${userID}/playlists`,
        method: "POST",
        data: {
        name: playlistName,
        description: "A playlist for your trip from " + playlistName + ".",
        public: "false"
      },
        headers: {
        Authorization: "Bearer " + accessToken
      }
      })
    return Promise.all([
      start,
      end,
      isPopular,
      axiosPromise
    ])
    
    .then(result => {
    const start = result[0],
            end = result[1],
            isPopular = result[2],
            newPlaylistID = result[3].data.id
    return algorithm.tracks(start, end, isPopular, userID, accessToken, newPlaylistID)
    })
    .then( results => { 
      console.log(results)
      spot.populatePlaylist(results[3], results[0], results[2], res)
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