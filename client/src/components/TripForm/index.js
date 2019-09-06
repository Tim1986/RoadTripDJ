import React, { Component } from "react";
import DestinationForm from "../../components/DestinationForm";
// import SongGenres from "../../components/SongGenres";
import Button from "../../components/Button";
import API from "../../lib/API";

class TripForm extends Component {
  state = {
    startPoint: "Point A",
    endPoint: "Point B",
    isPopular: true
  };

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <form>
        <div className="row mx-auto bg-dark text-light p-5">
          <div className="col-12 text-left my-auto">
            <DestinationForm
              startPoint={this.state.startPoint}
              endPoint={this.state.endPoint}
              onChangeInput={this.handleChangeInput}
            />
          </div>
          {/* ========== START: Code for Genres ========== */}
          {/* <div className="col-lg-6 text-left">
            <SongGenres
              selectedGenres={this.state.selectedGenres}
              onChildClick={this.onChildClick}
            />
          </div> */}
          {/* ========== END: Code for Genres ========== */}
          {/* <Button
            value="Generate Playlist"
            onClick={(e) => {
              API.testObj.testSend(e, this.state);
            }} */}
          <Button
            value="Generate Playlist"
            onClick={(e) => API.Spotify.createPlaylist(e, this.state)}
          />
        </div>
      </form>
    );
  }
}

export default TripForm;
