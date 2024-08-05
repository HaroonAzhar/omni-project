import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { saveBorrowerProfileState } from "store/application/actions";
import { Button, NavigationButtonContainer } from "components/atoms";
import { TextEditor, FormWrapper } from "components/molecules";
import {
  getBorrowerProfileOfBorrower,
  getClientMeetingAttendeesOfBorrower,
  getClientMeetingDateOfBorrower,
  getClientMeetingNotesOfBorrower,
} from "components/case_summary/selectors";

import { BORROWER_PROFILE } from "../../case_summary_steps";
import useCaseSummaryFlowPaths from "../../use_case_summary_flow_paths";
import { StyledInputContainer } from "../../case_summary_styles";
import { useSubmitCaseSummary } from "../shared";
import ClientMeetingDate from "./client_meeting_date";
import CrossCollateralisedLoans from "./cross_collaterised_loans";

const StyledLabel = styled.span`
  display: block;
  padding-bottom: 20px;
`;

const BorrowerProfile = () => {
  const dispatch = useDispatch();

  const borrowerProfile = useSelector(getBorrowerProfileOfBorrower);
  const clientMeetingDate = useSelector(getClientMeetingDateOfBorrower);
  const clientMeetingAttendees = useSelector(
    getClientMeetingAttendeesOfBorrower
  );
  const clientMeetingNotes = useSelector(getClientMeetingNotesOfBorrower);

  const submit = useSubmitCaseSummary();

  const getOnSubmitFunction = (name) => (text) => {
    const dataToSave = { [name]: text };
    dispatch(saveBorrowerProfileState(dataToSave));
    submit("borrower", dataToSave);
  };

  const { goStepBack, goToNextStep } = useCaseSummaryFlowPaths(
    BORROWER_PROFILE
  );

  return (
    <FormWrapper title="Borrower Profile">
      <StyledInputContainer>
        <StyledLabel>Borrower Profile</StyledLabel>
        <TextEditor
          onSubmit={getOnSubmitFunction("borrower_profile")}
          state={borrowerProfile}
        />
      </StyledInputContainer>

      <StyledInputContainer>
        <StyledLabel>Client meeting date</StyledLabel>
        <ClientMeetingDate
          save={getOnSubmitFunction("client_meeting_date")}
          initialState={clientMeetingDate}
          fieldName="client_meeting_date"
        />
      </StyledInputContainer>

      <StyledInputContainer>
        <StyledLabel>Client meeting attendees</StyledLabel>
        <TextEditor
          onSubmit={getOnSubmitFunction("client_meeting_attendees")}
          state={clientMeetingAttendees}
        />
      </StyledInputContainer>

      <StyledInputContainer>
        <StyledLabel>Client meeting notes</StyledLabel>
        <TextEditor
          onSubmit={getOnSubmitFunction("client_meeting_notes")}
          state={clientMeetingNotes}
        />
      </StyledInputContainer>

      <CrossCollateralisedLoans />

      <NavigationButtonContainer>
        <Button kind="fade" onClick={goStepBack}>
          Back
        </Button>
        <Button onClick={goToNextStep}>Next</Button>
      </NavigationButtonContainer>
    </FormWrapper>
  );
};

export default BorrowerProfile;
