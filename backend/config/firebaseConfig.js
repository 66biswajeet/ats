// /backend/config/firebaseConfig.js

const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://resumate-mp-default-rtdb.firebaseio.com/",
});

const db = admin.firestore();

db.settings({
  ignoreUndefinedProperties: true, // Enables ignoring undefined properties
});
module.exports = { db };
