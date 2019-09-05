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
    register: function (firstName, lastName, email, password) {
      return axios.post('/api/users/register', { firstName, lastName, email, password });
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
    login: function(e) {
      e.preventDefault();
      axios({
        method: "GET",
        url: "/api/spotify/login"
      })
        .then((response) => console.log(response))
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
          console.log(response);
          localStorage.setItem("spotifyAccessToken", response.data.access_token);
          localStorage.setItem("spotifyRefreshToken", response.data.refresh_token);
          window.location.assign("http://localhost:3000/newtrip/");
        })
        .catch((err) => console.log(err));
    },

    createPlaylist: function(e) {
      e.preventDefault();
      const accessToken = localStorage.getItem("spotifyAccessToken");
      console.log(accessToken)
      axios({
        method: "GET",
        url: `/api/spotify/playlist/new/${accessToken}`
      })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
  }
};
