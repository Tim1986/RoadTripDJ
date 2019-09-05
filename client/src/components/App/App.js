import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import API from "../../lib/API";
import TokenStore from "../../lib/TokenStore";
import AuthContext from "../../contexts/AuthContext";
// import Navigation from '../../components/Navigation/Navigation';
// import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
//------------- PAGES -------------
import Landing from "../../pages/Landing";
import Authorize from "../../pages/Authorize";
import Trip from "../../pages/Trip";
// Other Pages
import NotFound from "../../pages/NotFound";
import Navigation from "../../components/Navigation";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Secret from "../../pages/Secret/Secret";
// import Home from "../../pages/Home/Home";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = (user, authToken) => {
      TokenStore.setToken(authToken);
      this.setState((prevState) => ({ auth: { ...prevState.auth, user, authToken } }));
    };

    this.handleLogout = () => {
      TokenStore.clearToken();
      localStorage.clear();
      this.setState((prevState) => ({
        auth: { ...prevState.auth, user: undefined, authToken: undefined }
      }));
    };

    this.state = {
      auth: {
        user: undefined,
        authToken: TokenStore.getToken(),
        onLogin: this.handleLogin,
        onLogout: this.handleLogout
      }
    };
  }

  componentDidMount() {
    const { authToken } = this.state.auth;
    if (!localStorage.getItem("spotifyAccessToken")) {
      API.Spotify.checkForCode();
    }

    if (!localStorage.getItem("spotifyUserID")) {
      API.Spotify.getUser();
    }

    if (!authToken) return;

    API.Users
      .getMe(authToken)
      .then((response) => response.data)
      .then((user) =>
        this.setState((prevState) => ({ auth: { ...prevState.auth, user } }))
      )
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <AuthContext.Provider value={this.state.auth}>
        <div className="App">
          {this.state.auth.authToken && <Navigation />}
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/authorize" component={Authorize} />
              <PrivateRoute exact path="/newtrip" component={Trip} />
              {/* <Route path='/register' component={Register} /> */}
              <PrivateRoute path="/secret" component={Secret} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
