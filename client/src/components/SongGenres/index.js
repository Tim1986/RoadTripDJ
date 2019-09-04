import React, { Component } from "react";
import InputCheckDropdown from "../../components/InputCheckDropdown";

class SongGenres extends Component {

  render() {
    return (
      <div>
        <h3 className="text-center">Genres</h3>
        <InputCheckDropdown />
      </div>
    );
  }
}

export default SongGenres;
