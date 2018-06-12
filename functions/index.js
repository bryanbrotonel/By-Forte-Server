const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// CHECKOUT CLOUD FUNCTIONS
exports.addOrderTimeStamp = functions.database
  .ref("/orderList/{pushID}")
  .onCreate((snapshot, context) => {
    const pushID = context.params.pushID;

    const timeStamp = getTimeStamp();

    // Return promises setting time and date
    return Promise.all([
      snapshot.ref.parent.child(pushID + "/date").set(timeStamp[0]),
      snapshot.ref.parent.child(pushID + "/time").set(timeStamp[1])
    ]);
  });

function getTimeStamp() {
  // Get date and time
  const date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Assing date and time to string
  const strDate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  const strTime = hours + ":" + minutes + " " + ampm;

  return [strDate, strTime];
}
