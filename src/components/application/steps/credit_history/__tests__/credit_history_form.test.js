import { fireEvent, act, wait, within } from "@testing-library/react";

import { getComponentWithRedux } from "test_helpers";

import CreditHistoryForm from "../credit_history_form";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ id: 123 }),
  useHistory: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("../../../../../utils/requests", () => ({
  getApplicant: jest.fn().mockReturnValue(new Promise((r) => r({ data: {} }))),
  changeApplicant: jest
    .fn()
    .mockReturnValue(new Promise((r) => r({ data: {} }))),
  getApplication: jest
    .fn()
    .mockReturnValue(new Promise((r) => r({ data: {} }))),
}));

describe("<CreditHistoryForm>", () => {
  it("Renders needed fieldset labels", () => {
    const labels = [
      "Have you ever been refused a mortgage on this or any other property?",
      "Have you ever had a judgement for debt recorded against you or if a director your company",
      "Have you ever been declared bankrupt or compounded with your creditors?",
      "Have you ever failed to keep up with payments under any present or previous mortgage, rental or loan agreement?",
      "Have you made a claim to the DSS in the last 12 months?",
      "Have you ever been convicted of a fraud offence?",
    ];

    const { container } = getComponentWithRedux(
      CreditHistoryForm,
      {},
      { application: { individuals: [] } }
    );

    const legendElements = container.querySelectorAll("legend");

    legendElements.forEach((legend, index) => {
      expect(legend.innerHTML).toBe(labels[index]);
    });
  });

  it("Renders a proper label for a particular type of applicant", () => {
    const getComponentWithTypeOfApplicant = (type_of_applicant) =>
      getComponentWithRedux(
        CreditHistoryForm,
        {},
        {
          application: {
            individuals: [],
            type_of_applicant,
          },
        }
      );

    const componentForIndividualType = getComponentWithTypeOfApplicant(
      "individual"
    );

    componentForIndividualType.getByText(
      /Have you ever had a judgement for debt recorded against you or if a director your company/i
    );

    const componentForCompanyType = getComponentWithTypeOfApplicant("company");

    componentForCompanyType.getByText(
      /Have any of the directors\/shareholders ever had a judgement for debt recorded against them ?/i
    );
  });

  it("Renders text inputs when radio input is set to true", () => {
    const { getAllByRole } = getComponentWithRedux(
      CreditHistoryForm,
      {},
      {
        application: {
          individuals: [
            {
              credit_history: {
                claim_dss: true,
                convicted_fraud: true,
                debt_judgement: true,
                declared_bankrupt: true,
                failed_to_keep: true,
                refused_mortgage: true,
              },
            },
          ],
        },
      }
    );

    const fieldsetElements = getAllByRole("group");

    fieldsetElements.forEach((element) => {
      within(element).getByLabelText(/Details/i);
    });
  });

  it("Can set radio inputs to yes", async () => {
    const finalizeStep = jest.fn();

    const { getByText, getAllByLabelText } = getComponentWithRedux(
      CreditHistoryForm,
      { finalizeStep },
      { application: { individuals: [] } }
    );

    const labelElements = getAllByLabelText("Yes");

    expect(labelElements.length).toBe(6);

    act(() => {
      labelElements.forEach((el) => fireEvent.click(el));
    });

    const confirmButton = getByText(/Confirm/i);

    act(() => {
      fireEvent.click(confirmButton);
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);
      expect(finalizeStep).toBeCalledWith({
        data: {
          credit_history: {
            claim_dss: true,
            convicted_fraud: true,
            debt_judgement: true,
            declared_bankrupt: true,
            failed_to_keep: true,
            refused_mortgage: true,
          },
        },
      });
    });
  });

  it("Check if details inputs has a proper names", async () => {
    const finalizeStep = jest.fn();

    const { getByText, getAllByLabelText } = getComponentWithRedux(
      CreditHistoryForm,
      { finalizeStep },
      {
        application: {
          individuals: [
            {
              credit_history: {
                claim_dss: true,
                convicted_fraud: true,
                debt_judgement: true,
                declared_bankrupt: true,
                failed_to_keep: true,
                refused_mortgage: true,
              },
            },
          ],
        },
      }
    );

    act(() => {
      const detailInputs = getAllByLabelText("Details");

      detailInputs.forEach((element) => {
        fireEvent.change(element, { target: { value: "test" } });
      });
    });

    act(() => {
      const confirmButton = getByText(/Confirm/i);
      fireEvent.click(confirmButton);
    });

    await wait(() => {
      expect(finalizeStep).toHaveBeenCalledTimes(1);
      expect(finalizeStep).toBeCalledWith({
        data: {
          credit_history: {
            claim_dss: true,
            convicted_fraud: true,
            debt_judgement: true,
            declared_bankrupt: true,
            failed_to_keep: true,
            refused_mortgage: true,
            claim_dss_details: "test",
            convicted_fraud_details: "test",
            debt_judgement_details: "test",
            declared_bankrupt_details: "test",
            failed_to_keep_details: "test",
            refused_mortgage_details: "test",
          },
        },
      });
    });
  });
});
