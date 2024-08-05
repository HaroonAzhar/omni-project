import React from "react";
import { ThemeProvider } from "styled-components";
import { createStore } from "redux";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import { Provider as ProgressProvider } from "components/progress";

export default (Component, props, initialStore = {}) => {
  const store = createStore(() => initialStore);

  /* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment */
  return render(
    <Provider store={store}>
      <ThemeProvider theme={{ colors: {} }}>
        <ProgressProvider>
          <ToastProvider>
            <BrowserRouter>
              <Component {...props} />
            </BrowserRouter>
          </ToastProvider>
        </ProgressProvider>
      </ThemeProvider>
    </Provider>
  );
};
