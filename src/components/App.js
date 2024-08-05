import React from "react";
import PropTypes from "prop-types";
import "styles/icomoon.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastProvider } from "react-toast-notifications";

import "utils/env";
import "utils/rollbar";
import "utils/axios_interceptors";
import { GlobalStyle } from "styles";
import store from "core/store";
import theme from "core/theme";
import { Provider as ProgressProvider, Progress } from "components/progress";
import { StyledInfoBox } from "components/templates/dip_flow_template/styled_dip_flow";

import AppRoutes from "./app_routes";
import NavBar from "./organisms/nav_bar";

const MyCustomToast = ({ appearance = "success", children }) => (
  <StyledInfoBox appearance={appearance}>{children}</StyledInfoBox>
);

MyCustomToast.propTypes = {
  appearance: PropTypes.string,
  children: PropTypes.node,
};

function App() {
  return (
    <Provider store={store}>
      <ProgressProvider>
        <ThemeProvider theme={theme}>
          <ToastProvider
            components={{ Toast: MyCustomToast }}
            autoDismiss={true}
          >
            <BrowserRouter>
              <GlobalStyle />
              <NavBar />
              <AppRoutes />
            </BrowserRouter>

            <Progress />
          </ToastProvider>
        </ThemeProvider>
      </ProgressProvider>
    </Provider>
  );
}

export default App;
