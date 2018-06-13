import React, { Component } from "react";

import firebase from "firebase/app";
import "firebase/auth";

import Loadable from "react-loadable";
import { Redirect } from "react-router";

import Navbar from "./../../components/Navbar";
import Loading from "./../../components/Loading";

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
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        this.setState({
          user: false
        });
      }
    });
  }

  render() {
    const OrderListLoadable = Loadable({
      loader: () => import("./components/Order List"),
      loading: Loading
    });

    const InventoryLoadable = Loadable({
      loader: () => import("./components/Inventory"),
      loading: Loading
    });

    const AddProdLoadable = Loadable({
      loader: () => import("./components/Add Product"),
      loading: Loading
    });
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
              <OrderListLoadable />
            </div>
            <div className="card-wrapper col-lg-6">
              <InventoryLoadable />
            </div>
            <div className="card-wrapper col-lg-6">
              <AddProdLoadable />
            </div>
          </div>
        </div>
      </React.Fragment>
    ) : (
      <Redirect to="/" />
    );
  }
}
