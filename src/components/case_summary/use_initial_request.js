import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getCaseSummary, getApplicant } from "utils/requests";
import { rollbar, prepareApplicationDataForReduxStore } from "utils";
import {
  saveApplicationData,
  saveAllApplicantsState,
} from "store/application/actions";
import { saveCalculatorData } from "store/calculator/actions";

const useInitialRequest = (showInfoBox) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  return useCallback(() => {
    getCaseSummary(id)
      .then(({ data }) => {
        const { application, calculator } = prepareApplicationDataForReduxStore(
          data.attributes.case_summary
        );
        getApplicant(id).then((applicantResponse) => {
          const {
            application: preparedApplicantsRes,
          } = prepareApplicationDataForReduxStore(
            applicantResponse.data.attributes
          );

          dispatch(saveApplicationData(application));
          dispatch(saveCalculatorData(calculator));
          dispatch(saveAllApplicantsState(preparedApplicantsRes.individuals));
        });
      })
      .catch((err) => {
        showInfoBox("Data downloading failed!");
        rollbar.error("Data downloading failed!", err);
      });
  }, [dispatch, id, showInfoBox]);
};

export default useInitialRequest;
