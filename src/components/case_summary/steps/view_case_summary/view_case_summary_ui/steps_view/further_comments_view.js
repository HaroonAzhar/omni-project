import React from "react";
import PropTypes from "prop-types";
import { titleize } from "inflected";

import { FURTHER_COMMENTS } from "../../../../case_summary_steps";
import { RichTextContent, StepView, Columns, Column } from "../shared";

const FurtherCommentsView = ({
  exitStrategy,
  ongoingMonitoring,
  specialConditions,
}) => {
  return (
    <StepView title={titleize(FURTHER_COMMENTS)}>
      <Columns>
        <Column>
          <RichTextContent title="Exit Strategy">
            {exitStrategy}
          </RichTextContent>
          <RichTextContent title="Ongoing Monitoring">
            {ongoingMonitoring}
          </RichTextContent>
        </Column>
        <Column>
          <RichTextContent title="Special Conditions">
            {specialConditions}
          </RichTextContent>
        </Column>
      </Columns>
    </StepView>
  );
};

FurtherCommentsView.propTypes = {
  exitStrategy: PropTypes.string,
  ongoingMonitoring: PropTypes.string,
  specialConditions: PropTypes.string,
};

export default FurtherCommentsView;
