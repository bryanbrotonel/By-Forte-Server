import React, { Component } from "react";
import "./App.css";

import { Login } from "./scenes/login";
import { Dashboard } from "./scenes/dashboard";

class App extends Component {

  render() {
    return (
      <div className="bg-light">
        <div className="container">
          <div className=" mx-auto">
            <Login />
          </div>
          <br />
          <hr />
          <br />
          <div>
            <Dashboard />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
