import React, { Component } from "react";
import PropTypes from "prop-types";

import "firebase/auth";

export default class Navbar extends Component {
  render() {
    const {signOut } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
        <span className="navbar-brand mb-0">By Forte Admin</span>
        <div>
          <button type="submit" className="btn btn-danger btn-sm" onClick={signOut}>
            Logout
          </button>{" "}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  email: PropTypes.string,
  signOut: PropTypes.func
};
