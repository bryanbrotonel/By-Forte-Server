import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment"

export default class OrderRow extends Component {

  render() {
    const { order, toggle } = this.props;
    const customerInfo = order.customerInfo;
    const orderTime = order.time

    const date = moment(orderTime.timeStamp).format("DD/MM/YYYY");
    const time = moment(orderTime.timeStamp).format("hh:mm A");

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
          <td>{date}</td>
          <td>{time}</td>
        </tr>
      </React.Fragment>
    );
  }
}

OrderRow.propTypes = {
  order: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
};
