import React from "react";
import { createStore } from "redux";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import FinancialDetailsCalculator from "../index";

const styledComponentsTheme = {
  colors: { primary: "#000000" },
};

const reducer = () => {};
const renderWithRedux = (
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

export const getFinancialDetailsCalculator = (props, initialStore) => {
  const store = createStore(() => ({
    dip: initialStore || {},
    calculator: {},
  }));

  /* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment */
  return renderWithRedux(
    <ThemeProvider theme={styledComponentsTheme}>
      <BrowserRouter>
        <FinancialDetailsCalculator
          {...props}
          cacheCalculatorData={() => {}}
          calculatorCache={{}}
        />
      </BrowserRouter>
    </ThemeProvider>,
    { store }
  );
};

test.skip("skip helper file", () => {});
