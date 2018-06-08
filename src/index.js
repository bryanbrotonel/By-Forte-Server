import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import firebase from "firebase/app";

import registerServiceWorker from './registerServiceWorker';

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

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
