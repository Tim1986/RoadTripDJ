const router = require("express").Router(),
  axios = require("axios");
  spotifyTest = require("../api/spotifyTest.js")

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

router.get("/playlist/new/:userID/:accessToken", (req, res) => {
  console.log(req.body)
  const startPoint = req.body.startPoint
  const endPoint = req.body.endPoint
  const playlistName = startPoint + " to " + endPoint
  const isPopular = req.body.isPopular
  
  const userID = req.params.userID,
    accessToken = req.params.accessToken;
    
  spotifyTest.controller([
    { spotifyID: '1wVEYaqTmGsl3i7np7xQjW'},
    { spotifyID: '2qQLjtrCXMHvWF31LiQbyB'},
    { spotifyID: '1nzDJSsUJBn9uC7LJpY5wC'},
    { spotifyID: '0CdbG1eHVjqjkQsGoH2u1V'},
    { spotifyID: '6jpz8XE6j7M4q5DB5Cce6I'},
    { spotifyID: '4FXXf4RDJ6TIOX11JywHUg'},
    { spotifyID: '6IKq5gnh3GQrnxztypZKZR'},
    { spotifyID: '0lRHJ9PmO1uOD7LUO89KzI'},
    { spotifyID: '3KT4jB978CkSbdqWbLgT1x'},
    { spotifyID: '6gsEOKx8Z0CkVviR9DC3W6'}],
    [{"_id":{"$oid":"5d897daa81ba0d56dff19069"},"artist":"Guerilla Black","spotifyID":"2eTcJVakGgCvZQMnw9Evbn","popularity":36.0},
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
            {"_id":{"$oid":"5d897daa81ba0d56dff19078"},"artist":"The Fixxers","spotifyID":"5OoN9Ifb912te3rnAkXISP","popularity":23.0}], accessToken)
  
  // axios({
  //   url: `https://api.spotify.com/v1/users/${userID}/playlists`,
  //   method: "POST",
  //   data: {
  //     name: "Charlotte, NC to Atlanta, GA",
  //     description: "A playlist for your trip from Charlotte, NC to Atlanta, GA.",
  //     public: "false"
  //   },
  //   headers: {
  //     Authorization: "Bearer " + accessToken
  //   }
  // })
  //   .then((response2) => {
  //     let artistIDs = [
  //       "4r63FhuTkUYltbVAg5TQnk",
  //       "7oR6vQt8KT2ZWUpC65jTha",
  //       "0jmJE0UcA2Ngp9qXYiGqsM",
  //       "3AWctn8IqczGFgBtAmnrQJ",
  //       "0sBKkpFqxsLg0Ao6924RHK",
  //       "7DMUqI3HAaKc3x0Y4QKftV",
  //       "4xTArdz7s8XtbmErzEcMvg",
  //       "23zg3TcAtWQy7J6upgbUnj",
  //       "1G9G7WwrXka3Z1r7aIDjI7",
  //       "2hnzQ6eCFkxUIPsVcsdj8A"
  //     ];
  //     const newPlaylistID = response2.data.id;
  //     // console.log(response2);
  //     getTopSongs(newPlaylistID, artistIDs, accessToken, res);
  //     // getTopSongs(
  //     //   newPlaylistID,
  //     //   [
  //     //     "0FJ3jpm4yEcaAMzek1bD6i",
  //     //     "2H3xDjMmp31iLmsgXxLFyI"
  //     //   ],
  //     //   accessToken,
  //     //   res
  //     // );
  //     // populatePlaylist(newPlaylistID, accessToken, res)
  //   })
  //   .then( results => { 
  //     console.log(results)
  //     spot.populatePlaylist(results[3], results[0], results[2], res)
  //     //this is the send to the front-end end

    // })  
    // .catch((err) => console.log(err));
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