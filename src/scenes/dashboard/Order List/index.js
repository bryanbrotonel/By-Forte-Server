import React, { Component } from "react";
import "./styles.css";

export class OrderList extends Component {
  render() {
    var divStyle = {
      "height": "25vh",
      overflow: "scroll"
    };

    return (
      <React.Fragment>
        <div className="card mx-auto">
          <div className="card-body">
            <h5 className="card-title">Order List</h5>
            <div className=" table-responsive" style={divStyle}>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>001</td>
                    <td>Adrian Soliman</td>
                    <td>05/10/2018</td>
                  </tr>
                  <tr>
                    <td>002</td>
                    <td>Mark Coquillo</td>
                    <td>05/10/2018</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
