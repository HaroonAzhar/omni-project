import React from "react";
import ReactDOM from "react-dom";

import { initializeFirebase } from "components/login/initialize_firebase";

import App from "./components/App";
import AppPdf from "./components/pages/dip_flow/__tests__/App.pdf";
import * as serviceWorker from "./serviceWorker";
const shouldRunPdfRenderer = process.env.REACT_APP_RUN_PDF_VIEWER_APP;
let AppInstance = App;

if (shouldRunPdfRenderer === "dip") {
  AppInstance = AppPdf;
}

initializeFirebase();

ReactDOM.render(<AppInstance />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
