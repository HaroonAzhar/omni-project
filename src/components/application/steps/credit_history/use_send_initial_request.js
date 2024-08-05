import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  saveApplicationData,
  saveAllApplicantsState,
} from "store/application/actions";
import { saveCalculatorData } from "store/calculator/actions";
import { getApplicant, getApplication } from "utils/requests";
import { rollbar, prepareApplicationDataForReduxStore } from "utils";
import { fillIndividualsWithOtherData } from "components/application/helpers";

const useSendInitialRequests = ({ id, showInfoBox }) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    getApplicant(id)
      .then((res) => {
        const {
          application: preparedIndividualsRes,
        } = prepareApplicationDataForReduxStore(res.data.attributes);
        if (preparedIndividualsRes.individuals) {
          dispatch(saveAllApplicantsState(preparedIndividualsRes.individuals));
        } else {
          getApplication(id).then((caseResponse) => {
            const {
              application,
              calculator,
            } = prepareApplicationDataForReduxStore(
              caseResponse.data.attributes.application
            );

            const newIndividuals = fillIndividualsWithOtherData(
              preparedIndividualsRes,
              application
            );
            application.individuals = newIndividuals.map(
              (importedIndividual) => ({
                ...importedIndividual,
                notReady: true,
              })
            );

            dispatch(saveApplicationData(application));
            dispatch(saveCalculatorData(calculator));
          });
        }
      })
      .catch((err) => {
        rollbar.error("Data downloading failed!", err);
        showInfoBox("Data downloading failed!");
      });
  }, [dispatch, id, showInfoBox]);
};

export default useSendInitialRequests;
