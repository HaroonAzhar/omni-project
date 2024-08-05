import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import LOCALE from "core/locale";

import {
  SignWrapper,
  SpacedButton,
  SingleValidationWrapper,
} from "./styled_validate";
import { getUserName } from "../selector";

const SingleValidation = ({ name, date, onSign }) => {
  const user = useSelector(getUserName);
  return (
    <SingleValidationWrapper>
      I confirm all information input regarding AML/KYC/PEP status is correct as
      of today&apos;s date
      <SignWrapper>
        <SpacedButton
          onClick={() => {
            onSign({ name: user, date: new Date() });
          }}
        >
          Sign
        </SpacedButton>
        {name &&
          `Signed by ${name} on ${new Date(date).toLocaleDateString(LOCALE)}`}
      </SignWrapper>
    </SingleValidationWrapper>
  );
};

SingleValidation.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  onSign: PropTypes.func.isRequired,
};

export default SingleValidation;
