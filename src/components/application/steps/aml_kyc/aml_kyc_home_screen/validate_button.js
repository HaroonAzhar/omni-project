import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { Label } from "components/atoms";
import LOCALE from "core/locale";
import { useFetchAndStoreApplicants } from "components/application/helpers/hooks";

import useAmlKycPaths from "../use_aml_kyc_paths";
import useValidateData from "../validate/use_validate_data";
import { SpacedButton } from "../validate/styled_validate";

const ValidateButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;
const ValidateButton = ({ canValidate = true, applicants }) => {
  const { getValidationPath } = useAmlKycPaths();
  const history = useHistory();
  const { validation_mlro_name, validation_mlro_date } = useValidateData();

  const showInfoBox = useCallback(() => {}, []);
  const initialRequest = useFetchAndStoreApplicants({ showInfoBox });

  useEffect(() => {
    initialRequest();
  }, [initialRequest, applicants]);

  const labelText = canValidate
    ? ""
    : "AML/KYC confirmation cannot be completed until AML/KYC has been completed for all applicants";
  return (
    <>
      <Label color="warn" text={labelText} htmlFor="validate-button" />
      <ValidateButtonContainer>
        <SpacedButton
          onClick={() => history.push(getValidationPath())}
          disabled={!canValidate}
        >
          Validate
        </SpacedButton>
        {validation_mlro_name &&
          `Signed by ${validation_mlro_name} on ${new Date(
            validation_mlro_date
          ).toLocaleDateString(LOCALE)}`}
      </ValidateButtonContainer>
    </>
  );
};

export default ValidateButton;

ValidateButton.propTypes = {
  canValidate: PropTypes.bool,
  applicants: PropTypes.array,
};
