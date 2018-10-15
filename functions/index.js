"use strict";

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const moment = require("moment");

const APP_NAME = "By Forte";

const gmailEmail = functions.config().byforte.email;
const gmailPassword = functions.config().byforte.password;

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// Send order invoice to shopper
exports.sendOrderInvoice = functions.database
  .ref("/orderList/{pushID}")
  .onCreate(snapshot => {
    const order = snapshot.val();
    return sendInvoiceEmail(order.customerInfo.email, order);
  });

// Sends a welcome email to the given user.
function sendInvoiceEmail(email, order) {
  const customerInfo = order.customerInfo;
  const cart = order.cart;
  const cartItems = cart.items;
  const orderTime = order.time;
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };

  // Format cart items
  var cartItemRows = "";
  for (var i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];

    cartItemRows += `<p> ${cartItem.itemQuantity} x ${cartItem.productName} - ${
      cartItem.productVariation
    } - ${cartItem.itemSize.charAt(0)} for $${cartItem.itemPrice}</p>`;
  }

  // Get current date and time
  const date = moment(orderTime.timeStamp)
    .utcOffset(orderTime.offset)
    .format("DD/MM/YYYY");
  const time = moment(orderTime.timeStamp)
    .utcOffset(orderTime.offset)
    .format("hh:mm A");

  // Set mail options for invoice mail sending thorough nodemailer
  mailOptions.subject = `${APP_NAME} Order #${order.orderID} Invoice`;
  mailOptions.html = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
  <html>

  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>By Forte Invoice #${order.orderID}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.5/css/uikit.min.css" />
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">


    <style>
      @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        src: local('Lato'), local('Lato'), url('https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXiWtFCc.woff2') format('truetype');
      }

      @font-face {
        font-family: 'Helvetica';
        font-style: normal;
        font-weight: 400;
      }

      body {
        width: 100%;
        margin: 0px;
      }
    </style>
  </head>

  <body style="width: 100%; margin: 0px;">
    <div style="margin: 0 auto; padding: 0 20px; max-width: 800px;">
      <div style="padding-top: 20px;">
        <div style="display: inline-block;">
          <h2 style="font-family: 'Lato', sans-serif; margin: 0;">By Forte</h2>
          <a href="mailto:${gmailEmail}">${gmailEmail}</a>
        </div>
        <div style="display: inline-block; float: right;">
          <img src="https://firebasestorage.googleapis.com/v0/b/by-forte.appspot.com/o/logos%2F%20By%20Forte%20Email%20Logo.png?alt=media&token=921650de-d8ba-4790-b37d-1d4b66fda53f" alt="By Forte">
        </div>
      </div>
      <div>
        <br>
        <div>
          <h3 style="font-family: 'Lato', sans-serif; margin: 0;">Order #${order.orderID}</h3>
          <p style="font-family: 'Helvetica', sans-serif;">To: ${customerInfo.firstName + " " + customerInfo.lastName}
          </p>
        </div>
        <div style="font-family: 'Helvetica', sans-serif; ">
          <p>Thank you for placing your order with By Forte. Your order number and details are listed below. All e-Transfers should be directed to
            <a href="mailto:${gmailEmail}">${gmailEmail}</a>.
          </p>
          <p>
          The deadline for all payments is Oct 22, 2018 11: 59 PM. All orders will begin processing after the deadline.
          </p>
        </div>
        <div>
          <p style="font-family: 'Helvetica', sans-serif;"><strong>Date:</strong> ${date} ${time}<br>
            <strong>Order Number:</strong> #${order.orderID}<br>
            <strong>Payment Method:</strong> E-Transfer/Cash
          </p>
        </div>
        <hr>
        <br>
        <div>
          ${cartItemRows}
        </div>
        <br>
        <div style="background-color: #FAFAFA; padding: 10px 10px 10px 0; font-size: 20px; font-family: 'Helvetica', sans-serif;" align="right">
          <div>
            <p style="margin: 0;">
              <strong>Subtotal:</strong> $${cart.subtotal}</p>
          </div>
          <div>
            <p style="margin: 0;">
              <strong>Total:</strong> $${cart.total}</p>
          </div>
        </div>
        <br>
        <div style="" align="center">
          <p style="font-family: 'Helvetica', sans-serif;">Thank you for your purchase <br> If you have any questions, please contact us by email at
            <a href="mailto:${gmailEmail}">${gmailEmail}</a>.<br>
            <strong><a href="https://byforte.store">WWW.BYFORTE.STORE</a></strong>
          </p>
        </div>
      </div>
    </div>
  </body>

  </html>
  `;
  return mailTransport.sendMail(mailOptions).then(() => {
    // Log to firebase console that invoice was sent
    return console.log(`${APP_NAME} invoice sent to:`, email);
  });
}
