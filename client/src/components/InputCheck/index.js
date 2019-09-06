import React, { Component } from "react";

class InputCheck extends Component {
  render() {
    return (
      <div className={`form-check ${this.props.extraClass || ""}`}>
        <input
          className="form-check-input"
          type="checkbox"
          name={this.props.name}
          value={this.props.value}
          id={this.props.id}
          key={this.props.id}
          onClick={this.props.onClick}
          onChange={this.props.onChange}
          defaultChecked={this.props.defaultChecked}
        />
        <label className="form-check-label" htmlFor={this.props.id}>
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default InputCheck;
