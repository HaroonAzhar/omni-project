import React from "react";
import PropTypes from "prop-types";
import { titleize } from "inflected";

import { dateFormat, stripHtml } from "utils";
import ViewCrossCollateralisedLoans from "components/case_summary/steps/borrower_profile/cross_collaterised_loans/view_cross_collateralised_loans";

import { BORROWER_PROFILE } from "../../../../case_summary_steps";
import { RichTextContent, StepView, Columns, Column } from "../shared";

const BorrowerProfileView = ({
  clientMeetingDate,
  clientMeetingAttendees = "",
  borrowerProfile,
  clientMeetingNotes,
  crossCollateralisedLoans,
}) => {
  return (
    <StepView
      title={`${titleize(BORROWER_PROFILE)} and Client Meeting (${
        dateFormat(clientMeetingDate) ?? ""
      } - ${stripHtml(clientMeetingAttendees)})`}
    >
      <Columns>
        <Column>
          <RichTextContent title="Borrower Profile">
            {borrowerProfile}
          </RichTextContent>
        </Column>
        <Column>
          <RichTextContent title="Client meeting notes">
            {clientMeetingNotes}
          </RichTextContent>
        </Column>
      </Columns>
      <ViewCrossCollateralisedLoans
        allowDelete={false}
        crossCollateralisedLoans={crossCollateralisedLoans}
      />
    </StepView>
  );
};

BorrowerProfileView.propTypes = {
  clientMeetingDate: PropTypes.string,
  clientMeetingAttendees: PropTypes.string,
  borrowerProfile: PropTypes.string,
  clientMeetingNotes: PropTypes.string,
  crossCollateralisedLoans: PropTypes.array,
};

export default BorrowerProfileView;
