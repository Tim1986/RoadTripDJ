import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import API from '../../lib/API';
import AuthContext from '../../contexts/AuthContext';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

import "./index.css"

class Register extends Component {
  static contextType = AuthContext;

  state = {
    redirectToReferrer: false,
    error: ""
  }

  handleSubmit = (firstName, lastName, email, password) => {
    API.Users.register(firstName, lastName, email, password)
      .then(response => {
        this.setState({ redirectToReferrer: true })
      })
      .catch(err =>
        console.log(err)
        // if (err.response.status === 401) {
        //   this.setState({ error: "Sorry, that email/password combination is not valid. Please try again." });
        // }
      );
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/login" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className='register'>
        <div className='row'>
          <div className='col'>
            <h1>Register Account</h1>
          </div>
        </div>
        {this.state.error &&
          <div className='row'>
            <div className='col'>
              <div className='alert alert-danger mb-3' role='alert'>
                {this.state.error}
              </div>
            </div>
          </div>}
        <div className='row'>
          <div className='col'>
            <RegisterForm onSubmit={this.handleSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
