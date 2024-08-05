import drawdownsData from "components/dip_forms_steps/financial_details_calculator/drawdowns/drawdowns_data";

const calculatorRequestInput = (values) => {
  const {
    ArrangementFeeTotal = 0,
    ArrangementFeeBroker = 0,
    EstimatedSecurityValue = 0,
    MaximumLtv = 0,
    MaximumGdltv = 0,
    LoanPeriod = 0,
    InterestType,
    Gdv = 0,
    FurtherDrawdownsAmount = 0,
    BuildPeriod = 0,
    InterestRate = 0,
    OtherFees = 0,
    NetLoanAmount = undefined,
  } = values;
  return {
    arrangement_fee_percent: +ArrangementFeeTotal,
    intermediary_commission_fee_percent: +ArrangementFeeBroker,
    monthly_interest_rate: +InterestRate / 100,
    title_insurance_fee: +OtherFees,

    further_advances: BuildPeriod > 0 ? +FurtherDrawdownsAmount : 0,
    max_gross_ltv: +MaximumLtv / 100,
    max_gdltv: +MaximumGdltv / 100,
    build_period: +BuildPeriod,

    initial_term: +LoanPeriod,
    total_valuations: +EstimatedSecurityValue,
    gdv: +Gdv,
    type: InterestType,
    first_advance: +NetLoanAmount,
    drawdowns: drawdownsData({
      getLoanAdvanceType: () => (BuildPeriod > 0 ? "multiple" : "single"),
      getStartDate: () => new Date(),
      getMode: () => "auto",
      getBuildPeriod: () => +BuildPeriod,
      getExpectedTotalOfAdvances: () => +FurtherDrawdownsAmount,
      getCalculatorDrawdowns: () => {},
    }),
  };
};

export default calculatorRequestInput;
