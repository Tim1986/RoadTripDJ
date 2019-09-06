import React, { Component } from "react";
import InputGroup from "../../components/InputGroup";
import InputCheck from "../../components/InputCheck";

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
        <InputCheck 
        name="isPopular"
        label="Choose Most Popular Artists First"
        onChange={this.props.onChangeCheck}
        defaultChecked={this.props.isPopular}
        />
      </div>
    );
  }
}

export default DestinationForm;
