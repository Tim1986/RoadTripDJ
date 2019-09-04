import React, { Component } from "react";
import InputGroup from "../../components/InputGroup";

class DestinationForm extends Component {
  render() {
    return (
      <div>
        <h3 className="text-center">
          <strong>{this.props.startPoint} </strong>
          to
          <strong> {this.props.endPoint}</strong>
        </h3>
        <InputGroup
          type="text"
          name="startPoint"
          value={this.props.startPoint}
          placeholder="Point A"
          id="start-point"
          label="Starting Point"
          onChange={this.props.onChangeInput}
        />
        <InputGroup
          type="text"
          name="endPoint"
          value={this.props.endPoint}
          placeholder="Point B"
          id="end-point"
          label="Ending Point"
          onChange={this.props.onChangeInput}
        />
      </div>
    );
  }
}

export default DestinationForm;
