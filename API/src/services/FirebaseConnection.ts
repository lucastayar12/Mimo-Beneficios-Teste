
import admin from "firebase-admin";

var serviceAccount = require("../../mimoapi-e5734-firebase-adminsdk-fbsvc-636c3b2d11.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;