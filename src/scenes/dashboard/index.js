import React, { Component } from "react";
import { Inventory } from "./Inventory";
import { AddProduct } from "./Add Product";
import { OrderList } from "./Order List";
import "./styles.css";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h3>Dashboard</h3>
        </div>
        <div className="row w-100 mx-auto">
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
    );
  }
}
