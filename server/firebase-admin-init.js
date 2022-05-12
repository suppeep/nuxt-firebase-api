const admin = require("firebase-admin");
const key = require("./serviceAccounts.json");

let adminApp;

adminApp =
  admin.apps.length > 0
    ? admin
    : admin.initializeApp({
        credential: admin.credential.cert(key),
        databaseURL: process.env.databaseURL,
        databaseAuthVariableOverride: null,
      });

export default adminApp;
