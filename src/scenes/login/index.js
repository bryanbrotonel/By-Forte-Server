import React, { Component } from "react";

export class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="text-center">
          <h5>by forte server login</h5>
        </div>
        <hr />
        <div className="row justify-content-center">
          <div className="col-4">
            <div>
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
