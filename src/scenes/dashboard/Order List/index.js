import React, { Component } from "react";

import firebase from "firebase";
import Loadable from "react-loadable";

import OrderRow from "./components/Order Row";
import Loading from "./../../../components/Loading";

export class OrderList extends Component {
  constructor() {
    super();

    this.state = {
      orders: [],
      initialOrdersLoaded: false,
      modal: false,
      selectedOrder: null
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(order) {
    this.setState({
      modal: !this.state.modal,
      selectedOrder: order
    });
  }

  componentDidMount() {
    const self = this;
    this.getOrders()
      .then(function(orders) {
        self.setState({
          orders: orders,
          initialOrdersLoaded: true
        });
      })
      .catch(function(order) {
        console.log("error: ", order);
      });
  }

  getOrders() {
    const self = this;

    return new Promise(function(resolve, reject) {
      var orders = [];
      firebase
        .database()
        .ref("orderList")
        .on("child_added", function(childSnapshot) {
          orders.push(childSnapshot.val());

          if (self.state.initialOrdersLoaded) {
            self.setState({
              orders: orders
            });
          }
          return orders ? resolve(orders) : reject(orders);
        });
    });
  }

  render() {
    const { orders, selectedOrder, modal } = this.state;
    console.log('order list modal', modal);

    var divStyle = {
      height: "250px",
      overflow: "scroll"
    };

    const orderRows = orders.map(order => (
      <OrderRow
        key={order.orderID}
        order={order}
        modal={modal}
        toggle={this.toggleModal}
      />
    ));

    const OrderModalLoading = Loadable({
      loader: () => import("./components/Order Modal"),
      loading: Loading,
      render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} />;
      }
    });

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
        {this.state.selectedOrder !== null ? (
          <OrderModalLoading
            selectedOrder={selectedOrder}
            toggle={this.toggleModal}
            modal={modal}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
