import { fireEvent, act, wait } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import { getComponentWithRedux } from "test_helpers";
import { apiAxiosInstance } from "utils/requests/api";

import IntroducerDetailsForm from "./index";

const defaultProps = {
  finalizeStep: jest.fn(() => {}),
  goStepBack: jest.fn(() => {}),
  canSkipAddressValidation: false,
};

const mock = new MockAdapter(apiAxiosInstance);

describe("IntroducerDetailsForm", () => {
  it("<IntroducerDetailsForm>", async () => {
    const resp = jest.fn(() => [200, { data: [] }]);
    mock.onGet(/.*/).reply(resp);
    const { getByLabelText, getByText } = getComponentWithRedux(
      IntroducerDetailsForm,
      defaultProps,
      {
        dip: {},
      }
    );
    const directApplication = getByLabelText(/Direct Application/i);
    const backButton = getByText(/Back/i);
    const continueButton = getByText(/Continue/i);

    act(() => {
      fireEvent.click(continueButton);
    });
    await wait(() =>
      expect(defaultProps.finalizeStep).toHaveBeenCalledTimes(0)
    );

    act(() => {
      fireEvent.click(directApplication);
    });
    expect(directApplication.value).toBe("direct_application");

    act(() => {
      fireEvent.click(backButton);
    });
    expect(defaultProps.goStepBack).toHaveBeenCalledTimes(1);

    act(() => {
      fireEvent.click(continueButton);
    });
    await wait(() =>
      expect(defaultProps.finalizeStep).toHaveBeenCalledTimes(1)
    );
  });
});
