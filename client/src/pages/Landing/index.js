import React, { Component } from "react";
// import { Link } from 'react-router-dom';

import BlurbMulti from "../../components/BlurbMulti";
import Login from "../Login";

class LandingPage extends Component {
  whatWeDo = [
    "RoadTripDJ creates a Spotify playlist for your road trip with musicians from the cities you’re traveling to and from. Discover new music, find local artists, and keep your long drives interesting with RoadTripDJ.",
    "Do you love music but get tired of listening to the same old songs every time you go on a road trip? If so, then this app is for you."
  ];

  howItWorksMulti = [
    [
      "Register and log in to Road Trip DJ.",
      "When prompted, log in to Spotify and grant Road Trip DJ permission to create playlists on your account."
    ],
    [
      "Input a start location and an end location.",
      "Select if you want to receive the most well known or least well known musicians."
    ],
    [
      "Click “generate playlist” and wait 30-60 seconds.",
      "You’ll have a new playlist in your Spotify account!"
    ]
  ];

  howItWorksSecondary = ["It is necessary to grant access to your Spotify account in order to use this app."]

  render() {
    return (
      <div className="Home container p-5" style={{backgroundColor: "lightgray"}}>
        <div className="row mx-auto p-5">
          <div className="col-lg-6 my-auto">
            <h3 className="text-center">Welcome to</h3>
            <h1>Road Trip DJ</h1>
          </div>
          <div className="col-lg-6 text-center my-auto">
            <Login />
          </div>
        </div>
        <div className="row">
          <div className="col-12 my-5">
            <BlurbMulti title="What We Do" primaryContent={this.whatWeDo} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 my-5">
            <BlurbMulti
              title="How It Works"
              cols={3}
              multiContent={this.howItWorksMulti}
              secondaryContent={this.howItWorksSecondary}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
