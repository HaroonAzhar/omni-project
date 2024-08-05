import { useEffect } from "react";
import firebase from "firebase";
import { useDispatch } from "react-redux";

import { addUserToken, addUserEmail } from "store/user";
import { rollbar } from "utils";

const useFirebaseLoginStatus = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let firebaseAuth = null;
    try {
      firebaseAuth = firebase.auth();
    } catch (error) {
      rollbar.error(error);
      return;
    }
    return firebaseAuth.onIdTokenChanged((user) => {
      if (!user) {
        dispatch(addUserEmail({}));
        dispatch(addUserToken({}));
        return;
      }
      user.getIdToken().then((token) => {
        dispatch(addUserEmail({ email: user.email }));
        dispatch(addUserToken({ token }));
      });
    });
  }, [dispatch]);
};

export default useFirebaseLoginStatus;
