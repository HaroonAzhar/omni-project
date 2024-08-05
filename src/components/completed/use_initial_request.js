import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { saveApplicationData } from "store/application/actions";
import { saveCalculatorData } from "store/calculator/actions";
import { addCaseData } from "store/case";
import { insertCaseSummaryData } from "store/case_summary";
import { insertCompletedData } from "store/completed";
import { insertDipData } from "store/dip";
import { rollbar } from "utils";
import { getCase } from "utils/requests";

const useInitialRequest = (showInfoBox) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  return useCallback(() => {
    getCase(id)
      .then(({ data }) => {
        const { dip, completed, application, caseSummary, ...caseCore } = data;
        dispatch(addCaseData({ caseCore }));
        dispatch(insertCompletedData({ completed }));
        dispatch(insertDipData({ dip }));
        dispatch(saveApplicationData(application));
        dispatch(
          saveCalculatorData({ calculatorResponse: dip.calculator_response })
        );
        dispatch(insertCaseSummaryData({ caseSummary }));
      })
      .catch((err) => {
        showInfoBox("Data downloading failed!");
        rollbar.error("Data downloading failed!", err);
      });
  }, [dispatch, id, showInfoBox]);
};

export default useInitialRequest;
