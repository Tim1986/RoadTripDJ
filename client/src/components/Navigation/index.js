import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";
import AuthDropdown from "../../components/AuthDropdown/AuthDropdown";

import "./index.css";

class Navigation extends Component {
  static contextType = AuthContext;

  state = {
    collapsed: true
  };

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { user } = this.context;
    const { collapsed } = this.state;
    const targetClass = `collapse navbar-collapse ${!collapsed && "show"}`;
    const togglerClass = `navbar-toggler ${collapsed && "collapsed"}`;

    return (
      <div className="navigation" style={{ position: "relative", zIndex: "999" }}>
        <nav className="navbar navbar-expand-lg navbar-light mb-3">
          <Link className="navbar-brand" to="#">
            Road Trip DJ
          </Link>
          <button
            className={togglerClass}
            onClick={this.toggleCollapse}
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={targetClass} id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/newtrip" onClick={this.toggleCollapse}>
                  New Trip
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              {user && <AuthDropdown onClick={this.toggleCollapse} />}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
