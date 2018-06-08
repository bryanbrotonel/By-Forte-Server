import React, { Component } from "react";

import firebase from "firebase";

import "./styles.css";

export class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventory: [],
      initialOrdersLoaded: false,
      initialEdit: false
    };
  }

  componentDidMount() {
    const self = this;

    this.getInventory()
      .then(function(inventory) {
        self.setState({
          inventory: inventory,
          initialOrdersLoaded: true
        });
      })
      .catch(function(inventory) {
        console.log("getinventory: error", inventory);
      });

    this.editinventory()
      .then(function(inventory) {
        self.setState({
          inventory: inventory,
          initialEdit: true
        });
      })
      .catch(function(inventory) {
        console.log("editinventory: error", inventory);
      });
  }

  getInventory() {
    const self = this;

    return new Promise(function(resolve, reject) {
      var inventoryItems = [];
      firebase
        .database()
        .ref("inventory")
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

          inventoryItems.push(productItem);

          if (self.state.initialOrdersLoaded) {
            self.setState({
              inventory: inventoryItems
            });
          }

          return inventoryItems ? resolve(inventoryItems) : reject(inventoryItems);
        });
    });
  }

  editinventory() {
    const self = this;

    return new Promise(function(resolve, reject) {
      firebase
        .database()
        .ref("inventory")
        .on("child_changed", function(childSnapshot) {
          const { inventory, initialEdit } = self.state;
          const childSnapshotData = childSnapshot.val();

          var index = inventory.findIndex(
            x =>
              x.productName === childSnapshotData.productName &&
              x.productVariation === childSnapshotData.productVariation
          );

          inventory[index] = childSnapshotData;

          if (initialEdit) {
            self.setState({
              inventory: inventory
            });
          }

          return inventory ? resolve(inventory) : reject(inventory);
        });
    });
  }

  render() {
    var divStyle = {
      height: "250px",
      overflow: "scroll"
    };

    const productItemsRow = this.state.inventory.map(product => (
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
          <h5 className="card-title">Inventory</h5>
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
