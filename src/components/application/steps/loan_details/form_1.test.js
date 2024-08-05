import { wait } from "@testing-library/react";

import { getComponentWithRedux, setupGoogleApiMock } from "test_helpers";
import { currencyFormat } from "utils";

import Form1 from "./form_1";

describe("<LoanDetailsForm1>", () => {
  const getComponentWithStoreContent = (store = {}) =>
    getComponentWithRedux(
      Form1,
      {
        finalizeStep: () => {},
        goStepBack: () => {},
      },
      {
        application: {},
        calculator: {},
        ...store,
      }
    );

  beforeAll(() => {
    setupGoogleApiMock();
  });

  describe("Net loan", () => {
    const formLabel = /Initial net loan required/i;
    const net_amount_of_first_advance = 10000.55;

    const calculator_response = {
      net_amount_of_first_advance,
    };
    it("Fill net loan from redux", async () => {
      const { getByLabelText } = getComponentWithStoreContent({
        calculator: {
          calculatorResponse: calculator_response,
        },
      });

      const formField = getByLabelText(formLabel);

      await wait(() => {
        expect(formField.value).toBe(
          currencyFormat(net_amount_of_first_advance)
        );
      });
    });

    it("Does not fill net loan if not present in redux", async () => {
      const { getByLabelText } = getComponentWithStoreContent();

      const formField = getByLabelText(formLabel);

      await wait(() => {
        expect(formField.value).toBe("");
      });
    });

    it("Fill net loan from calculator_response over application_loan_details ", async () => {
      const initial_net_loan = 1;
      const application_loan_details = {
        initial_net_loan,
      };
      const { getByLabelText } = getComponentWithStoreContent({
        application: {
          application_loan_details,
        },
        calculator: {
          calculatorResponse: calculator_response,
        },
      });

      const formField = getByLabelText(formLabel);

      await wait(() => {
        expect(formField.value).toBe(
          currencyFormat(net_amount_of_first_advance)
        );
      });
    });
  });

  describe("Further draw downs", () => {
    const formLabel = /Further borrowing required for works/i;
    const further_draw_downs = 10000.23;

    it("Fill further draw downs from redux", async () => {
      const { getByLabelText } = getComponentWithStoreContent({
        application: {
          further_draw_downs,
        },
      });

      const formField = getByLabelText(formLabel);

      await wait(() => {
        expect(formField.value).toBe(currencyFormat(further_draw_downs));
      });
    });

    it("Does not fill further draw downs if not present in redux", async () => {
      const { getByLabelText } = getComponentWithStoreContent();

      const formField = getByLabelText(formLabel);

      await wait(() => {
        expect(formField.value).toBe("");
      });
    });

    it("Fill further draw downs from calculator_response over application_loan_details", async () => {
      const further_draw_downs_borrowing = 1;
      const application_loan_details = {
        further_draw_downs_borrowing,
      };
      const { getByLabelText } = getComponentWithStoreContent({
        application: {
          application_loan_details,
          further_draw_downs,
        },
      });

      const formField = getByLabelText(formLabel);

      await wait(() => {
        expect(formField.value).toBe(currencyFormat(further_draw_downs));
      });
    });
  });

  describe("Term (months)", () => {
    const formLabel = /Term \(months\)/i;
    const loan_term = 10;

    it("Fill term from redux", async () => {
      const { getByLabelText } = getComponentWithStoreContent({
        application: {
          loan_term,
        },
      });

      const formField = getByLabelText(formLabel);

      await wait(() => {
        expect(formField.value).toBe(loan_term.toString());
      });
    });

    it("Does not fill term if not present in redux", async () => {
      const { getByLabelText } = getComponentWithStoreContent();

      const formField = getByLabelText(formLabel);

      await wait(() => {
        expect(formField.value).toBe("");
      });
    });

    it("Fill term from calculator_response application_loan_details over application_loan_details", async () => {
      const term = 1;
      const application_loan_details = {
        term,
      };
      const { getByLabelText } = getComponentWithStoreContent({
        application: {
          application_loan_details,
          loan_term,
        },
      });

      const formField = getByLabelText(formLabel);

      await wait(() => {
        expect(formField.value).toBe(loan_term.toString());
      });
    });
  });
});
