import React from "react";
import PropTypes from "prop-types";

import {
  Fieldset,
  RadioInput,
  PriceField,
  PercentField,
} from "components/atoms";

import {
  StyledCalculatorContainer,
  StyledCalculatorInputsContainer,
  StyledField,
  StyledWrapperForTextInputWithRadio,
  StyledLoanAmountFieldset,
  StyledRightColumn,
  StyledLeftColumn,
} from "./styled_financial_details_calculator";

const CalculatorInputs = ({ values, store, shouldShowIntermediaryFee }) => {
  return (
    <StyledCalculatorContainer>
      <StyledCalculatorInputsContainer>
        <StyledLeftColumn>
          <Fieldset title="Starting point">
            <StyledField
              component={RadioInput}
              type="radio"
              name="StartingPoint"
              value="initial_net_loan_amount"
              label="Initial Net Loan Amount"
            />
            <StyledField
              component={RadioInput}
              type="radio"
              name="StartingPoint"
              value="gross_amount_at_maturity"
              label="Gross Loan at Maturity"
            />
            <StyledField
              component={RadioInput}
              type="radio"
              name="StartingPoint"
              value="market_value"
              label="Market Value"
            />
          </Fieldset>

          {values.StartingPoint === "initial_net_loan_amount" && (
            <PriceField
              name="InitialNetLoanAmount"
              label="Initial net loan amount"
              placeholder="£££"
            />
          )}

          {values.StartingPoint === "gross_amount_at_maturity" && (
            <PriceField
              name="GrossAmountAtMaturity"
              label="Gross Loan at Maturity"
              placeholder="£££"
            />
          )}

          {values.StartingPoint === "market_value" && (
            <PriceField
              name="MarketValue"
              label="Market values"
              placeholder="£££"
              disabled
            />
          )}

          <StyledWrapperForTextInputWithRadio>
            {values.ValueTypeOfArrangementFee !== "value" ? (
              <PercentField
                name="ArrangementFeePercent"
                label="Arrangement Fee (Total)"
                placeholder="%"
              />
            ) : (
              <PriceField
                name="ArrangementFee"
                label="Arrangement Fee (Total)"
                placeholder="£££"
              />
            )}

            <StyledLoanAmountFieldset isAbsolute>
              <StyledField
                component={RadioInput}
                type="radio"
                name="ValueTypeOfArrangementFee"
                value="percent"
                label="%"
              />
              <StyledField
                component={RadioInput}
                type="radio"
                name="ValueTypeOfArrangementFee"
                value="value"
                label="£"
              />
            </StyledLoanAmountFieldset>
          </StyledWrapperForTextInputWithRadio>

          {shouldShowIntermediaryFee && (
            <StyledWrapperForTextInputWithRadio>
              {values.ValueTypeOfIntermediaryFee !== "value" ? (
                <PercentField
                  name="IntermediaryCommissionFeePercent"
                  label="Arrangement Fee (Intermediary)"
                  placeholder="%"
                />
              ) : (
                <PriceField
                  name="IntermediaryCommissionFeeValue"
                  label="Arrangement Fee (Intermediary)"
                  placeholder="£££"
                />
              )}

              <StyledLoanAmountFieldset isAbsolute>
                <StyledField
                  component={RadioInput}
                  type="radio"
                  name="ValueTypeOfIntermediaryFee"
                  value="percent"
                  label="%"
                />
                <StyledField
                  component={RadioInput}
                  type="radio"
                  name="ValueTypeOfIntermediaryFee"
                  value="value"
                  label="£"
                />
              </StyledLoanAmountFieldset>
            </StyledWrapperForTextInputWithRadio>
          )}

          <PriceField
            name="ArrangementFeeRepayment"
            label="Exit Fee (Total)"
            placeholder="£££"
          />

          {shouldShowIntermediaryFee && (
            <PriceField
              name="ExitFeeIntermediary"
              label="Exit Fee (Intermediary)"
              placeholder="£££"
            />
          )}
        </StyledLeftColumn>

        <StyledRightColumn>
          <PercentField
            name="InterestRate"
            label="Interest Rate"
            placeholder="%"
          />

          <PriceField
            name="TitleInsuranceFee"
            label="Title Insurance Fee"
            placeholder="£££"
          />

          <PriceField
            name="CompletionAdministrationFee"
            value={store.CompletionAdministrationFee}
            label="Completion Administration Fee"
            placeholder="£££"
          />

          <PriceField
            name="PremiumForLendersInsurance"
            value={store.PremiumForLendersInsurance}
            label="Premium for Lenders Insurance"
            placeholder="£££"
          />
        </StyledRightColumn>
      </StyledCalculatorInputsContainer>
    </StyledCalculatorContainer>
  );
};

CalculatorInputs.propTypes = {
  values: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  shouldShowIntermediaryFee: PropTypes.bool.isRequired,
};

export default CalculatorInputs;
