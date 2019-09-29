import React, { Component } from "react";
// import { Link } from 'react-router-dom';

import BlurbMulti from "../../components/BlurbMulti";
import Button from "../../components/Button";
import Login from "../Login";

import API from "../../lib/API";

import "./index.css";

class LandingPage extends Component {
  whatWeDo = [
    "RoadTripDJ creates a Spotify playlist for your road trip with musicians from the cities you’re traveling to and from. Discover new music, find local artists, and keep your long drives interesting with RoadTripDJ.",
    "Do you love music but get tired of listening to the same old songs every time you go on a road trip? If so, then this app is for you."
  ];

  howItWorksMulti = [
    {
      icon: {
        className: "icon--number",
        content: "1"
      },
      text: {
        content: [
          "Register and log in to Road Trip DJ. When prompted, log in to Spotify and grant Road Trip DJ permission to create playlists on your account."
        ]
      }
    },
    {
      icon: {
        className: "icon--number",
        content: "2"
      },
      text: {
        content: [
          "Input a start location and an end location. Select if you want to receive the most well known or least well known musicians."
        ]
      }
    },
    {
      icon: {
        className: "icon--number",
        content: "3"
      },
      text: {
        content: [
          "Click “generate playlist” and wait 30-60 seconds. You’ll have a new playlist in your Spotify account!"
        ]
      }
    }
  ];

  howItWorksSecondary = [
    "It is necessary to grant access to your Spotify account in order to use this app."
  ];

  seedDB = () => {
    API.DB.seed()
  }

  render() {
    return (
      <div className="landing">
        <div className="container landing__main">
          <div className="row bg-dark text-light">
            <div className="hero__welcome p-5 text-center col-lg-6">
              <div>
                <h3 className="hero__welcome-subtitle">Welcome to</h3>
                <h1 className="display-3">Road Trip DJ</h1>
                {/* <Button value="Seed DB" onClick={this.seedDB} /> */}
              </div>
            </div>
            <div
              className="col-lg-6 text-center p-5 hero__login">
              <Login />
            </div>
          </div>
          <div className="row p-5 ">
            <div className="col-12 my-5 px-5">
              <BlurbMulti title="What We Do" primaryContent={this.whatWeDo} />
            </div>
          </div>
          <div className="row p-5" style={{ backgroundColor: "lightgray" }}>
            <div className="col-12 my-5 px-5">
              <BlurbMulti
                title="How It Works"
                cols={3}
                multiContent={this.howItWorksMulti}
                secondaryContent={this.howItWorksSecondary}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
