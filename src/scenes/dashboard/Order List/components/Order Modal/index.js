import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

export default class OrderModal extends Component {
  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }

  onKeyPressed = event => {
    if (event.key === "Escape") {
      this.props.toggle(null);
    }
  };

  render() {
    const { modal, toggle, selectedOrder } = this.props;
    const cart = selectedOrder.cart;

    const customerInfo = selectedOrder.customerInfo;

    const itemRows = cart.items.map(item => (
      <tr key={`${item.productName} - ${item.productVariation}`}>
        <td>{item.productName}</td>
        <td>{item.productVariation}</td>
        <td>{item.itemSize.slice(0, 1)}</td>
        <td>{item.itemQuantity}</td>
      </tr>
    ));

    return (
      <Modal
        isOpen={modal}
        toggle={toggle}
        onKeyDown={this.onKeyPressed}
        tabIndex="0"
      >
        <ModalHeader toggle={toggle}>
          Order: {selectedOrder.orderID}
        </ModalHeader>
        <ModalBody>
          <div>
            <h4>
              {customerInfo.firstName} {customerInfo.lastName}
            </h4>
            <h6>{customerInfo.email}</h6>
            <h6 className="text-muted">Cart ({cart.itemCount})</h6>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Variation</th>
                  <th scope="col">Size</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>{itemRows}</tbody>
            </table>
            <hr />
            <div className="text-right">
              <h6>Subototal: ${cart.subtotal}</h6>
              <h5>Total: ${cart.total}</h5>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => toggle(null)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

OrderModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selectedOrder: PropTypes.object.isRequired
};
