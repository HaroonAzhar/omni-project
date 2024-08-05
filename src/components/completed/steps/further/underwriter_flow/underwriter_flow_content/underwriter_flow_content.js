import React from "react";
import { Field, Form } from "react-final-form";
import Grid from "@material-ui/core/Grid";
import { OnChange } from "react-final-form-listeners";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import moment from "moment";
import { camelize } from "inflected";

import { H2, SelectInput, TextInput } from "components/atoms";
import { TextEditor } from "components/molecules";
import { useUnderwriters } from "components/case_summary/steps/case_overview/underwriter";
import { useRequestWithProgressToastRollbar } from "utils";

import { useRequests } from "../../view_further_context";
import {
  SaveContainer,
  StyledSave,
  StyledLabel,
} from "./styled_underwriter_flow_content";
import UnderwriterFlowActions from "./underwriter_flow_actions";

const useSaveUnderwriterFlow = (further) => {
  const {
    fetchFurtherAndStore,
    saveUnderwriterFlowField,
    furtherIdKey,
  } = useRequests();
  const { id } = useParams();

  const endpointRequest = (fieldName, values) =>
    saveUnderwriterFlowField(
      id,
      further[furtherIdKey],
      camelize(fieldName, false),
      values
    ).then((res) => {
      if (!res) {
        return;
      }
      fetchFurtherAndStore();
    });

  const fieldRequest = (fieldName, value) =>
    endpointRequest(fieldName, {
      [fieldName]: value,
    });
  return {
    fieldRequest: useRequestWithProgressToastRollbar(fieldRequest),
    endpointRequest: useRequestWithProgressToastRollbar(endpointRequest),
  };
};

function UnderwriterFlowContent({ further, readOnlyView = false }) {
  const { underwriterFlow } = further;

  const { fieldRequest, endpointRequest } = useSaveUnderwriterFlow(further);

  const getRequest = (fieldName) => (value) => fieldRequest(fieldName, value);

  const underwriters = useUnderwriters();

  return (
    <>
      <H2>Underwriter Flow</H2>
      <Grid container spacing={3} justify="space-between">
        <Grid item m={6}>
          <Form
            onSubmit={() => {}}
            initialValues={{
              WriteUpDate: moment(underwriterFlow.WriteUpDate).format(
                moment.HTML5_FMT.DATE
              ),
            }}
            render={({ handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Field
                    component={TextInput}
                    name="WriteUpDate"
                    label="Write Up Date"
                    type="date"
                    disabled={readOnlyView}
                  />
                  <OnChange name="WriteUpDate">
                    {getRequest("WriteUpDate")}
                  </OnChange>
                </form>
              );
            }}
          />

          <Form
            onSubmit={() => {}}
            initialValues={underwriterFlow}
            render={({ handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Field
                    component={SelectInput}
                    type="select"
                    name="FkUnderwriterId"
                    label="Underwriter / Asset Manager Name"
                    options={underwriters}
                    disabled={readOnlyView}
                  />
                  <OnChange name="FkUnderwriterId">
                    {getRequest("FkUnderwriterId")}
                  </OnChange>
                </form>
              );
            }}
          />

          <Form
            onSubmit={({ AssessmentOfExitViability }) =>
              getRequest("AssessmentOfExitViability")(AssessmentOfExitViability)
            }
            initialValues={{
              AssessmentOfExitViability:
                underwriterFlow.AssessmentOfExitViability,
            }}
            render={({ handleSubmit, dirty }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Field
                    component={TextInput}
                    name="AssessmentOfExitViability"
                    label="Assessment of Exit Viability"
                    type="text"
                    disabled={readOnlyView}
                  />
                  <SaveContainer>
                    {!readOnlyView && dirty && <StyledSave>Save</StyledSave>}
                  </SaveContainer>
                </form>
              );
            }}
          />
          <StyledLabel>Description of works completed to date</StyledLabel>
          <TextEditor
            onSubmit={getRequest("DescriptionOfWorks")}
            state={underwriterFlow.DescriptionOfWorks}
            contextMenu={false}
            disabled={readOnlyView}
          />
        </Grid>
        <Grid item m={6}>
          <StyledLabel>Assessment of progress to date</StyledLabel>
          <TextEditor
            onSubmit={getRequest("AssessmentOfProgress")}
            state={underwriterFlow.AssessmentOfProgress}
            contextMenu={false}
            disabled={readOnlyView}
          />

          <StyledLabel>Risks / Concerns</StyledLabel>
          <TextEditor
            onSubmit={getRequest("RisksConcerns")}
            state={underwriterFlow.RisksConcerns}
            contextMenu={false}
            disabled={readOnlyView}
          />

          <UnderwriterFlowActions
            endpointRequest={endpointRequest}
            underwriterFlow={underwriterFlow}
            readOnlyView={readOnlyView}
          />
        </Grid>
      </Grid>
    </>
  );
}

UnderwriterFlowContent.propTypes = {
  further: PropTypes.object.isRequired,
  readOnlyView: PropTypes.bool,
};

export default UnderwriterFlowContent;
