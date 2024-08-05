import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import { Button, H2, Modal } from "components/atoms";
import { currencyFormat, percentFormat } from "utils";
import { SummaryUI } from "components/dip_forms_steps/summary_step/summary";
import { formatDataForTables } from "components/dip_forms_steps/summary_step/summary/use_summary_data";

import {
  SummaryContentWrapper,
  LoanCalculationCell,
  EnquiryButton,
} from "./styled_enquiry_flow";

function Result({ calculatorResponse = {}, values = {} }) {
  const [fullDetailsOpen, setFullDetailsOpen] = useState(false);
  const closeFullDetails = () => setFullDetailsOpen(false);
  const openFullDetails = () => setFullDetailsOpen(true);

  const {
    MaximumLtv = 0,
    LoanPeriod = 0,
    InterestType,
    FurtherDrawdownsAmount = 0,
    BuildPeriod = 0,
    InterestRate = 0,
    OtherFees = 0,
    EstimatedSecurityValue = 0,
  } = values;

  const summaryData = formatDataForTables({
    calculatorResponse,
    dip: {
      type_of_loan: InterestType,
      loan_term: LoanPeriod,
      premium_for_lenders_insurance: OtherFees,

      max_ltv: MaximumLtv,

      build_period: BuildPeriod,
      further_draw_downs: FurtherDrawdownsAmount,
      loan_advance_type: BuildPeriod > 0 ? "multiple" : "single",
      interest_rate: InterestRate,
      securities: [
        {
          security_type: "",
          security_initial_estimation: +EstimatedSecurityValue,
        },
      ],
    },
  });
  return (
    <>
      <Modal isOpen={fullDetailsOpen} onClose={closeFullDetails}>
        <SummaryContentWrapper>
          <H2>Loan Calculation Details</H2>
          <SummaryUI summaryData={summaryData} />
        </SummaryContentWrapper>
      </Modal>
      <H2>Loan Calculation</H2>
      <Grid container>
        <LoanCalculationCell item xs={3}>
          Net Loan Amount:{" "}
          {currencyFormat(calculatorResponse?.net_amount_of_first_advance)}
        </LoanCalculationCell>
        <LoanCalculationCell item xs={3}>
          Gross Loan Amount: {currencyFormat(calculatorResponse?.gross_loan)}
        </LoanCalculationCell>
        <LoanCalculationCell item xs={1}>
          IRR: {percentFormat(calculatorResponse?.xirr)}
        </LoanCalculationCell>
        <LoanCalculationCell item xs={1}>
          LTV: {percentFormat(calculatorResponse?.gross_day_one_ltv)}
        </LoanCalculationCell>
        <LoanCalculationCell item xs={1}>
          LTGDV: {percentFormat(calculatorResponse?.gdltv)}
        </LoanCalculationCell>
        <LoanCalculationCell item xs={3}>
          {(calculatorResponse?.net_amount_of_first_advance ?? 0) > 0 && (
            <EnquiryButton>
              <Button type="button" onClick={openFullDetails}>
                Full Details
              </Button>
            </EnquiryButton>
          )}
        </LoanCalculationCell>
      </Grid>
    </>
  );
}

Result.propTypes = {
  calculatorResponse: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Result;
