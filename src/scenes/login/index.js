import React, { Component } from "react";

import { Redirect } from "react-router";

import firebase from "firebase/app";
import "firebase/auth";

import "./styles.css";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      user: false
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }

  componentDidMount() {
    document.title = "By Forte Admin";
    // this.checkUser();
  }

  checkUser() {
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.setState({
          user: true
        });
      }
    });
  }

  handleFormChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;

    this.setState({
      [id]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    // Validate
    const self = this;

    const { email, password } = this.state;
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(function() {
            self.setState({
              user: true
            });
          });
      })
      .catch(function() {
        alert('Ivnalid credentials')
        self.setState({
          user: false
        });
      });
  }

  render() {
    const { user } = this.state;

    return user ? (
      <Redirect to="/dashboard" />
    ) : (
      <div className="middle-align px-md-0 px-3">
        <div className="card signin-card mx-auto">
          <div className="my-4">
            <h1 className="h3 mb-3 text-center">Please sign in</h1>
            <div className="w-75 mx-auto">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    onChange={this.handleFormChange}
                    required
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={this.handleFormChange}
                    required
                  />
                </div>
                <button type="submit" className="w-100 btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
