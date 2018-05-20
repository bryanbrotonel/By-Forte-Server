import React, { Component } from "react";

export class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
