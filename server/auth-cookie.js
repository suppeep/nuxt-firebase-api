/**
 * This example uses my generic firestore u can find here https://github.com/suppeep/generic-firebase
 */

import Cookies from "js-cookie";
import { auth } from "@/firebase/async-firestore";

export default ({ store, redirect, route }) => {
  checkAuthState().then((user) => {
    if (user) {
      // Check if the __session cookie exists but there is no user uid in the vuex
      // Which means our serverMiddleware didn't run as cookie wasn't exists during page load
      if (typeof Cookies.get("__session") !== "undefined") {}
    } else {
      if (route.name === "login") return;
      redirect("/login");
    }
  });
};

/**
 * Creates the __session cookie with JWT idToken (expires in 1 hour)
 * When onAuthStateChanged occours and an user exists
 * @returns Promise - so that we can do stuffs after the cookie is created
 */
const checkAuthState = () => {
  return new Promise(async (resolve) => {
    await (
      await auth()
    ).onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken(true).then(async (idToken) => {
          // 1 hour = 0.0416666667 Days
          Cookies.set("__session", idToken, {
            expires: 0.0416666667,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
          });

          resolve(user);
        });
      } else {
        resolve();
      }
    });
  });
};
