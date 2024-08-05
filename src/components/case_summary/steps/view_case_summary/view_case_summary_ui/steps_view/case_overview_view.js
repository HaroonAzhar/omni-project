import React from "react";
import PropTypes from "prop-types";
import { titleize } from "inflected";

import { dateFormat } from "utils";

import { CASE_OVERVIEW } from "../../../../case_summary_steps";
import { RichTextContent, StepView } from "../shared";

const CaseOverviewView = ({
  underwriterName = "",
  startCaseSummaryDate,
  expectedCompletionDate,
  executiveSummary,
}) => {
  return (
    <StepView
      title={`${titleize(CASE_OVERVIEW)} - ${underwriterName} - ${
        dateFormat(startCaseSummaryDate) ?? ""
      }`}
    >
      <RichTextContent title="Executive summary">
        {executiveSummary}
      </RichTextContent>
      <>Expected Completion Date: {dateFormat(expectedCompletionDate)}</>
    </StepView>
  );
};

CaseOverviewView.propTypes = {
  underwriterName: PropTypes.string,
  startCaseSummaryDate: PropTypes.string,
  executiveSummary: PropTypes.string,
  expectedCompletionDate: PropTypes.string,
};

export default CaseOverviewView;
