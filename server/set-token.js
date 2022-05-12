import Cookies from "cookies";
import admin from "./firebase-admin-init";

export default (req, res, next) => {
    getIdTokenFromRequest(req, res).then(idToken => {
        if (idToken) {
            addDecodedIdTokenToRequest(idToken, req).then(() => {
                fetchUserData(req.user, req).then(() => {
                    next();
                });
            });
        } else {
            next();
        }
    });
};

function getIdTokenFromRequest(req, res) {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        return Promise.resolve(req.headers.authorization.split("Bearer")[1]);
    }
    return new Promise(resolve => {
        const cookie = new Cookies(req, res);
        if (typeof cookie.get("__session") !== "undefined") {
            resolve(cookie.get("__session"));
        } else {
            resolve();
        }
    });
}

/**
 * Returns a Promise with the Decoded ID Token and adds it to req.user.
 */
function addDecodedIdTokenToRequest(idToken, req) {
    return admin
        .auth()
        .verifyIdToken(idToken)
        .then(decodedIdToken => {
            req.user = decodedIdToken;
        })
        .catch(err => {
            console.error("Error while verifying id token:", err);
        });
}

function fetchUserData(user, req) {
    return admin
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then(doc => {
            if (doc.exists) {
                const user = doc.data();
                req.userData = user;
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}