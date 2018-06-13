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
  .onCreate((snapshot, context) => {
    return sendInvoiceEmail(
      "bryan.brotonel98@gmail.com",
      "Bryan",
      snapshot.val()
    );
  });

// Sends a welcome email to the given user.
function sendInvoiceEmail(email, displayName, order) {
  const customerInfo = order.customerInfo;
  const cart = order.cart;
  const cartItems = cart.items;
  const orderTime = order.time;

  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };

  const date = moment(orderTime.timeStamp)
    .utcOffset(orderTime.offset)
    .format("DD/MM/YYYY");
  const time = moment(orderTime.timeStamp)
    .utcOffset(orderTime.offset)
    .format("hh:mm A");

  var cartItemRows = "";

  for (var i = 0; i < cart.itemCount; i++) {
    const cartItem = cartItems[i];
    cartItemRows += `<p> ${cartItem.itemQuantity} x ${cartItem.productName} - ${
      cartItem.productVariation
    } - ${cartItem.itemSize.charAt(0)} for $${cartItem.itemPrice}</p>`;
  }

  mailOptions.subject = `${APP_NAME}: An Order Has Been Placed!`;
  mailOptions.html = `
  <html>

  <head>
    <title>By Forte Invoice #${order.orderID}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.5/css/uikit.min.css" />
    <link href="https://fonts.googleapis.com/css?family=Oswald|Roboto" rel="stylesheet">
  </head>

  <style media="screen">
    p {
      font-family: 'Roboto', sans-serif;
    }

    h3,
    h2 {
      font-family: 'Oswald', sans-serif;
    }
  </style>

  <body>
    <div class="container py-3 h-100">
      <div class="row justify-content-between">
        <div class="col-9">
          <h3 class="my-0">By Forte</h3>
          <a href="mailto:supplybyforte@gmail.com">supplybyforte@gmail.com</a>
        </div>
        <div class="col-3 text-right align-middle">
          <img src="https://firebasestorage.googleapis.com/v0/b/by-forte.appspot.com/o/logos%2FBy%20Forte%20Primary%20Logo%20Email.png?alt=media&token=66447c8f-373b-40e9-b51e-45ff1a994ff0" alt="By Forte">
        </div>
      </div>
      <div>
        <br>
        <div>
          <h2>Order #${order.orderID}</h2>
          <p>To: ${customerInfo.firstName} ${customerInfo.lastName}</a>
          </p>
        </div>
        <br>
        <div>
          <p>Thank you for placing your order with By Forte. Your order number and details are listed
             below. All e-Transfers should be directed to either Bryan at
             <a href="mailto:bryan.brotonel98@gmail.ca">bryan.brotonel98@gmail.ca</a> or Trisha at
             <a href="mailto:tfranciaa@gmail.com.">tfranciaa@gmail.com.</a>
           </p>
           <p>
             The deadline for all payments are June 16, 2018 7 PM. All orders will begin processing after the deadline.
           </p>
        </div>
        <br>
        <div>
          <p><strong>Date:</strong> ${date} ${time}<br>
          <strong>Order Number:</strong> #${order.orderID}<br>
          <strong>Payment Method:</strong> E-Transfer/Cash
        </p>
        </div>
        <hr>
        <br>
        <div>
          ${cartItemRows}
        </div>
        <br />
      </div>
    </div>
  </body>

  </html>
  `;
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log(`${APP_NAME} invoice sent to:`, email);
  });
}
