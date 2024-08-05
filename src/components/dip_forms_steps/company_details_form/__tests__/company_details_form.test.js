import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, act, wait } from "@testing-library/react";

import { company_details_dip_data } from "./dummy_company_details_dip_data.json";
import CompanyDetailsForm from "../index";

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

const getCompanyDetailsForm = (props, initialStore) => {
  const store = createStore(() => ({
    dip: initialStore || {},
  }));

  return renderWithRedux(
    <BrowserRouter>
      {/* eslint-disable-next-line react/jsx-props-no-spreading, react/destructuring-assignment */}
      <CompanyDetailsForm {...props} />
    </BrowserRouter>,
    { store }
  );
};

describe("<CompanyDetailsForm>", () => {
  const testIfStepPassWithStore = async ({ store, howManyTimesSubmitted }) => {
    const onSubmit = jest.fn(() => {});

    const { getByText } = getCompanyDetailsForm(
      {
        finalizeStep: onSubmit,
      },
      store
    );

    const continueButton = getByText(/Continue/i);

    act(() => {
      fireEvent.click(continueButton);
    });
    await wait(() =>
      expect(onSubmit).toHaveBeenCalledTimes(howManyTimesSubmitted)
    );
  };

  it("Validation doesn't pass while fields aren't filled", async () => {
    await testIfStepPassWithStore({
      store: {},
      howManyTimesSubmitted: 0,
    });
  });

  it("Step pass while company data is in dip store.", async () => {
    await testIfStepPassWithStore({
      store: company_details_dip_data,
      howManyTimesSubmitted: 1,
    });
  });

  it("Fills with N/A company number when not in CH selected", async () => {
    const onSubmit = jest.fn(() => {});

    const initState = {
      ContactType: "company",
      CompanyName: "foo",
      CompanyEmail: "valid@email.com",
    };

    const expectedState = {
      data: {
        ...initState,
        CompanyNumber: "N/A",
      },
      stepId: "contact_company",
    };
    const { getByText, getByLabelText } = getCompanyDetailsForm(
      {
        finalizeStep: onSubmit,
      },
      initState
    );

    const notInCompaniesHouseCheckbox = getByLabelText(
      /Not in Companies House/i
    );

    act(() => {
      fireEvent.click(notInCompaniesHouseCheckbox);
    });

    const continueButton = getByText(/Continue/i);

    act(() => {
      fireEvent.click(continueButton);
    });
    await wait(() => expect(onSubmit).toHaveBeenCalledWith(expectedState));
  });

  it("Can pass with N/A company number", async () => {
    const dataWithNACompanyNumber = {
      ...company_details_dip_data,
      CompanyNumber: "N/A",
    };
    await testIfStepPassWithStore({
      store: dataWithNACompanyNumber,
      howManyTimesSubmitted: 1,
    });
  });

  it.skip("Renders with a proper filled inputs. Editing dataset.", () => {});
  it.skip("Renders with a proper filled inputs. Creating dataset.", () => {});
});
