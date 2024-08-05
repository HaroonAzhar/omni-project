import firebase from "firebase";

import { rollbar } from "utils";

export const getUserTokenFromFirebase = async () => {
  let firebaseAuth = null;
  try {
    firebaseAuth = firebase.auth();
    if (!firebaseAuth.currentUser) {
      return "";
    }
    return await firebaseAuth.currentUser.getIdToken();
  } catch (error) {
    rollbar.error(error);
    return "";
  }
};
