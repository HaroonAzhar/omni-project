import { useCallback, useEffect } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";

import { useFetchAndStoreApplicants } from "components/application/helpers/hooks";
import { saveAmlKycValidation } from "store/application/actions";

import useSavingRequest from "./use_saving_request";

const getApplication = (state) => state.application;

const getAmlKycValidation = createSelector(
  [getApplication],
  (application) => application.aml_kyc_validation || {}
);

const useValidateData = () => {
  const showInfoBox = useCallback(() => {}, []);
  const dispatch = useDispatch();
  const initialRequest = useFetchAndStoreApplicants({ showInfoBox });

  const sendRequest = useSavingRequest();

  useEffect(() => {
    initialRequest();
  }, [initialRequest]);

  const amlKycValidation = useSelector(getAmlKycValidation);

  const modifyAmlKycValidation = (newAmlKycValidationValues) => {
    dispatch(saveAmlKycValidation(newAmlKycValidationValues));
    sendRequest(newAmlKycValidationValues);
  };

  return {
    ...amlKycValidation,
    modifyAmlKycValidation,
  };
};

export default useValidateData;
