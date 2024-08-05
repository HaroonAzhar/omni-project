import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

import { ISVDI6, IS_DEVELOPMENT } from "utils/env";
import { rollbar } from "utils";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    IS_DEVELOPMENT || ISVDI6
      ? firebase.auth.GithubAuthProvider.PROVIDER_ID
      : "",
    {
      provider: "microsoft.com",
      customParameters: {
        tenant: process.env.REACT_APP_MICROSOFT_TENANT,
      },
    },
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const Login = () => {
  let firebaseAuth = null;
  try {
    firebaseAuth = firebase.auth();
  } catch (error) {
    rollbar.error(error);
  }
  return (
    <>
      {firebaseAuth ? (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
      ) : (
        <div>Firebase error</div>
      )}
    </>
  );
};

export default Login;
