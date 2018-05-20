import React, { Component } from "react";
import "./styles.css";

export class AddProduct extends Component {
  render() {
    var divStyle = {
      minheight: "100%"
    };

    return (
      <React.Fragment>
        <div className="card mx-auto" style={divStyle}>
          <div className="card-body">
            <h5 className="card-title">Add Product</h5>
            <div className="card-content table-responsive">
              <form>
                <div className="row">
                  <div className="col-6 form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product Name"
                    />
                  </div>
                  <div className="col-6 form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Variation"
                    />
                  </div>
                  <div className="col-12 form-group">
                    <textarea
                      className="form-control"
                      id="description"
                      rows="<2></2>"
                      placeholder="Description divided by commas ','"
                    />
                  </div>
                  <div className="form-group col-6">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="small"
                        value="small"
                      />
                      <label className="form-check-label" htmlFor="small">
                        S
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="medium"
                        value="medium"
                      />
                      <label className="form-check-label" htmlFor="medium">
                        M
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="large"
                        value="large"
                      />
                      <label className="form-check-label" htmlFor="large">
                        L
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-6">
                    <input type="file" id="image" accept="image/*" />
                  </div>
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
