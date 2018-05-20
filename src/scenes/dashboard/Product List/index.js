import React, { Component } from "react";
import "./styles.css";

export class ProductList extends Component {
  render() {
    var divStyle = {};

    return (
      <React.Fragment>
        <div className="card mx-auto" style={divStyle}>
          <div className="card-body">
            <h5 className="card-title">Product List</h5>
            <div className="card-content">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Variation</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>BY FORTE TEE</td>
                    <td>WHITE</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>BY FORTE TEE</td>
                    <td>YELLOW</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>MANTRA TEE</td>
                    <td>GREY</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>MANTRA TEE</td>
                    <td>NORTH CAROLINA BLUE</td>
                    <td>10</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
            {/* <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Architecto nobis eius quibusdam, assumenda deleniti rem, quidem
              culpa soluta debitis. Molestias dolor totam dolorem, labore
              voluptas possimus nisi atque error aliquid.
            </p> */}
            {/* <a href="#" className="card-link">
              Card link
            </a>
            <a href="#" className="card-link">
              Another link
            </a> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
