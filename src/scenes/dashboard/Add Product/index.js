import React, { Component } from "react";
import { FormGroup } from "./components/formGroup";

import * as firebase from "firebase";

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
      productLargeQuantity: 0,
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
    const thisRef = this;
    this.uploadProductImages(this.files)
      .then(function(productImagesPaths) {
        var finalProduct = thisRef.state;
        finalProduct.productImages = productImagesPaths;

        const key = firebase
          .database()
          .ref("productList")
          .push().key;

        var updates = {};

        updates["productList/" + key] = finalProduct;

        firebase
          .database()
          .ref()
          .update(updates);
      })
      .catch(function(productImagesPaths) {
        console.log("productImagesPaths", productImagesPaths);
        console.log("thisRef.state.productImages", thisRef.state.productImages);
      });
  }

  handleChange = ({ target: { id, value, files, type } }) => {
    const thisRef = this;

    if (type === "file") {
      this.handleProductImageInput(files)
        .then(function(productImagesPaths) {
          thisRef.files = files;
          value = productImagesPaths;
          thisRef.setState({ [id]: value });
        })
        .catch(function(productImagesPaths) {
          console.log("ERROR", productImagesPaths);
        });
    } else {
      this.setState({ [id]: value });
    }
  };

  uploadProductImages(files) {
    const thisRef = this;
    const storageRef = firebase.storage().ref();
    this.productImagesPaths = [];
    const imagePathList = thisRef.state.productImages;

    return new Promise(function(resolve, reject) {
      for (var i = 0; i < imagePathList.length; i++) {
        var uploadTask = storageRef.child(imagePathList[i]).put(files[i]);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              snapshot.bytesTransferred / snapshot.totalBytes * 100;
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
                thisRef.productImagesPaths.push(downloadURL);
                if (
                  thisRef.productImagesPaths.length === imagePathList.length
                ) {
                  return thisRef.productImagesPaths
                    ? resolve(thisRef.productImagesPaths)
                    : reject(thisRef.productImagesPaths);
                }
              });
          }
        );
      }
    });
  }

  handleProductImageInput(files) {
    const thisRef = this;
    this.productImages = [];

    return new Promise(function(resolve, reject) {
      for (var i = 0; i < files.length; i++) {
        const productName = thisRef.state.productName.toLowerCase();
        const productVariation = thisRef.state.productVariation.toLowerCase();
        const productTitle = productName + " - " + productVariation;
        const name = +new Date() + "-" + files[i].name;

        thisRef.productImages.push(
          "images/products/" + productTitle + "/" + name
        );
      }
      return thisRef.productImages
        ? resolve(thisRef.productImages)
        : reject(thisRef.productImages);
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
