import React, { Component } from "react";

import "./index.css";

class InputCheck extends Component {
  render() {
    return (
      <div className="form-check">
        <input
          className={`form-check-input ${this.props.checkClass || ""}`}
          type="checkbox"
          name={this.props.name}
          value={this.props.value}
          id={this.props.id}
          key={this.props.id}
          onClick={this.props.onClick}
          onChange={this.props.onChange}
          defaultChecked={this.props.defaultChecked}
        />
        <label
          className={`form-check-label ${this.props.labelClass || ""}`}
          htmlFor={this.props.id}
        >
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default InputCheck;
