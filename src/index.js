import React from "react";
import ReactDOM from "react-dom";

import registerServiceWorker from "./registerServiceWorker";

import firebase from "firebase/app";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./scenes/App";

import "./index.css";

// Initialize Firebase
let config = {
  apiKey: "AIzaSyDQC55nWiuHoR2uChUafiFWaYGVH2ecPvI",
  authDomain: "by-forte.firebaseapp.com",
  databaseURL: "https://by-forte.firebaseio.com",
  projectId: "by-forte",
  storageBucket: "by-forte.appspot.com",
  messagingSenderId: "622359278063"
};
firebase.initializeApp(config);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

registerServiceWorker();
