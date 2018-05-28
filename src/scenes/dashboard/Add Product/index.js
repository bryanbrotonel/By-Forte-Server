import React, { Component } from "react";
import { FormGroup } from "./components/formGroup";

import firebase from "firebase";

import "./styles.css";

export class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: "",
      productVariation: "",
      productMaterial: "",
      productPrint: "",
      productSmallQuantity: 0,
      productMediumQuantity: 0,
      productLargeQuantity: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    var key = firebase
      .database()
      .ref("productList")
      .push().key;

    var updates = {};
    updates["productList/" + key] = this.state;

    firebase
      .database()
      .ref()
      .update(updates);
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  render() {
    var divStyle = {
      minheight: "100%"
    };

    return (
      <React.Fragment>
        <div className="card mx-auto" style={divStyle}>
          <div className="card-body">
            <h5 className="card-title">Add Product</h5>
            <div className="table-responsive">
              <form onSubmit={this.handleSubmit}>
                <div className="row w-100">
                  <FormGroup
                    id="productName"
                    name="Product Name"
                    value={this.state.productName}
                    onChange={this.handleChange}
                  />
                  <FormGroup
                    id="productVariation"
                    name="Variation"
                    value={this.state.productVariation}
                    onChange={this.handleChange}
                  />
                  <FormGroup
                    id="productMaterial"
                    name="Material"
                    value={this.state.productMaterial}
                    onChange={this.handleChange}
                  />
                  <FormGroup
                    id="productPrint"
                    name="Print"
                    value={this.state.productPrint}
                    onChange={this.handleChange}
                  />
                  <FormGroup
                    id="productSmallQuantity"
                    name="Small"
                    type="number"
                    value={this.state.productSmallQuantity}
                    onChange={this.handleChange}
                  />
                  <FormGroup
                    id="productMediumQuantity"
                    name="Medium"
                    type="number"
                    value={this.state.productMediumQuantity}
                    onChange={this.handleChange}
                  />{" "}
                  <FormGroup
                    id="productLargeQuantity"
                    name="Large"
                    type="number"
                    value={this.state.productLargeQuantity}
                    onChange={this.handleChange}
                  />
                  <FormGroup
                    onChange={this.handleChange}
                    id="imageInpput"
                    type="file"
                    name="image"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
