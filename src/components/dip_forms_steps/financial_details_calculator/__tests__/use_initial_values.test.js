import moment from "moment";
import { useSelector } from "react-redux";

import useInitialValues from "../use_initial_values";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn().mockReturnValue({
    preApplication: {},
  }),
}));

const emptyCalculatorCacheState = {};
const calculatorCacheState = {
  InitialNetLoanAmount: 2222,
  ArrangementFeeAdvanceDate: 22,
  ArrangementFeeRepaymentDate: 22,
  ExitFeeIntermediary: 222.22,
  InterestRate: 22,
  TitleInsuranceFee: 22,
  IntermediaryCommissionFeeValue: 2.22,
  ValueTypeOfArrangementFee: "value",
  ValueTypeOfIntermediaryCommissionFeeV: "percent",
  StartingPoint: "initial_net_loan_amount",
  IsManualMode: true,
  StartDate: "2222-22-22",
  furtherAdvances: 222,
};

const basePreApplication = {
  InitialNetLoanAmount: 1111,
  ArrangementFeeAdvanceDate: 11,
  ArrangementFeeRepaymentDate: 11,
  ExitFeeIntermediary: 111.11,
  InterestRate: 11,
  TitleInsuranceFee: 11,
  IntermediaryCommissionFeeValue: 1.11,
  ValueTypeOfArrangementFee: "value",
  ValueTypeOfIntermediaryCommissionFeeV: "percent",
  StartingPoint: "initial_net_loan_amount",
  IsManualMode: true,
  StartDate: "1111-11-11",
  furtherAdvances: 111,
  PremiumForLendersInsurance: 300,
  CompletionAdministrationFee: 250,
  securities: [
    {
      security_initial_estimation: 350,
    },
    {
      security_initial_estimation: 350,
    },
  ],
};

describe("useInitialValues", () => {
  it("Returns a proper values when calculatorCache is empty", () => {
    useSelector.mockImplementation((cb) =>
      cb({
        preApplication: basePreApplication,
      })
    );

    const output = useInitialValues(emptyCalculatorCacheState);

    expect(output).toEqual({
      InitialNetLoanAmount: 1111,
      ArrangementFeeAdvanceDate: 11,
      ArrangementFeeRepaymentDate: 11,
      ExitFeeIntermediary: 111.11,
      InterestRate: 11,
      TitleInsuranceFee: 11,
      IntermediaryCommissionFeeValue: 1.11,
      market_value: 700,
      PremiumForLendersInsurance: 300,
      CompletionAdministrationFee: 250,
      StartingPoint: "initial_net_loan_amount",
      ValueTypeOfArrangementFee: "value",
      ValueTypeOfIntermediaryCommissionFeeV: "percent",
      StartDate: "1111-11-11",
      furtherAdvances: 111,
      IsManualMode: true,
    });
  });

  it("Returns a proper values when calculatorCache is complete", () => {
    useSelector.mockImplementation((cb) =>
      cb({
        preApplication: basePreApplication,
      })
    );

    const output = useInitialValues(calculatorCacheState);

    expect(output).toEqual({
      InitialNetLoanAmount: 2222,
      ArrangementFeeAdvanceDate: 22,
      ArrangementFeeRepaymentDate: 22,
      ExitFeeIntermediary: 222.22,
      InterestRate: 22,
      TitleInsuranceFee: 22,
      IntermediaryCommissionFeeValue: 2.22,
      market_value: 700,
      PremiumForLendersInsurance: 300,
      CompletionAdministrationFee: 250,
      StartingPoint: "initial_net_loan_amount",
      ValueTypeOfArrangementFee: "value",
      ValueTypeOfIntermediaryCommissionFeeV: "percent",
      StartDate: "2222-22-22",
      furtherAdvances: 222,
      IsManualMode: true,
    });
  });

  it.only("Returns a proper default values", () => {
    useSelector.mockImplementation((cb) =>
      cb({
        preApplication: {},
      })
    );

    const output = useInitialValues(emptyCalculatorCacheState);

    expect(output).toMatchObject({
      ValueTypeOfArrangementFee: "percent",
      StartDate: moment(new Date()).format("YYYY-MM-DD"),
    });
  });
});
