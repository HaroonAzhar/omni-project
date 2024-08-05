import React from "react";
import "utils/env";
import "utils/rollbar";
import { Provider } from "react-redux";
import { PDFViewer } from "@react-pdf/renderer";

import store from "core/store";

import DipPdf from "../pdf";
import * as fakeData from "./__mock__/fields_data";

function AppPdf() {
  return (
    <PDFViewer style={{ width: "100%", height: "1200px", overflow: "hidden" }}>
      <Provider store={store}>
        <DipPdf data={fakeData.dip} />
      </Provider>
    </PDFViewer>
  );
}

export default AppPdf;
