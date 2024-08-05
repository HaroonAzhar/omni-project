import React from "react";
import { Field } from "react-final-form";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { titleize } from "inflected";

import { H2, TextAreaInput } from "components/atoms";
import LOCALE from "core/locale";

import useReferralField from "../../../panels/shared/use_referral_field";
import {
  SingleReferralWrapper,
  SignWrapper,
  SpacedButton,
} from "./styled_single_referral";
import { getIsMlro, getUserName } from "../../../../selector";

const SingleReferral = ({ name, label, applicant, form }) => {
  const { parse, format } = useReferralField();
  const isMlro = useSelector(getIsMlro);
  const userName = useSelector(getUserName);

  const mlro_state = applicant.aml_kyc[`${name}_mlro_state`];
  const mlro_username = applicant.aml_kyc[`${name}_mlro_username`];
  const mlro_date = new Date(
    applicant.aml_kyc[`${name}_mlro_date`]
  ).toLocaleDateString(LOCALE);

  return (
    <SingleReferralWrapper>
      <H2>Referral - {label}</H2>
      <Field
        component={TextAreaInput}
        name={`${name}_user_comments`}
        type="text"
        label="User comments"
        parse={parse}
        format={format}
      />
      <Field
        component={TextAreaInput}
        name={`${name}_mlro_comments`}
        type="text"
        label="MLRO comments"
        parse={parse}
        format={format}
        disabled={!isMlro}
      />
      <Field
        name={`${name}_mlro_username`}
        type="text"
        parse={parse}
        format={format}
        render={() => null}
      />
      <Field
        name={`${name}_mlro_date`}
        type="text"
        parse={parse}
        format={format}
        render={() => null}
      />
      <SignWrapper>
        {isMlro && (
          <>
            Refer Validated and acceptable{" "}
            <SpacedButton
              onClick={() => {
                form.change(`${name}_mlro_username`, { innerValue: userName });
                form.change(`${name}_mlro_date`, { innerValue: new Date() });
                form.change(`${name}_mlro_state`, { innerValue: "signed" });
              }}
              type="submit"
            >
              Sign
            </SpacedButton>{" "}
            <SpacedButton
              onClick={() => {
                form.change(`${name}_mlro_username`, { innerValue: userName });
                form.change(`${name}_mlro_date`, { innerValue: new Date() });
                form.change(`${name}_mlro_state`, { innerValue: "rejected" });
              }}
              type="submit"
            >
              Reject
            </SpacedButton>{" "}
          </>
        )}
        {mlro_state &&
          `${titleize(mlro_state)} by ${mlro_username} on ${mlro_date}`}
      </SignWrapper>
    </SingleReferralWrapper>
  );
};

SingleReferral.propTypes = {
  applicant: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
};

export default SingleReferral;
