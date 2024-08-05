import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import styled from "styled-components";

import { getApplication, getApplicant } from "utils/requests";
import { TextInput, TextAreaInput, Checkbox, H2 } from "components/atoms";
import { StyledInfoBox } from "components/templates/dip_flow_template/styled_dip_flow";
import {
  StyledBackground,
  StyledContainer,
  StyledTitle,
  StyledHeader,
  StyledTableContainer,
} from "components/pages/dashboard/styled_dashboard";
import useInfoMessage from "hooks/use_info_message";
import { prepareApplicationDataForReduxStore } from "utils";
import { getAdminRecord } from "utils/requests/api";
import { AutoManualToggle } from "components/molecules";
import useGenerateCallbacks from "components/case_summary/steps/view_case_summary/view_case_summary_ui/case_summary_actions/use_generate_callbacks";

import GenerateFacilityButton from "./generate_facility_button";

const StyledDateField = styled(Field)`
  & input {
    width: 210px;
  }
`;

const StyledTextField = styled(Field)`
  margin-bottom: 20px;
  width: 500px;
`;

const StyledButtonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-top: 58px;
  position: relative;
`;

const StyledCheckbox = styled.div`
  margin-left: 30px;
`;

const StyledTextArea = styled(TextAreaInput)`
  & textarea {
    min-height: 120px;
  }
`;

const getInsurances = (buildingType) => {
  return [
    "buildingInsurance",
    ...(buildingType === "development"
      ? ["publicLiabilityInsurance", "contractorsAllRisk"]
      : []),
  ];
};

export const FacilityLetterContent = ({ facilityLetterDocumentRequest }) => {
  const { id } = useParams();
  const [caseNumber, setCaseNumber] = useState();
  const [infoMessage, setInfoMessage] = useInfoMessage();
  const [pdfData, setPdfData] = useState({ isDraft: true });

  const onSubmit = (values) => {
    setPdfData({ ...pdfData, ...values });
    facilityLetterDocumentRequest(values);
  };
  useEffect(() => {
    if (id) {
      getApplicant(id)
        .then((applicantResponse) => {
          const {
            application: preparedApplicantsRes,
          } = prepareApplicationDataForReduxStore(
            applicantResponse.data.attributes
          );

          getApplication(id).then((caseResponse) => {
            const {
              application,
              calculator,
            } = prepareApplicationDataForReduxStore(
              caseResponse.data.attributes.application
            );

            const { solicitor_details = {} } = application;
            const { omni_solicitor_id } = solicitor_details;

            getAdminRecord("solicitors", omni_solicitor_id).then((res) => {
              setPdfData({
                ...pdfData,
                ...application,
                ...calculator,
                ...preparedApplicantsRes,
                lenders_solicitor: res.data,
                insurances: getInsurances(application.building_type),
              });

              setCaseNumber(application.case_nr);
            });
          });
        })
        .catch(() => setInfoMessage("Downloading application data failed!"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setInfoMessage]);

  return (
    <>
      {infoMessage && <StyledInfoBox>{infoMessage}</StyledInfoBox>}

      <StyledHeader>
        <StyledTitle>Case ID: {caseNumber} </StyledTitle>
      </StyledHeader>
      <StyledTableContainer>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            ...pdfData,
            collateral_warranty:
              "A collateral warranty from the building contractor in respect of the building contract for the Project.",
          }}
          render={({ handleSubmit, initialValues, values }) => (
            <form onSubmit={handleSubmit}>
              <StyledDateField
                component={TextInput}
                type="date"
                name="date_of_outstanding_opfl"
                label="Date of Outstanding OPFL Loan included as part of the Legal Charge (optional)"
                placeholder="10/10/2020"
              />

              <StyledTextField
                component={TextInput}
                type="text"
                name="opfl_signatory_name"
                label="OPFL Signatory Name (optional)"
              />

              <H2>Required Insurance</H2>

              <StyledCheckbox>
                <Field
                  component={Checkbox}
                  type="checkbox"
                  name="insurances"
                  label="Buildings Insurance"
                  value="buildingInsurance"
                />
                <Field
                  component={Checkbox}
                  type="checkbox"
                  name="insurances"
                  label="Public Liability Insurance"
                  value="publicLiabilityInsurance"
                />
                <Field
                  component={Checkbox}
                  type="checkbox"
                  name="insurances"
                  label="Contractor's All Risks (including Public Liability)"
                  value="contractorsAllRisk"
                />
              </StyledCheckbox>

              {initialValues?.securities?.[0]?.security_country ===
                "united kingdom" && (
                <StyledButtonContainer>
                  <AutoManualToggle name="isScottish" initialValue={false} />{" "}
                  Use Scottish Wording?
                </StyledButtonContainer>
              )}

              {initialValues?.securities?.[0]?.security_country ===
                "scotland" && (
                <Field
                  type="checkbox"
                  name="isScottish"
                  defaultValue={true}
                  render={() => null}
                />
              )}

              {values.isScottish && (
                <StyledTextField
                  component={StyledTextArea}
                  type="text"
                  name="collateral_warranty"
                  label="Collatoral Warranty"
                />
              )}

              <StyledButtonContainer>
                <GenerateFacilityButton
                  pdfData={pdfData}
                  values={values}
                  caseNumber={caseNumber}
                />
                <AutoManualToggle name="isDraft" initialValue={true} /> Draft?
              </StyledButtonContainer>
            </form>
          )}
        />
      </StyledTableContainer>
    </>
  );
};

FacilityLetterContent.propTypes = {
  facilityLetterDocumentRequest: PropTypes.func,
};

const FacilityLetterPage = () => {
  const { facilityLetterDocumentRequest } = useGenerateCallbacks();
  return (
    <StyledBackground>
      <StyledContainer>
        <FacilityLetterContent
          facilityLetterDocumentRequest={facilityLetterDocumentRequest}
        />
      </StyledContainer>
    </StyledBackground>
  );
};

export default FacilityLetterPage;
