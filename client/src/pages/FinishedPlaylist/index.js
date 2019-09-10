import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./index.css";

function FinishedPlaylist(props) {
  const playlistID = localStorage.getItem("playlistID");
  return (
    <div className="container my-auto fp-r">
      <div className="row text-center">
        <div className="finished-playlist col-lg-6 col-md-9 col-12 mx-auto p-4">
          <h1 className="mb-4">Your Playlist Is Finished!</h1>
          <div className="d-flex justify-content-around">
            <Link className="btn btn-orange" to="/newtrip">
              Create Another Playlist
            </Link>
            <a
              className="btn btn-green"
              href={`https://open.spotify.com/playlist/${playlistID}`}
              target="_blank"
            >
              Open in Spotify
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinishedPlaylist;
