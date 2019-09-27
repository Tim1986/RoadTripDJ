const geoArtists = require("./../../lib/geoArtists");
const router = require("express").Router(),
  axios = require("axios");
  spotifyTest = require("../api/spotifyTest.js")

//=================================================
// Functions
//=================================================

const getTopSongs = (playlistID, artistIDs, accessToken, res) => {
  let spotifyURIs = [];
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
          // console.log(response.data);
          // console.log("Artist Names: ", track.artists);
          // console.log("Song Names: ", track.name);
          // console.log(track);

          //push desired tracks into spotifyURIs array
          spotifyURIs.push(track.uri);
        });
        // console.log(spotifyURIs);
      })
      .catch((err) => console.log(err));
  });
  populatePlaylist(playlistID, accessToken, res);
  // populatePlaylist(playlistID, spotifyURIs, accessToken, res)
};

// const populatePlaylist = (playlistID, spotifyURIs, accessToken) => {
const populatePlaylist = (playlistID, accessToken, res) => {
  axios({
    url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
    method: "POST",
    data: {
      uris: [
        "spotify:track:1B6qNtDWBNQMTk9d6QKhDh",
        "spotify:track:2xQOYvsldnue1iRIEgAiRm",
        "spotify:track:16g9LLSZbU67wT1SzPFn3O",
        "spotify:track:5xQFt9kltP88yTScgiZyvZ",
        "spotify:track:15PeYA1AGQkax1InpuEABN",
        "spotify:track:3Kg4ZFLjHY5QIPvsQHJlCe",
        "spotify:track:2PpruBYCo4H7WOBJ7Q2EwM",
        "spotify:track:0I3q5fE6wg7LIfHGngUTnV",
        "spotify:track:6bUNEbXT7HovLW6BgPCBsb",
        "spotify:track:2vfvGlqCB7oertO5VLE0sz",
        "spotify:track:6glsMWIMIxQ4BedzLqGVi4",
        "spotify:track:5z7mYFfhw6N6f23VwrokJD",
        "spotify:track:0shK5iZQppbHPQYiy60xs9",
        "spotify:track:3WibbMr6canxRJXhNtAvLU",
        "spotify:track:2oLwDI8tZUOh6SmTMRRfKs",
        "spotify:track:4GdB5M7GbwLZLouktYocFC",
        "spotify:track:2gwkD6igEhQbDQegRCcdoB",
        "spotify:track:5MPPttjfGap2C6j6eKcO6J",
        "spotify:track:7f1zjZG77S891Uv4O68yfk",
        "spotify:track:3WyRgi8CzQnhzO0xw79tTS",
        "spotify:track:0W1ZfgXpC23RYQPDq7RM5I",
        "spotify:track:0rrVn0KMlLHtAklzUrrfoj",
        "spotify:track:1AdXchAT6hBUm5d6y4nKjI",
        "spotify:track:01jBJGEa9Ex9W2IjkIzuY6",
        "spotify:track:0eBOVXdnrVQ0rITgKXBAA7",
        "spotify:track:0SsTkfOhM7e87trwjEqBQN",
        "spotify:track:5tORtBzHUAnNrIw5Ql3kHZ",
        "spotify:track:0dJEQ01IPN4ukqRsPrm4ab",
        "spotify:track:4eeCQtgohd0nLeI2t5XgGo",
        "spotify:track:4kUMfefHiemc0qPqCzbOa5",
        "spotify:track:3dACTdXZ1wbYk6cbNSwJDX",
        "spotify:track:7aMcQxbQPv2RogWqzZFjsd",
        "spotify:track:19mlaBYDjZOeTCgZwBHOrw",
        "spotify:track:2rBriemtAJMuA7yxOo0ltn",
        "spotify:track:4WA5DSPp70cxIs7SIsX3eV",
        "spotify:track:2ehSWj8fb72SAHErgosaQx",
        "spotify:track:5EsIiqZ3FoOzuP5xZSeZVY",
        "spotify:track:1lHv1I4n7nKOJI27o6XWCY",
        "spotify:track:5L00pRFVs3TP0oEkXRXLRz",
        "spotify:track:2CiMjwulPu83ZTiC96fZ6x",
        "spotify:track:3pT8FZqcTahEAwB9PXZv7d",
        "spotify:track:26wbI9PC17C8AszrgaaxJi",
        "spotify:track:7IrnxkBk7rptPuqXka0lSp",
        "spotify:track:1L4cfyfQlAvjPGgsC8Xcoc",
        "spotify:track:2417fGFvdUhgb5Vi628dKg",
        "spotify:track:5fotRlPQwy4sH2Pw0UWega",
        "spotify:track:5rb9QrpfcKFHM1EUbSIurX",
        "spotify:track:68vgtRHr7iZHpzGpon6Jlo",
        "spotify:track:4356Typ82hUiFAynbLYbPn",
        "spotify:track:2QsZVnbWVSjKMXK6K3uRBL",
        "spotify:track:7J41dYQolQJEtj3UmKLu5r",
        "spotify:track:1bM50INir8voAkVoKuvEUI",
        "spotify:track:7aXuop4Qambx5Oi3ynsKQr",
        "spotify:track:7wBThXx7BGZHJJ3aN3OPvv",
        "spotify:track:47TqCCnEliDp8NRDyIQoQq",
        "spotify:track:5rPzPAaOUceS8HiAculegz",
        "spotify:track:5H5P9DB1WI9VIwYG0Z79gh",
        "spotify:track:03f2e7WrN33uwicte4iZb7",
        "spotify:track:5BoZ3jzGaRAg8q22zkaWy6",
        "spotify:track:3GiT3HfA2YNABc0jUrOCbW",
        "spotify:track:42KoOrMLyAmTmruipHJONK",
        "spotify:track:20O6e3w6v5lQ68pFcVV5qY",
        "spotify:track:3aVF76XGXhJ1QIiJpdWcNY",
        "spotify:track:2CSpa3jJYMtAJ4q0E3xtDv",
        "spotify:track:2lsXEs99JrDOqug5f02njS",
        "spotify:track:06OURi4LN1YpFyT2h3jYbM",
        "spotify:track:76aAL9SnibQqP46XP9pK6Z",
        "spotify:track:3uesdSRoTAr3TrfDNWwN1j",
        "spotify:track:6RcA2chdpMsyB1L5Fel74R",
        "spotify:track:54FUsJ5kFOlDftuBDhLR93",
        "spotify:track:5MYufLox1gMxJh7suHVdbF",
        "spotify:track:4sLxEkhqPiHvUpkGI7hvvs",
        "spotify:track:3Epq2doaSoL1X7AL5urjVk",
        "spotify:track:5M70kaGn8mn47BNe2fwZyA",
        "spotify:track:25ayJ2qoDMwFYidBvnosnN",
        "spotify:track:5GiziwU0nMmU77IxpKTedB"
      ]
      // uris: spotifyURIs
    },
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json"
    }
  })
    .then(() => res.json(playlistID))
    .catch((err) => console.log(err));
};

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
  // console.log(req.body)
  // const startPoint = req.body.startPoint
  // const endPoint = req.body.endPoint
  // const playlistName = startPoint + " to " + endPoint
  // const isPopular = req.body.isPopular
  const userID = req.params.userID,
    accessToken = req.params.accessToken;
    
  spotifyTest.controller([
    { spotifyID: '4FXXf4RDJ6TIOX11JywHUg'},
    { spotifyID: '6IKq5gnh3GQrnxztypZKZR'},
    { spotifyID: '0lRHJ9PmO1uOD7LUO89KzI'},
    { spotifyID: '3KT4jB978CkSbdqWbLgT1x'},
    { spotifyID: '6gsEOKx8Z0CkVviR9DC3W6'}],
    [{spotifyID:"2eTcJVakGgCvZQMnw9Evbn"},
    {spotifyID:"4ew79B4SqevHGtYGR9bY0t"},
    {spotifyID:"2AUT4fNQ2QC0e2f5pIxOCd"},
    {spotifyID:"5vKNduT1XEQtCsdTPlVPkT"},
    {spotifyID:"5OoN9Ifb912te3rnAkXISP"}], accessToken)
  
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