import { useSelector } from "react-redux";

import useSummaryData from "../index";
import dipState from "./dip_state";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const getCallbackWithTypeOfLoan = (typeOfLoan) => (cb) =>
  cb({
    dip: {
      type_of_loan: typeOfLoan,
    },
    calculator: {},
  });

describe("useSummaryData", () => {
  it("Returns a proper set of keys for serviced", () => {
    useSelector.mockImplementation(getCallbackWithTypeOfLoan("serviced"));

    const output = useSummaryData();
    expect(Object.keys(output)).toEqual([
      "Interest Type",
      "Term",
      "Net Loan Amount (Day 1)",
      "Arrangement Fee",
      "Lender’s Insurance Fee",
      "Completion Administration Fee",
      "Total Loan Facility",
      "Exit Fee",
      "Gross Facility",
      "Rate of Interest (Month)",
      "Loan Type",
      "Serviced Interest (PCM)",
      "Serviced Interest (Total)",
      "Market Value",
      "Market Value 90 Day",
      "LTV",
      "Max LTV",
      "IRR",
    ]);
  });

  it("Returns a proper set of keys for retained", () => {
    useSelector.mockImplementation(getCallbackWithTypeOfLoan("retained"));

    const output = useSummaryData();
    expect(Object.keys(output)).toEqual([
      "Interest Type",
      "Term",
      "Net Loan Amount (Day 1)",
      "Arrangement Fee",
      "Lender’s Insurance Fee",
      "Completion Administration Fee",
      "Total Facility (Excl Interest)",
      "Retained Interest",
      "Total Facility (Inc Interest)",
      "Exit Fee",
      "Gross Facility (Incl Interest)",
      "Rate of Interest (Month)",
      "Loan Type",
      "Market Value",
      "Market Value 90 Day",
      "LTV",
      "Max LTV",
      "IRR",
    ]);
  });

  it("Returns a proper set of keys for rolled up", () => {
    useSelector.mockImplementation(getCallbackWithTypeOfLoan("rolled_up"));

    const output = useSummaryData();
    expect(Object.keys(output)).toEqual([
      "Interest Type",
      "Term",
      "Drawdown Type",
      "Net Loan Amount (Day 1)",
      "Arrangement Fee",
      "Lender’s Insurance Fee",
      "Completion Administration Fee",
      "Total Amount of First Advance",
      "Estimated Interest (LTV Day 1)",
      "Gross Facility Amount (LTV Day 1)",
      "Subsequent Advances (i.e. drawdowns)",
      "Total Loan Facility (Excl Interest)",
      "Estimated Total Rolled up Interest",
      "Exit Fee",
      "Gross Facility (Incl Interest)",
      "Rate of Interest (Month)",
      "Loan Type",
      "Build Period",
      "Market Value 90 Day",
      "Market Value (Day 1)",
      "Market Value 90 Day (Day 1)",
      "LTV",
      "GDV",
      "GDV 90 Day",
      "GDLTV",
      "GDLTV 90 Day",
      "IRR",
    ]);
  });

  it("Returns a proper averages for security values", () => {
    useSelector.mockImplementation((cb) =>
      cb({
        dip: {
          type_of_loan: "rolled_up",
          loan_advance_type: "multiple",
          securities: [
            {
              current_estimated90_day_market_value: 4,
              estimated90_day_gdv: 3,
            },
            {
              current_estimated90_day_market_value: 5,
              estimated90_day_gdv: 4,
            },
          ],
        },
        calculator: { calculatorResponse: { gdltv_90_day: 0.01 } },
      })
    );

    const output = useSummaryData();

    expect(output).toMatchObject({
      "Market Value 90 Day": "£9.00",
      "GDV 90 Day": "£7.00",
      "GDLTV 90 Day": "1.00%",
    });
  });

  it("Shows a proper type_of_loan label", () => {
    useSelector.mockImplementation(getCallbackWithTypeOfLoan("retained"));
    expect(useSummaryData()).toMatchObject({
      "Interest Type": "Retained",
    });

    useSelector.mockImplementation(getCallbackWithTypeOfLoan("serviced"));
    expect(useSummaryData()).toMatchObject({
      "Interest Type": "Serviced",
    });

    useSelector.mockImplementation(getCallbackWithTypeOfLoan("rolled_up"));
    expect(useSummaryData()).toMatchObject({
      "Interest Type": "Rolled Up",
    });
  });

  it("Returns a proper data - Rolled", () => {
    useSelector.mockImplementation((cb) => cb(dipState));

    const output = useSummaryData();

    expect(output).toEqual({
      "Interest Type": "Rolled Up",
      Term: "2 months",
      "Drawdown Type": "Multiple",
      "Net Loan Amount (Day 1)": "-£641.31",
      "Arrangement Fee": {
        value: "£0.31",
        "Arrangement Fee Retained": "£0.31",
        "Arrangement Fee Broker": "£0.00",
      },
      "Lender’s Insurance Fee": "£250.00",
      "Completion Administration Fee": "£400.00",
      "Total Amount of First Advance": "£10.00",
      "Estimated Interest (LTV Day 1)": "£0.20",
      "Gross Facility Amount (LTV Day 1)": "£11.20",
      "Subsequent Advances (i.e. drawdowns)": "£21.00",
      "Total Loan Facility (Excl Interest)": "£31.00",
      "Estimated Total Rolled up Interest": "£0.20",
      "Exit Fee": {
        value: "£1.00",
        "Exit Fee Broker": "£0.00",
        "Exit Fee Retained": "£1.00",
      },
      "Gross Facility (Incl Interest)": "£31.20",
      "Rate of Interest (Month)": "1.00%",
      "Loan Type": "Land",
      "Market Value 90 Day": "£544.00",
      "Market Value (Day 1)": "£16,000.00",
      "Market Value 90 Day (Day 1)": "£544.00",
      LTV: "0.07%",
      GDV: "£1,233.00",
      "GDV 90 Day": "£888.00",
      GDLTV: "0.00%",
      "GDLTV 90 Day": "0.00%",
      IRR: "141.33%",
      "Build Period": "",
    });
  });

  it("Returns a proper data - Serviced", () => {
    const servicedData = {
      ...dipState,
      dip: {
        ...dipState.dip,
        type_of_loan: "serviced",
      },
    };
    useSelector.mockImplementation((cb) => cb(servicedData));

    const output = useSummaryData();

    expect(output).toEqual(
      expect.objectContaining({
        "Serviced Interest (Total)": "£0.40",
        "Serviced Interest (PCM)": "£0.20",
      })
    );
  });

  it("Returns a proper data - Retained", () => {
    const retainedData = {
      ...dipState,
      dip: {
        ...dipState.dip,
        max_ltv: 70,
        type_of_loan: "retained",
      },
    };
    useSelector.mockImplementation((cb) => cb(retainedData));

    const output = useSummaryData();

    expect(output).toEqual(expect.objectContaining({ "Max LTV": "70.00%" }));
  });

  it("Does not sum drawdowns interests as total interests, uses total_interest", () => {
    dipState.calculator.calculatorResponse.drawdowns = [
      { interest: 1.2 },
      { interest: 100 },
    ];
    useSelector.mockImplementation((cb) => cb(dipState));

    const output = useSummaryData();

    expect(output).toMatchObject({
      "Estimated Total Rolled up Interest": "£0.20",
    });
  });

  it("Failbacks to old, calculated values total_interest", () => {
    const {
      // eslint-disable-next-line no-unused-vars
      total_interest,
      ...responseWithoutTotalInterest
    } = dipState.calculator.calculatorResponse;

    useSelector.mockImplementation((cb) =>
      cb({
        ...dipState,
        calculator: {
          ...dipState.calculator,
          calculatorResponse: {
            ...responseWithoutTotalInterest,
            drawdowns: [{ interest: 1.2 }, { interest: 100 }],
          },
        },
      })
    );

    const output = useSummaryData();

    expect(output).toMatchObject({
      "Estimated Total Rolled up Interest": "£101.20",
    });
  });
});
