import { useSelector } from "react-redux";

import useSummaryValues from "./use_summary_values";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn().mockReturnValue({
    application: {},
    calculator: {},
  }),
}));

const application = {
  loan: {
    servicing_method_rationale: "test",
  },
  type_of_loan: "serviced",
  securities: [{ security_type: "test" }, { security_type: "test" }],
  properties: [
    {
      charge: {
        current_mortgage_outstanding: 1000,
        lenders: [{ name: "testing name1" }],
      },
    },
    {
      charge: {
        current_mortgage_outstanding: 2000,
        lenders: [{ name: "testing name2" }],
      },
    },
  ],
  loan_term: 6,
  further_draw_downs: 1000,
  estimated_interest: 10,
  interest_rate: 20,
};

const calculatorResponse = {
  advanced_interest: 235378.08,
  arrangement_fee_in_value: 0,
  broker_fee_in_value: 4203.18,
  broker_fee_out_value: 4203.18,
  drawdowns: null,
  exit_fee_value: 0,
  gdltv: 0,
  gross_amount_of_first_advance: 280200,
  gross_day_one_ltv: 70.05,
  gross_loan: 280212,
  gross_loan_first_advance: 280200,
  intermediary_commission_fee_value: 0,
  maturity_date: "Wed, 18 Aug 2021 08:30:37 GMT",
  net_amount_of_first_advance: 42319.92,
  repayment_date: "Thu, 19 Aug 2021 08:30:37 GMT",
  total_fees: 2502,
  total_loan_amount: 42331.92,
  total_loan_facility: 280212,
  xirr: 5.2802,
};

describe("<LoanSummary>", () => {
  it("Test if useSummaryValues returns a proper values from calculator store", () => {
    useSelector.mockImplementation((cb) =>
      cb({
        application,
        calculator: { calculatorResponse },
      })
    );

    const values = useSummaryValues();

    expect(values).toEqual({
      advancedInterest: "£235,378.08",
      arrangementFee: "£0.00",
      brokerShare: "£0.00",
      day1NetRelease: "£42,319.92",
      drawdowns: "£1,000.00",
      existingFirstCharge: ["1. £1,000.00", "2. £2,000.00"],
      exitDate: "Thu, 19 Aug 2021 08:30:37 GMT",
      firstChargeLender: ["1. testing name1", "2. testing name2"],
      interestRatePCM: "20.00%",
      interestType: "Serviced",
      isServicedLoan: true,
      lendersInsuranceCompletionFee: "£2,502.00",
      omniShare: "£0.00",
      securityType: "test",
      serviceDuration: "-",
      serviced: "yes",
      servicing_method_rationale: "test",
      term: 6,
      totalFacility: "£280,212.00",
      totalFees: "-",
      totalInterest: "£10.00",
      type_of_loan: "serviced",
    }); // check with toEqual
  });
});
