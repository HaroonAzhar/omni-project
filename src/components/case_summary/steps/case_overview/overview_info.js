import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { currencyFormat } from "utils";
import { Cell } from "components/molecules";
import { getUnderwriterIdOfOverview } from "components/case_summary/selectors";

import {
  StyledInformationContainer,
  StyledInformationColumn,
  StyledText,
} from "../../case_summary_styles";
import Underwriter from "./underwriter";

const OverviewInfo = ({ getOnSubmitFunction }) => {
  const type_of_applicant = useSelector(
    ({ application }) => application.type_of_applicant
  );
  const applicants = useSelector(({ application }) => application.applicants);
  const properties = useSelector(({ application }) => application.properties);
  const broker_name = useSelector(({ application }) => application.broker_name);
  const calculatorResponse =
    useSelector(({ calculator }) => calculator.calculatorResponse) || {};

  const underwriterId = useSelector(getUnderwriterIdOfOverview);

  return (
    <StyledInformationContainer>
      <StyledInformationColumn>
        {type_of_applicant === "company" ? (
          <Cell title="Name">{applicants[0].name}</Cell>
        ) : (
          <Cell title="Name">
            {applicants &&
              applicants.map(({ name }) => (
                <StyledText key={`cell-${name}`}>{name}</StyledText>
              ))}
          </Cell>
        )}

        <Cell title="Security address">
          {properties &&
            properties.map(({ address }) => (
              <StyledText key={`cell-${address.line_1}`}>
                {`${address.line_1}, ${address.line_2 || ""}`}
              </StyledText>
            ))}
        </Cell>
      </StyledInformationColumn>

      <StyledInformationColumn>
        <Cell title="Underwriter">
          <Underwriter
            underwriter={underwriterId}
            getOnSubmitFunction={getOnSubmitFunction}
          />
        </Cell>
        <Cell title="Broker">{broker_name}</Cell>
        <Cell title="Day One Gross">
          {currencyFormat(
            calculatorResponse.gross_amount_of_first_advance || 0
          )}
        </Cell>
        <Cell title="Total facility">
          {currencyFormat(calculatorResponse.total_loan_facility || 0)}
        </Cell>
      </StyledInformationColumn>
    </StyledInformationContainer>
  );
};

OverviewInfo.propTypes = {
  getOnSubmitFunction: PropTypes.func.isRequired,
};

export default OverviewInfo;
