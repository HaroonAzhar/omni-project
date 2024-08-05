import MockAdapter from "axios-mock-adapter";
import { fireEvent, act, wait } from "@testing-library/react";

import { CALCULATOR_URL } from "utils/urls";
import { calculatorAxiosInstance } from "utils/requests/calculator";

import { calculatorStarterStore } from "./dummy_calculator_store.json";
import { getFinancialDetailsCalculator } from "./helpers";

const mock = new MockAdapter(calculatorAxiosInstance);

it("Back button call goStepBack function", async () => {
  const goStepBack = jest.fn(() => {});

  const { getByText } = getFinancialDetailsCalculator({
    goStepBack,
  });
  const backButton = getByText(/Back/i);

  act(() => {
    fireEvent.click(backButton);
  });
  await wait(() => expect(goStepBack).toHaveBeenCalledTimes(1));
});

it("Validation doesn't pass when fields are not filled", async () => {
  const onSubmit = jest.fn(() => {});

  const { getByText } = getFinancialDetailsCalculator({
    finalizeStep: onSubmit,
    showInfoBox: () => {},
  });

  const continueButton = getByText(/Continue/i);

  act(() => {
    fireEvent.click(continueButton);
  });
  await wait(() => expect(onSubmit).toHaveBeenCalledTimes(0));
  // try to fail this test by init calc with ready state
});

it("Validation doesn't pass when calculator fail", async () => {
  const calculatorEndpoint = jest.setTimeout(15000).fn(() => [500, {}]);
  mock.onPost(CALCULATOR_URL).reply(calculatorEndpoint);

  const onSubmit = jest.fn(() => {});
  const showInfoBox = jest.fn(() => {});

  const { getByText, getByLabelText } = getFinancialDetailsCalculator(
    {
      finalizeStep: onSubmit,
      showInfoBox,
    },
    calculatorStarterStore
  );

  const continueButton = getByText(/Continue/i);
  const textInput = getByLabelText(/Interest Rate/i);

  act(() => {
    fireEvent.change(textInput, { target: { value: 11 } });
  });
  await wait(() => expect(calculatorEndpoint).toHaveBeenCalledTimes(1));
  await wait(() => expect(showInfoBox).toHaveBeenCalledTimes(1));

  act(() => {
    fireEvent.click(continueButton);
  });
  await wait(() => expect(onSubmit).toHaveBeenCalledTimes(0));
});
