import React, { Component } from "react";
import DestinationForm from "../../components/DestinationForm";
import SongGenres from "../../components/SongGenres";
import Button from "../../components/Button";
import testObj from "../../lib/testJS";

class TripForm extends Component {
  state = {
    startPoint: "Point A",
    endPoint: "Point B",
    selectedGenres: []
  };

  handleChangeInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <div className="row mx-auto bg-dark text-light p-5">
          <div className="col-lg-6 text-left my-auto">
            <DestinationForm startPoint={this.state.startPoint} endPoint={this.state.endPoint} onChangeInput={this.handleChangeInput} />
          </div>
          <div className="col-lg-6 text-left">
            <SongGenres selectedGenres={this.state.selectedGenres} onChildClick={this.onChildClick} />
          </div>
          <Button
            value="Generate Playlist"
            onClick={(e) => {
              testObj.testSend(e, this.state);
            }}
          />
        </div>
      </form>
    );
  }
}

export default TripForm;
