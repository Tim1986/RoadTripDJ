import React, { Component } from "react";

import API from "../../lib/API";

class Authorize extends Component {
  componentDidMount() {
    API.Spotify.getRedirectURL();
  }

  render() {
    return <p>Redirecting...</p>;
  }
}

export default Authorize;
