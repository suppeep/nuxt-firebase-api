import Firebase from "firebase/app";
import Admin from "firebase-admin";
import credentials from "./firebase-admin-init";

Admin.initializeApp(credentials);

Firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  appId: process.env.appId,
});

export const admin = Admin;
