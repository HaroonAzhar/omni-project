import React, { useRef, useState } from "react";
import { Form, Field } from "react-final-form";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { TextAreaInput } from "components/atoms";

import {
  StyledPanel,
  StyledPanelColumn,
  StyledSaveButton,
  StyledApplicantContent,
} from "./styled_panel";
import { useReferralField } from "../panels/shared/referral";
import Result from "./result";
import ApplicantHeading from "./applicant_heading";
import Referral from "./referral";
import useAmlKycPaths from "../../use_aml_kyc_paths";
import { getStatus } from "./get_result_state";

const Panel = ({
  applicant,
  modifyApplicant,
  left,
  right,
  referralFunctions = {},
  readOnly = false,
}) => {
  const { parse, format } = useReferralField();
  const [expanded, setExpanded] = useState(true);

  const { getHomeScreenPath, getReferralPath } = useAmlKycPaths();

  const history = useHistory();

  const [backRequested, setBackRequested] = useState(false);

  const formRef = useRef();
  const submit = (values) => {
    let saveValues = Object.entries(values).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value.innerValue }),
      {}
    );
    if (!readOnly) {
      const filteredValues = Object.entries(saveValues).filter(
        ([key, _]) =>
          !(
            key.includes("mlro_username") ||
            key.includes("mlro_date") ||
            key.includes("mlro_state")
          )
      );
      saveValues = filteredValues.reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {}
      );
    }
    saveValues.status = getStatus(formRef.current);

    modifyApplicant(applicant.index)(saveValues).then((result) => {
      if (result[0] && backRequested) {
        history.push(getHomeScreenPath());
        setBackRequested(false);
      }
    });
  };

  const backButtonClicked = () => {
    setBackRequested(true);
  };
  const initialValues = Object.entries(applicant.aml_kyc).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        innerValue: value,
        referral:
          referralFunctions[key] &&
          referralFunctions[key].referral &&
          referralFunctions[key].referral(value),
      },
    }),
    {}
  );

  const referredLink =
    readOnly === false ? getReferralPath(applicant.index) : null;
  return (
    <Form
      onSubmit={submit}
      initialValues={initialValues}
      render={({ handleSubmit, form, values, pristine }) => {
        formRef.current = form;

        return (
          <form onSubmit={handleSubmit}>
            <ApplicantHeading
              form={form}
              setExpanded={readOnly ? () => {} : setExpanded}
              expanded={expanded}
              referredLink={referredLink}
              applicant={applicant}
            />
            <StyledApplicantContent expanded={expanded}>
              <StyledPanel>
                <StyledPanelColumn>
                  <>
                    {left(values, form.reset, form.change)}
                    <Field
                      component={TextAreaInput}
                      name="additional_notes"
                      type="text"
                      label="Notes"
                      parse={parse}
                      format={format}
                      disabled={readOnly}
                    />
                  </>
                </StyledPanelColumn>
                <StyledPanelColumn>
                  <>
                    {right(values, form.reset, form.change)}
                    <Result
                      form={form}
                      applicant={applicant}
                      referredLink={referredLink}
                      needsToBeSaved={!pristine}
                    />
                    {!readOnly && (
                      <StyledSaveButton disabled={pristine}>
                        Save
                      </StyledSaveButton>
                    )}
                  </>
                </StyledPanelColumn>
              </StyledPanel>
              {readOnly && (
                <Referral
                  form={form}
                  referralFunctions={referralFunctions}
                  applicant={applicant}
                  onBack={backButtonClicked}
                />
              )}
            </StyledApplicantContent>
          </form>
        );
      }}
    />
  );
};
export default Panel;

Panel.propTypes = {
  applicant: PropTypes.object.isRequired,
  modifyApplicant: PropTypes.func.isRequired,
  left: PropTypes.element,
  right: PropTypes.element,
  referralFunctions: PropTypes.object,
  readOnly: PropTypes.bool,
};
