import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  saveAllApplicantsState,
  saveApplicationData,
  saveCompanyData,
} from "store/application/actions";
import { getApplicant, getApplication } from "utils/requests";
import { rollbar, prepareApplicationDataForReduxStore } from "utils";
import { saveCalculatorData } from "store/calculator/actions";
import getApplicationForStore from "components/application/steps/security_details/get_application_for_store";

import fillIndividualsWithOtherData from "../fill_individuals_with_other_data";

const useFetchAndStoreApplicants = ({ showInfoBox }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  return useCallback(() => {
    getApplication(id)
      .then((res) => {
        const { application, calculator } = prepareApplicationDataForReduxStore(
          res.data.attributes.application
        );
        getApplicant(id).then((applicantResponse) => {
          const {
            application: preparedApplicantsRes,
          } = prepareApplicationDataForReduxStore(
            applicantResponse.data.attributes
          );

          const applicationForStore = getApplicationForStore(application);

          dispatch(saveApplicationData(applicationForStore));
          dispatch(saveCalculatorData(calculator));

          const newIndividuals = fillIndividualsWithOtherData(
            preparedApplicantsRes,
            application
          );

          dispatch(saveAllApplicantsState(newIndividuals));
          if (preparedApplicantsRes.company !== undefined) {
            dispatch(saveCompanyData(preparedApplicantsRes.company[0]));
          }
        });
      })
      .catch((err) => {
        rollbar.error("Data downloading failed!", err);
        showInfoBox("Data downloading failed!");
      });
  }, [dispatch, id, showInfoBox]);
};

export default useFetchAndStoreApplicants;
