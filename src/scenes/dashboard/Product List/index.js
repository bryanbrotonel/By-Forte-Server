import React, { Component } from "react";

import firebase from "firebase";

import "./styles.css";

export class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: [],
      initialOrdersLoaded: false,
      initialEdit: false
    };
  }

  componentDidMount() {
    const self = this;

    this.getProductList()
      .then(function(productList) {
        self.setState({
          productList: productList,
          initialOrdersLoaded: true
        });
      })
      .catch(function(productList) {
        console.log("getProductList: error", productList);
      });

    this.editProductList()
      .then(function(productList) {
        self.setState({
          productList: productList,
          initialEdit: true
        });
      })
      .catch(function(productList) {
        console.log("editProductList: error", productList);
      });
  }

  getProductList() {
    const self = this;

    return new Promise(function(resolve, reject) {
      var productItems = [];
      firebase
        .database()
        .ref("productList")
        .on("child_added", function(childSnapshot) {
          var childSnapshotData = childSnapshot.val();

          let productItem = {
            productName: childSnapshotData.productName,
            productVariation: childSnapshotData.productVariation,
            productMaterial: childSnapshotData.productMaterial,
            productPrint: childSnapshotData.productPrint,
            productSmallQuantity: childSnapshotData.productSmallQuantity,
            productMediumQuantity: childSnapshotData.productMediumQuantity,
            productLargeQuantity: childSnapshotData.productLargeQuantity
          };

          productItems.push(productItem);

          if (self.state.initialOrdersLoaded) {
            this.setState({
              productList: productItems
            });
          }

          return productItems ? resolve(productItems) : reject(productItems);
        });
    });
  }

  editProductList() {
    const self = this;

    return new Promise(function(resolve, reject) {
      firebase
        .database()
        .ref("productList")
        .on("child_changed", function(childSnapshot) {
          const { productList, initialEdit } = self.state;
          const childSnapshotData = childSnapshot.val();

          var index = productList.findIndex(
            x =>
              x.productName === childSnapshotData.productName &&
              x.productVariation === childSnapshotData.productVariation
          );

          productList[index] = childSnapshotData;

          if (initialEdit) {
            self.setState({
              productList: productList
            });
          }

          return productList ? resolve(productList) : reject(productList);
        });
    });
  }

  render() {
    var divStyle = {
      height: "250px",
      overflow: "scroll"
    };

    const productItemsRow = this.state.productList.map(product => (
      <tr key={`${product.productName} - ${product.productVariation}`}>
        <td>{product.productName}</td>
        <td>{product.productVariation}</td>
        <td>{product.productSmallQuantity}</td>
        <td>{product.productMediumQuantity}</td>
        <td>{product.productLargeQuantity}</td>
      </tr>
    ));

    return (
      <div className="card mx-auto">
        <div className="card-body">
          <h5 className="card-title">Product List</h5>
          <div className="table-responsive" style={divStyle}>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Variation</th>
                  <th scope="col">S</th>
                  <th scope="col">M</th>
                  <th scope="col">L</th>
                </tr>
              </thead>
              <tbody>{productItemsRow}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
