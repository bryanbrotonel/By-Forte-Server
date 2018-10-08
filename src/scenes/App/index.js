import React, { Component } from "react";

import Routes from "../../routes";

import "./styles.css";

class App extends Component {
  render() {
    return (
      <div className="app bg-light">
        <div className="body fill-height-or-more">
          <Routes />
        </div>
      </div>
    );
  }
}

export default App;
