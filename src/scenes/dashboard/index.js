import React, { Component } from "react";
import { ProductList } from "./Product List";
import './styles.css';

export class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="text-center">
          <h3>Dashboard</h3>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <ProductList />
          </div>
          <div className="col-sm-6">
            <ProductList />
          </div>
          <div className="col">
            <ProductList />
          </div>
          <div className="col">
            <ProductList />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
