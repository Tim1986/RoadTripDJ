import axios from "axios";

export default {
  Users: {
    login: function(email, password) {
      return axios.post("/api/users/login", { email, password });
    },

    create: function(email, password) {
      return axios.post("/api/users", { email, password });
    },

    getMe: function(authToken) {
      return axios.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    },
    register: function(firstName, lastName, email, password) {
      return axios.post("/api/users/register", { firstName, lastName, email, password });
    }
  },

  Secrets: {
    getAll: function(authToken) {
      return axios.get("/api/secrets", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }
  },

  testObj: {
    testFunc: function(e) {
      e.preventDefault();
      return console.log("Hi from Test");
    },

    testSend: function(e, data) {
      e.preventDefault();
      axios({
        method: "POST",
        url: "/api/test",
        data: data
      })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
  },

  Spotify: {
    getRedirectURL: function() {
      axios({
        method: "GET",
        url: "/api/spotify/login"
      })
        .then((response) => window.location.replace(response.data))
        .catch((err) => console.log(err));
    },

    getUser: function() {
      const accessToken = localStorage.getItem("spotifyAccessToken");
      axios({
        method: "GET",
        url: `/api/spotify/user/${accessToken}`
      })
        .then((response) => localStorage.setItem("spotifyUserID", response.data.id))
        .catch((err) => console.log(err));
    },

    checkForCode: function() {
      const siteURL = window.location.search.substring(1),
        authCode = siteURL.split("=")[1];

      if (authCode) {
        this.tradeForToken(authCode);
      }
    },

    tradeForToken: function(authCode) {
      axios({
        method: "GET",
        url: `/api/spotify/exchangeToken/${authCode}`
      })
        .then((response) => {
          // console.log(response);
          localStorage.setItem("spotifyAccessToken", response.data.access_token);
          localStorage.setItem("spotifyRefreshToken", response.data.refresh_token);
          // window.location.assign("https://glacial-savannah-65289.herokuapp.com/newtrip");
          window.location.assign("http://localhost:3000/newtrip");
        })
        .catch((err) => console.log(err));
    },

    createPlaylist: function(e, data) {
      e.preventDefault();
      const accessToken = localStorage.getItem("spotifyAccessToken"),
        spotifyUserID = localStorage.getItem("spotifyUserID");
      console.log(accessToken);
      axios({
        method: "POST",
        url: `/api/spotify/playlist/new/${spotifyUserID}/${accessToken}`,
        data: data
      })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
  }
};

//react route /authorize
//renders Authorize component
//componentDidMount = query server for the spotify url
//route.get("/api/spotify/login") returns res.json(URL)
//.then(window.location = URL)
