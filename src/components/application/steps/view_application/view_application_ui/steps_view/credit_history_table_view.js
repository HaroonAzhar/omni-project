import React from "react";
import PropTypes from "prop-types";
import { titleize } from "inflected";

import { mapBooleanFieldToString } from "utils";

import { StepView, Columns, RenderSectionConditionally } from "../shared";
import { useExpandForStatus } from "./hooks";
import {
  LabelStyle,
  CopyStyle,
  CopyBoldStyle,
  RowFull,
} from "../shared/shared_styles";
import {
  CreditHistoryWrapper,
  CreditHistoryRow,
  CreditHistoryBlockLeft,
  CreditHistoryBlockRight,
  CreditHistoryBlockFull,
  CreditHistoryRowPadding,
  CreditHistoryDetailsRow,
} from "./styled_credit_history_table_view";

const CreditHistoryTableItem = ({ individual }) => {
  return (
    <div>
      <div>
        {individual?.personal_data?.forename}
        {individual?.personal_data?.surname}
      </div>

      <CreditHistoryRow>
        <p>
          {individual?.credit_history?.refused_mortgage !== undefined
            ? `${mapBooleanFieldToString(
                individual?.credit_history?.refused_mortgage
              )}`
            : "-"}
        </p>
      </CreditHistoryRow>
      <CreditHistoryRow>
        <p>
          {individual?.credit_history?.debt_judgement !== undefined
            ? `${mapBooleanFieldToString(
                individual?.credit_history?.debt_judgement
              )}`
            : "-"}
        </p>
      </CreditHistoryRow>
      <CreditHistoryRow>
        <p>
          {individual?.credit_history?.declared_bankrupt !== undefined
            ? `${mapBooleanFieldToString(
                individual?.credit_history?.declared_bankrupt
              )}`
            : "-"}
        </p>
      </CreditHistoryRow>
      <CreditHistoryRow>
        <p>
          {individual?.credit_history?.failed_to_keep !== undefined
            ? `${mapBooleanFieldToString(
                individual?.credit_history?.failed_to_keep
              )}`
            : "-"}
        </p>
      </CreditHistoryRow>
      <CreditHistoryRow>
        <p>
          {individual?.credit_history?.claim_dss !== undefined
            ? `${mapBooleanFieldToString(
                individual?.credit_history?.claim_dss
              )}`
            : "-"}
        </p>
      </CreditHistoryRow>
      <CreditHistoryRow>
        <p>
          {individual?.credit_history?.convicted_fraud !== undefined
            ? `${mapBooleanFieldToString(
                individual?.credit_history?.convicted_fraud
              )}`
            : "-"}
        </p>
      </CreditHistoryRow>
    </div>
  );
};
const CreditHistoryTableDetailsItem = ({ individual }) => {
  const ifDetail = () => {
    if (
      individual?.credit_history?.details !== undefined ||
      individual?.credit_history?.refused_mortgage_details !== undefined ||
      individual?.credit_history?.debt_judgement_details !== undefined ||
      individual?.credit_history?.declared_bankrupt_details !== undefined ||
      individual?.credit_history?.falied_to_keep_details !== undefined ||
      individual?.credit_history?.claim_dss_details !== undefined ||
      individual?.credit_history?.convicted_fraud_details !== undefined
    ) {
      return true;
    }
    return false;
  };

  return ifDetail() ? (
    <CreditHistoryRowPadding>
      <CreditHistoryDetailsRow>
        <RowFull>
          {individual?.personal_data?.forename}{" "}
          {individual?.personal_data?.surname} -{" "}
          {individual?.credit_history?.details}.
        </RowFull>

        {(individual?.credit_history?.refused_mortgage_details && (
          <RowFull>
            <CopyBoldStyle>Refused Mortgage Issue: </CopyBoldStyle>
            <CopyStyle>
              {individual?.credit_history?.refused_mortgage_details}
            </CopyStyle>
          </RowFull>
        )) ??
          null}
        {(individual?.credit_history?.debt_judgement_details && (
          <RowFull>
            <CopyBoldStyle>Debt Judegment Issue: </CopyBoldStyle>
            <CopyStyle>
              {individual?.credit_history?.debt_judgement_details}
            </CopyStyle>
          </RowFull>
        )) ??
          null}
        {(individual?.credit_history?.declared_bankrupt_details && (
          <RowFull>
            <CopyBoldStyle>Declared Bankrupt Issue: </CopyBoldStyle>
            <CopyStyle>
              {individual?.credit_history?.declared_bankrupt_details}
            </CopyStyle>
          </RowFull>
        )) ??
          null}
        {(individual?.credit_history?.falied_to_keep_details && (
          <RowFull>
            <CopyBoldStyle>Previous Payments Issue: </CopyBoldStyle>
            <CopyStyle>
              {individual?.credit_history?.falied_to_keep_details}
            </CopyStyle>
          </RowFull>
        )) ??
          null}
        {(individual?.credit_history?.claim_dss_details && (
          <RowFull>
            <CopyBoldStyle>DSS Claim Issue: </CopyBoldStyle>
            <CopyStyle>
              {individual?.credit_history?.claim_dss_details}
            </CopyStyle>
          </RowFull>
        )) ??
          null}
        {(individual?.credit_history?.convicted_fraud_details && (
          <RowFull>
            <CopyBoldStyle>Fraud Conviction Issue: </CopyBoldStyle>
            <CopyStyle>
              {individual?.credit_history?.convicted_fraud_details}
            </CopyStyle>
          </RowFull>
        )) ??
          null}
      </CreditHistoryDetailsRow>
    </CreditHistoryRowPadding>
  ) : null;
};

const CreditHistoryTableView = ({ individuals, status, expanded }) => {
  const isExpanded = useExpandForStatus(status, expanded, "New");

  return (
    <StepView
      title={`${titleize("Credit History")}`}
      status={status}
      expanded={isExpanded}
    >
      <RenderSectionConditionally status={status}>
        <Columns>
          <CreditHistoryWrapper>
            <CreditHistoryBlockLeft>
              <CreditHistoryRow>
                <p>
                  Have you ever been refused a mortgage on this or any other
                  property?{" "}
                </p>
              </CreditHistoryRow>
              <CreditHistoryRow>
                <p>
                  Have any of the directors/shareholders ever had a judgement
                  for debt recorded against them?{" "}
                </p>
              </CreditHistoryRow>
              <CreditHistoryRow>
                <p>
                  Have you ever been declared bankrupt or compounded with your
                  creditors?{" "}
                </p>
              </CreditHistoryRow>
              <CreditHistoryRow>
                <p>
                  Have you ever failed to keep up with payments under any
                  present or previous mortgage, rental or loan agreement?{" "}
                </p>
              </CreditHistoryRow>
              <CreditHistoryRow>
                <p>Have you made a claim to the DSS in the last 12 months? </p>
              </CreditHistoryRow>
              <CreditHistoryRow>
                <p>Have you ever been convicted of a fraud offence? </p>
              </CreditHistoryRow>
            </CreditHistoryBlockLeft>
            <CreditHistoryBlockRight>
              {individuals?.map((individual) => {
                return (
                  <CreditHistoryTableItem
                    key={individual.applicant_id}
                    individual={individual}
                  />
                );
              })}
            </CreditHistoryBlockRight>
          </CreditHistoryWrapper>
          <CreditHistoryBlockFull>
            <LabelStyle>Other Details</LabelStyle>
            {individuals?.map((individual) => {
              return (
                <CreditHistoryTableDetailsItem
                  key={individual.applicant_id}
                  individual={individual}
                />
              );
            })}
          </CreditHistoryBlockFull>
        </Columns>
      </RenderSectionConditionally>
    </StepView>
  );
};

CreditHistoryTableDetailsItem.propTypes = {
  individual: PropTypes.object,
};
CreditHistoryTableItem.propTypes = {
  individual: PropTypes.object,
};
CreditHistoryTableView.propTypes = {
  status: PropTypes.string,
  individuals: PropTypes.array,
  expanded: PropTypes.bool,
};

export default CreditHistoryTableView;
