import React, { Component } from "react";

import "./styles.css";

export default class Login extends Component {
  render() {
    return (
      <div className="middle-align">
        <div className="card mx-auto">
          <div className="my-4">
            <h1 className="h3 mb-3 text-center">Please sign in</h1>
            <div className="w-75 mx-auto">
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    required
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <button type="submit" className="w-100 btn btn-primary">
                  Login
                </button>
              </form>
              <p className="mt-3 text-muted text-center">&copy; 2017-2018</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
