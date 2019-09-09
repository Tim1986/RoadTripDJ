import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import API from "../../lib/API";
import AuthContext from "../../contexts/AuthContext";
import RegisterForm from "../../components/RegisterForm";

import "./index.css";

class Register extends Component {
  static contextType = AuthContext;

  state = {
    redirectToReferrer: false,
    error: ""
  };

  handleSubmit = (firstName, lastName, email, password) => {
    API.Users
      .register(firstName, lastName, email, password)
      .then((response) => {
        this.setState({ redirectToReferrer: true });
      })
      .catch(
        (err) => console.log(err)
        // if (err.response.status === 401) {
        //   this.setState({ error: "Sorry, that email/password combination is not valid. Please try again." });
        // }
      );
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/login" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="register container">
        <div className="row">
          <div className="register__container col-lg-6 col-md-9 col-12 mx-auto">
            <h1>Register Account</h1>
            {this.state.error && (
              <div className="alert alert-danger mb-3" role="alert">
                {this.state.error}
              </div>
            )}
            <RegisterForm onSubmit={this.handleSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
