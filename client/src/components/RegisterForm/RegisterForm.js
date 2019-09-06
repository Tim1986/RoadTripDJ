import React, { Component } from "react";
import Button from "../Button";

import Octicon, { Mail, Key, Keyboard } from "@githubprimer/octicons-react";

class RegisterForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event) => {
    const { firstName, lastName, email, password } = this.state;

    this.props.onSubmit(firstName, lastName, email, password);
    event.preventDefault();

    const newUser = this.state;
    console.log(newUser);
  };

  render() {
    const { firstName, lastName, email, password } = this.state;

    return (
      <div className="RegisterForm">
        <div className="card">
          <div className="card-body">
            <form className="LoginForm" onSubmit={this.handleSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Octicon icon={Keyboard} />
                  </span>
                </div>
                <input
                  className="form-control"
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="FirstName"
                  value={firstName}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Octicon icon={Keyboard} />
                  </span>
                </div>
                <input
                  className="form-control"
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="LastName"
                  value={lastName}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Octicon icon={Mail} />
                  </span>
                </div>
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="email@provider.com"
                  value={email}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Octicon icon={Key} />
                  </span>
                </div>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={this.handleInputChange}
                />
              </div>

              <Button type="submit" value="Register" />
              {/* <button className='btn btn-primary' type='submit'>Register</button> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
