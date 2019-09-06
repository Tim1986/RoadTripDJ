import React, { Component } from "react";
// import { Link } from 'react-router-dom';

// import LoginForm from "../../components/LoginForm";
import Login from "../Login/Login";

class LandingPage extends Component {
  render() {
    return (
      <div className="Home container">
        <div className="row my-5">
          <div className="col-12 my-5">
            <div className="row mx-auto bg-dark text-light p-5">
              <div className="col-lg-6">
                <h5 className="text-center">Welcome to</h5>
                <h3>Road Trip DJ</h3>
                <p className="text-left">
                Do you love music but get tired of listening to the same old songs every time you go on a road trip? 
                If so, then this app is for you. 
                </p>
                <p className="text-left">
                RoadTripDJ creates a Spotify playlist for your road trip with musicians from the cities you’re traveling to and from. 
                Discover new music, find local artists, and keep your long drives interesting with RoadTripDJ.
                </p>
                <p className="text-left">
                All you have to do is:
                <ol>
                <li>Log in to Spotify.</li>
                <li>Log in to RoadTripDJ.</li>
                <li>Input a start location and an end location.</li>
                <li>Select if you want to receive the most well known or least well known musicians.</li>
                <li>Click “generate playlist” and wait 30-60 seconds.</li>
                <li>You’ll have a new playlist in your Spotify account!</li>
                </ol>
                </p>
              </div>
              <div className="col-lg-6 text-center my-auto">
                {/* <h3>Login Form</h3> */}
                {/* <LoginForm /> */}
                <Login />
                {/* <div className='mt-3'>Don't have an account? <Link to='/register'>Click here to register.</Link></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
