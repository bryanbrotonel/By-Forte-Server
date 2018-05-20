import React, { Component } from "react";
import { ProductList } from "./Product List";
import { AddProduct } from "./Add Product";
import { OrderList } from "./Order List";
import "./styles.css";

export class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="text-center">
          <h3>Dashboard</h3>
        </div>
        <div className="row w-100 mx-auto">
          <div className="card-wrapper col-sm-6">
            <OrderList />
          </div>
          <div className="card-wrapper col-sm-6">
            <ProductList />
          </div>
          <div className="card-wrapper col-sm-6">
            <AddProduct />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
