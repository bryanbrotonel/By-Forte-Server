import React, { Component } from "react";

import firebase from "firebase";

export class OrderList extends Component {
  constructor() {
    super();

    this.state = {
      orders: [],
      initialOrdersLoaded: false
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.getOrders = this.getOrders.bind(this);
  }

  componentDidUpdate() {
    console.log("updated");
  }

  componentDidMount() {
    const thisRef = this;
    this.getOrders()
      .then(function(orders) {
        console.log("then", orders);
        thisRef.setState({
          orders: orders,
          initialOrdersLoaded: true
        });
      })
      .catch(function(order) {
        console.log("error: ", order);
      });
  }

  getOrders() {
    const thisRef = this;
    this.orderList = [];
    return new Promise(function(resolve, reject) {
      var orders = [];
      firebase
        .database()
        .ref("orderList")
        .on("child_added", function(childSnapshot) {
          orders.push(childSnapshot.val());
          if (thisRef.state.initialOrdersLoaded) {
            thisRef.setState({
              orders: orders
            });
          }
          return orders ? resolve(orders) : reject(orders);
        });
    });
  }

  render() {
    var divStyle = {
      height: "250px",
      overflow: "scroll"
    };

    const orderRows = this.state.orders.map(order => (
      <tr key={order.orderID}>
        <td>{order.orderID}</td>
        <td>
          {order.customerInfo.firstName} {order.customerInfo.lastName}
        </td>
        <td>{order.date}</td>
        <td>{order.time}</td>
      </tr>
    ));

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
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>{orderRows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
