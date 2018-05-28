import React, { Component } from "react";

import firebase from "firebase";

import "./styles.css";

export class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: []
    };
  }

  componentDidMount() {
    const thisRef = this;

    this.productItems = [];

    firebase
      .database()
      .ref("productList")
      .once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();

          let productItem = {
            productName: childData.productName,
            productVariation: childData.productVariation,
            productMaterial: childData.productMaterial,
            productPrint: childData.productPrint,
            productSmallQuantity: childData.productSmallQuantity,
            productMediumQuantity: childData.productMediumQuantity,
            productLargeQuantity: childData.productLargeQuantity
          };

          thisRef.productItems.push(productItem);
        });
        thisRef.setState({
          productList: thisRef.productItems
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
