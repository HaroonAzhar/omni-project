import React from "react";
import PropTypes from "prop-types";
import { titleize } from "inflected";

import {
  StyledFormWrapper,
  StyledBackground,
} from "components/molecules/form_wrapper";
import { H1 } from "components/atoms";
import { CaseTagsView } from "components/molecules/case_tags/case_tags";

import { VIEW_CASE_SUMMARY } from "../../../case_summary_steps";
import {
  CaseOverviewView,
  SecurityView,
  RiskAndMitigationView,
  FurtherCommentsView,
  BorrowerProfileView,
} from "./steps_view";
import { TitleWrapper } from "./styled_view_case_summary_ui";
import CaseSummaryActions from "./case_summary_actions";

const ViewCaseSummaryUI = ({ viewCaseSummaryData = {}, showMenu = false }) => {
  const {
    titleNumbers,
    propertiesData,
    underwriterName,
    startCaseSummaryDate,
    executiveSummary,
    descriptionOfProperty,
    valuer,
    analysisOfProperty,
    riskInputs,
    underwriterRationale,
    exitStrategy,
    ongoingMonitoring,
    specialConditions,
    borrowerProfile,
    clientMeetingAttendees,
    clientMeetingDate,
    clientMeetingNotes,
    crossCollateralisedLoans,
    associatedTags,
    sendDeletingRequest,
    expectedCompletionDate,
  } = viewCaseSummaryData;

  return (
    <StyledBackground>
      <StyledFormWrapper>
        <TitleWrapper>
          <H1>{titleize(VIEW_CASE_SUMMARY)}</H1>
          {showMenu && <CaseSummaryActions />}
        </TitleWrapper>

        <CaseTagsView
          associatedTags={associatedTags}
          sendDeletingRequest={sendDeletingRequest}
        />
        <CaseOverviewView
          executiveSummary={executiveSummary}
          underwriterName={underwriterName}
          startCaseSummaryDate={startCaseSummaryDate}
          expectedCompletionDate={expectedCompletionDate}
        />

        <SecurityView
          analysisOfProperty={analysisOfProperty}
          descriptionOfProperty={descriptionOfProperty}
          titleNumbers={titleNumbers}
          propertiesData={propertiesData}
          valuer={valuer}
        />

        <RiskAndMitigationView
          underwriterRationale={underwriterRationale}
          riskInputs={riskInputs}
        />

        <FurtherCommentsView
          exitStrategy={exitStrategy}
          ongoingMonitoring={ongoingMonitoring}
          specialConditions={specialConditions}
        />

        <BorrowerProfileView
          borrowerProfile={borrowerProfile}
          clientMeetingAttendees={clientMeetingAttendees}
          clientMeetingDate={clientMeetingDate}
          clientMeetingNotes={clientMeetingNotes}
          crossCollateralisedLoans={crossCollateralisedLoans}
        />
      </StyledFormWrapper>
    </StyledBackground>
  );
};

ViewCaseSummaryUI.propTypes = {
  viewCaseSummaryData: PropTypes.object.isRequired,
  showMenu: PropTypes.bool,
};

export default ViewCaseSummaryUI;
