import React, { Component } from "react";
import { FormGroup } from "./components/formGroup";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: "",
      productVariation: "",
      productDescription: "",
      productSmallQuantity: 0,
      productMediumQuantity: 0,
      productLargeQuantity: 0,
      productPrice: 0,
      productImages: []
    };

    this.files = [];

    this.uploadProductImages = this.uploadProductImages.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleProductImageInput = this.handleProductImageInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const self = this;
    this.uploadProductImages(this.files)
      .then(function(productImagesPaths) {
        var finalProduct = self.state;
        finalProduct.productImages = productImagesPaths;
        var updates = {};

        updates[
          "inventory/" +
            finalProduct.productName.toLowerCase() +
            " - " +
            finalProduct.productVariation.toLowerCase()
        ] = finalProduct;

        firebase
          .database()
          .ref()
          .update(updates);

        alert(
          "Successfully uploaded " +
            finalProduct.productName +
            " - " +
            finalProduct.productVariation
        );
      })
      .catch(function(productImagesPaths) {
        console.log("productImagesPaths", productImagesPaths);
        console.log("self.state.productImages", self.state.productImages);
      });
  }

  handleChange = ({ target: { id, value, files, type } }) => {
    const self = this;

    if (type === "file") {
      this.handleProductImageInput(files)
        .then(function(productImagesPaths) {
          self.files = files;
          value = productImagesPaths;
          self.setState({ [id]: value });
        })
        .catch(function(productImagesPaths) {
          console.log("ERROR", productImagesPaths);
        });
    } else {
      this.setState({ [id]: value });
    }
  };

  uploadProductImages(files) {
    const self = this;
    const storageRef = firebase.storage().ref();
    this.productImagesPaths = [];
    const imagePathList = self.state.productImages;

    return new Promise(function(resolve, reject) {
      for (var i = 0; i < imagePathList.length; i++) {
        var uploadTask = storageRef.child(imagePathList[i]).put(files[i]);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          function(error) {
            console.log(error.code);
          },
          // eslint-disable-next-line
          function() {
            // Upload completed successfully
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                self.productImagesPaths.push(downloadURL);
                if (self.productImagesPaths.length === imagePathList.length) {
                  return self.productImagesPaths
                    ? resolve(self.productImagesPaths)
                    : reject(self.productImagesPaths);
                }
              });
          }
        );
      }
    });
  }

  handleProductImageInput(files) {
    const self = this;
    this.productImages = [];

    return new Promise(function(resolve, reject) {
      for (var i = 0; i < files.length; i++) {
        const productName = self.state.productName.toLowerCase();
        const productVariation = self.state.productVariation.toLowerCase();
        const productTitle = productName + " - " + productVariation;
        const name = +new Date() + "-" + files[i].name;

        self.productImages.push("images/products/" + productTitle + "/" + name);
      }
      return self.productImages
        ? resolve(self.productImages)
        : reject(self.productImages);
    });
  }

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
                    id="productPrice"
                    name="Price"
                    type="number"
                    value={this.state.productPrice}
                    onChange={this.handleChange}
                  />
                  <FormGroup
                    onChange={this.handleChange}
                    id="productDescription"
                    type="textarea"
                    name="Description"
                  />
                  <FormGroup
                    onChange={this.handleChange}
                    id="productImages"
                    type="file"
                    name="image"
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Add Product"
                />
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
