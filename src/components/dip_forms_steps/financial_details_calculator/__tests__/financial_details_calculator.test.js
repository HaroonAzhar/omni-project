import MockAdapter from "axios-mock-adapter";
import { fireEvent, act, wait } from "@testing-library/react";
import moment from "moment";

import { CALCULATOR_URL } from "utils/urls";
import { calculatorAxiosInstance } from "utils/requests/calculator";

import {
  calculatorStarterStore,
  calculatorState,
  calculator_response,
} from "./dummy_calculator_store.json";
import { dip_state_with_single_loan_advance_type } from "./dummy_dip_store.json";
import { getFinancialDetailsCalculator } from "./helpers";

const mock = new MockAdapter(calculatorAxiosInstance);
const todayDate = moment(new Date());

describe("<FinancialDetailsCalculator>", () => {
  it("Input change triggers calculator request", async () => {
    const calculatorEndpoint = jest.fn(() => [200, calculator_response]);
    mock.onPost(CALCULATOR_URL).reply(calculatorEndpoint);

    const { getByLabelText } = getFinancialDetailsCalculator({
      showInfoBox: () => {},
    });

    const textInput = getByLabelText(/Interest Rate/i);

    act(() => {
      fireEvent.change(textInput, { target: { value: 11 } });
    });
    await wait(() => expect(calculatorEndpoint).toHaveBeenCalledTimes(1));
  });

  it("Initial calculator is sent on enter step", () => {});

  it("Start Date has default value", async () => {
    const onSubmit = jest.fn(() => {});

    const { getByLabelText } = getFinancialDetailsCalculator(
      {
        finalizeStep: onSubmit,
        showInfoBox: () => {},
      },
      {
        AdvanceType: "multiple",
      }
    );

    const startDateInput = getByLabelText(/Start Date/i);

    await wait(() => {
      expect(startDateInput.value).toBe(todayDate.format("YYYY-MM-DD"));
    });
  });

  it("Percent/Value value type generate a proper keys", async () => {
    const expectedSubmitPayload = expect.objectContaining({
      data: expect.objectContaining({
        IntermediaryCommissionFeeValue: expect.any(Number),
        ArrangementFeeRepayment: expect.any(Number),
        ValueTypeOfArrangementFee: "value",
        ValueTypeOfIntermediaryFee: "value",
      }),
      stepId: expect.any(String),
    });

    const onSubmit = jest.setTimeout(15000).fn(() => {});

    let calculatorPayload = {};
    const calculatorEndpoint = jest.fn((json) => {
      calculatorPayload = JSON.parse(json.data);
      return [200, calculator_response];
    });
    mock.onPost(CALCULATOR_URL).reply(calculatorEndpoint);

    const { container, getByText } = getFinancialDetailsCalculator(
      {
        finalizeStep: onSubmit,
        showInfoBox: () => {},
      },
      {
        ...calculatorStarterStore,
        ...calculatorState,
        ArrangementFee: 1,
        IntermediaryCommissionFeeValue: 1,
        ArrangementFeeRepayment: 1,
      }
    );

    // The step sends calculator request on render
    await wait(() => expect(calculatorEndpoint).toHaveBeenCalledTimes(1));

    const continueButton = getByText(/Continue/i);

    const arrangementAdvanceInput = container.querySelector(
      "input[name=ValueTypeOfArrangementFee][value=value]"
    );
    const intermediarycommissionFeeInput = container.querySelector(
      "input[name=ValueTypeOfIntermediaryFee][value=value]"
    );
    act(() => {
      fireEvent.click(arrangementAdvanceInput);
      fireEvent.click(intermediarycommissionFeeInput);
    });

    await wait(() => expect(calculatorEndpoint).toHaveBeenCalledTimes(2));
    expect(calculatorPayload).toMatchObject({
      exit_fee_value: 1,
      arrangement_fee_value: 1,
      intermediary_commission_fee_value: 1,
    });

    act(() => {
      fireEvent.click(continueButton);
    });

    await wait(() => expect(onSubmit).toHaveBeenCalledTimes(1));

    /*
      When this test fail due to Timeout, it is possible,
      that it is just error from expect function
    */
    await wait(() => expect(onSubmit).toBeCalledWith(expectedSubmitPayload));
  });

  it("Call calculator API with proper mapped properties", async () => {
    let calculatorPayload = {};
    const calculatorEndpoint = jest.fn((json) => {
      calculatorPayload = JSON.parse(json.data);
      return [200, calculator_response];
    });
    mock.onPost(CALCULATOR_URL).reply(calculatorEndpoint);

    const { container } = getFinancialDetailsCalculator(
      {
        finalizeStep: () => {},
        showInfoBox: () => {},
      },
      {
        ...calculatorStarterStore,
        ...calculatorState,
      }
    );

    // The step sends calculator request on render
    await wait(() => expect(calculatorEndpoint).toHaveBeenCalledTimes(1));

    const arrangementAdvanceInput = container.querySelector(
      "input[name=ValueTypeOfArrangementFee][value=value]"
    );
    act(() => {
      fireEvent.click(arrangementAdvanceInput);
    });

    await wait(() => expect(calculatorEndpoint).toHaveBeenCalledTimes(2));
    expect(calculatorPayload).toEqual({
      exit_fee_value: 1,
      exit_fee_intermediary: 100,
      arrangement_fee_value: 1,
      intermediary_commission_fee_percent: 1,
      monthly_interest_rate: 0.01,
      title_insurance_fee: 1,
      completion_administration_fee: 400,
      drawdowns: [],
      lenders_insurance_fee: 250,
      further_advances: null,
      max_gross_ltv: null,
      max_gdltv: null,
      initial_term: 12,
      total_valuations: 200002,
      gdv: 200002,
      type: "rolled_up",
      total_first_charge_outstanding: 0,
      broker_fee_in: 0.015,
      broker_fee_out: 0.015,
      estimated_90_day_gdv: 1100,
      build_period: null,
    });
  });

  it("Doesn't send further_draw_down when AdvanceType=single", async () => {
    const onSubmit = jest.fn(() => {});

    const calculatorEndpoint = jest.fn((json) => {
      const calculatorPayload = JSON.parse(json.data);
      expect(calculatorPayload.further_advances).toBeUndefined();
      expect(calculatorPayload.drawdowns).toBeUndefined();
      return [200, calculator_response];
    });
    mock.onPost(CALCULATOR_URL).reply(calculatorEndpoint);

    const { getByLabelText } = getFinancialDetailsCalculator(
      {
        finalizeStep: onSubmit,
        showInfoBox: () => {},
      },
      dip_state_with_single_loan_advance_type
    );

    const interestRateInput = getByLabelText(/Interest Rate/i);
    act(() => {
      fireEvent.change(interestRateInput, { target: { value: 11 } });
    });

    await wait(() => expect(calculatorEndpoint).toHaveBeenCalledTimes(1));
  });

  const dip_state_with_multiple_loan_advance_type = {
    ...dip_state_with_single_loan_advance_type,
    AdvanceType: "multiple",
  };

  it("Does send drawdowns when loan_advance_type=multiple", async () => {
    const onSubmit = jest.fn(() => {});

    const expectedDrawdowns = [
      { advance: 200, date: "09/07/2020" },
      { advance: 250, date: "09/08/2020" },
      { advance: 250, date: "09/09/2020" },
      { advance: 250, date: "09/10/2020" },
      { advance: 250, date: "09/11/2020" },
    ];

    const calculatorEndpoint = jest.fn((json) => {
      const calculatorPayload = JSON.parse(json.data);
      expect(calculatorPayload.drawdowns).toBeDefined();
      expect(calculatorPayload.drawdowns).toEqual(expectedDrawdowns);
      return [200, calculator_response];
    });
    mock.onPost(CALCULATOR_URL).reply(calculatorEndpoint);

    const { getByLabelText } = getFinancialDetailsCalculator(
      {
        finalizeStep: onSubmit,
        showInfoBox: () => {},
      },
      {
        BuildPeriodMonths: 4,
        AdvanceType: "multiple",
        FurtherDrawDowns: 1000,
        StartDate: "2020-07-09",
        InitialNetLoanAmount: 200,
      }
    );

    const interestRateInput = getByLabelText(/Interest Rate/i);
    act(() => {
      fireEvent.change(interestRateInput, { target: { value: 11 } });
    });

    await wait(() => expect(calculatorEndpoint).toHaveBeenCalledTimes(1));
  });

  it("In manual mode should send further advances", async () => {
    const onSubmit = jest.fn(() => {});

    const expectedDrawdowns = [
      { advance: 200, date: "09/07/2020" },
      { advance: 100, date: "09/08/2020" },
      { advance: 0, date: "09/09/2020" },
      { advance: 300, date: "09/10/2020" },
      { advance: 0, date: "09/11/2020" },
    ];

    const calculatorEndpoint = jest.fn((json) => {
      const calculatorPayload = JSON.parse(json.data);
      expect(calculatorPayload.drawdowns).toBeDefined();
      expect(calculatorPayload.drawdowns).toEqual(expectedDrawdowns);
      return [200, calculator_response];
    });
    mock.onPost(CALCULATOR_URL).reply(calculatorEndpoint);

    const { getByLabelText } = getFinancialDetailsCalculator(
      {
        finalizeStep: onSubmit,
        showInfoBox: () => {},
      },
      {
        ...dip_state_with_multiple_loan_advance_type,
        IsManualMode: true,
        BuildPeriodMonths: 4,
        AdvanceType: "multiple",
        FurtherDrawDowns: 1000,
        StartDate: "2020-07-09",
        InitialNetLoanAmount: 200,
        furtherAdvances: [100, 0, 300, 0],
      }
    );

    const interestRateInput = getByLabelText(/Interest Rate/i);
    act(() => {
      fireEvent.change(interestRateInput, { target: { value: 11 } });
    });

    await wait(() => expect(calculatorEndpoint).toHaveBeenCalledTimes(1));
  });

  it("Inputs shows a proper values from store", async () => {
    const onSubmit = jest.fn(() => {});

    const { getByLabelText } = getFinancialDetailsCalculator(
      {
        finalizeStep: onSubmit,
        showInfoBox: () => {},
      },
      {
        StartingPoint: "initial_net_loan_amount",
        InitialNetLoanAmount: 1233,
        ValueTypeOfArrangementFee: "value",
        ArrangementFee: 12,
        IntermediaryCommissionFeePercent: 1.33,
        ValueTypeOfIntermediaryFee: "percent",
        ExitFeeIntermediary: 122.31,
        InterestRate: 12,
        TitleInsuranceFee: 12,
        CompletionAdministrationFee: 250,
        PremiumForLendersInsurance: 300,
        IntroducerType: "via_broker",
      }
    );

    const correctInputValues = {
      "Initial net loan amount": "£1,233",
      "Arrangement Fee (Total)": "£12",
      "Arrangement Fee (Intermediary)": "1.33",
      "Exit Fee (Total)": undefined,
      "Exit Fee (Intermediary)": "£122.31",
      "Interest Rate": "12.00",
      "Title Insurance Fee": "£12",
      "Completion Administration Fee": "£250",
      "Premium for Lenders Insurance": "£300",
    };

    Object.entries(correctInputValues).forEach(([key, correctValue]) => {
      if (!correctValue) return;
      const actualValue = getByLabelText(key).value;
      expect(actualValue).toBe(correctValue);
    });
  });

  it.skip("Results showing a correct input values", () => {});
  it.skip("Results showing a correct calculator response", () => {});
  it.skip("Debounce works correctly", () => {});
});
