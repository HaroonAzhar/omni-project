import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { H2 } from "components/atoms";

import {
  ValidateWrapper,
  ValidationTitle,
  BackButton,
} from "./styled_validate";
import SingleValidation from "./single_validation";
import useAmlKycPaths from "../use_aml_kyc_paths";
import useValidateData from "./use_validate_data";
import { getIsMlro } from "../selector";

const Validate = () => {
  const {
    validation_user_name,
    validation_user_date,
    validation_mlro_name,
    validation_mlro_date,
    modifyAmlKycValidation,
  } = useValidateData();

  const { getHomeScreenPath } = useAmlKycPaths();
  const history = useHistory();

  const isMlro = useSelector(getIsMlro);

  const modifyMlro = ({ name, date }) => {
    modifyAmlKycValidation({
      validation_mlro_name: name,
      validation_mlro_date: date,
    });
  };

  const modifyUser = ({ name, date }) => {
    modifyAmlKycValidation({
      validation_user_name: name,
      validation_user_date: date,
    });
  };

  return (
    <ValidateWrapper>
      <ValidationTitle>AML / KYC - Validation</ValidationTitle>
      <SingleValidation
        name={validation_user_name}
        date={validation_user_date}
        onSign={modifyUser}
      />
      {isMlro && (
        <>
          <H2>MLRO</H2>
          <SingleValidation
            name={validation_mlro_name}
            date={validation_mlro_date}
            onSign={modifyMlro}
          />
        </>
      )}
      <BackButton onClick={() => history.push(getHomeScreenPath())}>
        Back
      </BackButton>
    </ValidateWrapper>
  );
};

export default Validate;
