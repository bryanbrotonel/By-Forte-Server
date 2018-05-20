import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Login } from "./scenes/login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="w-25 mx-auto">
            <div className="text-center">
              <h5>by forte server login</h5>
            </div>
            <hr/>
            <Login />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
