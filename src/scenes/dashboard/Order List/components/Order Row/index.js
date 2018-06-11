import React, { Component } from "react";
import PropTypes from "prop-types";

export default class OrderRow extends Component {
  render() {
    const { order, toggle } = this.props;

    const customerInfo = order.customerInfo;

    return (
      <React.Fragment>
        <tr
          key={order.orderID}
          id={order.orderID}
          onClick={function() {
            toggle(order);
          }}
        >
          <td>{order.orderID}</td>
          <td>
            {customerInfo.firstName} {customerInfo.lastName}
          </td>
          <td>{order.date}</td>
          <td>{order.time}</td>
        </tr>
      </React.Fragment>
    );
  }
}

OrderRow.propTypes = {
  order: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
};
