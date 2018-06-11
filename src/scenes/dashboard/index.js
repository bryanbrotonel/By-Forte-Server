import React, { Component } from "react";

import firebase from "firebase/app";
import "firebase/auth";

import { Redirect } from "react-router";

import Navbar from "./../../components/Navbar";
import { Inventory } from "./Inventory";
import { AddProduct } from "./Add Product";
import { OrderList } from "./Order List";
import "./styles.css";

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      user: true
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    document.title = "By Forte Admin | Dashboard";
    this.checkUser();
  }

  signOut() {
    firebase.auth().signOut();
    this.setState({
      user: false
    });
  }

  checkUser() {
    var user = firebase.auth().currentUser;

    if (!user) {
      this.setState({
        user: false
      });
    }
  }

  render() {
    const { user } = this.state;

    return user ? (
      <React.Fragment>
        <Navbar signOut={this.signOut} />
        <div className="container">
          <div className="text-center">
            <h3>Dashboard</h3>
          </div>
          <div className="row mx-auto">
            <div className="card-wrapper col-lg-6">
              <OrderList />
            </div>
            <div className="card-wrapper col-lg-6">
              <Inventory />
            </div>
            <div className="card-wrapper col-lg-6">
              <AddProduct />
            </div>
          </div>
        </div>
      </React.Fragment>
    ) : (
      <Redirect to="/" />
    );
  }
}
