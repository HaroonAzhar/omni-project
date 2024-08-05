import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { Button } from "components/atoms";

import SingleReferral from "./single_referral";
import useAmlKycPaths from "../../../use_aml_kyc_paths";

const getReferredFields = (fields) => {
  const referredFields = fields.filter(
    (field) => field.value && field.value.referral
  );
  return referredFields;
};

const Referral = ({ form, referralFunctions, applicant, onBack }) => {
  const fieldsNames = form.getRegisteredFields();
  const fields = fieldsNames.map((fieldName) => form.getFieldState(fieldName));
  const referredFields = getReferredFields(fields);

  const { getHomeScreenPath } = useAmlKycPaths();

  const history = useHistory();

  const submitIfChanged = () => {
    if (form.getState().pristine) {
      history.push(getHomeScreenPath());
      return;
    }
    form.submit();
    onBack();
  };

  return (
    <>
      {referredFields.map((field) => {
        const label =
          referralFunctions[field.name] && referralFunctions[field.name].label;
        return (
          <SingleReferral
            name={field.name}
            label={label}
            applicant={applicant}
            form={form}
          />
        );
      })}

      <Button type="button" onClick={submitIfChanged}>
        Back
      </Button>
    </>
  );
};

Referral.propTypes = {
  applicant: PropTypes.object.isRequired,
  referralFunctions: PropTypes.object,
  form: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Referral;
