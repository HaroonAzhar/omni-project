import { useEffect } from "react";
import { useDispatch, batch } from "react-redux";
import { useParams } from "react-router-dom";

import { saveApplicationData } from "store/application/actions";
import { saveCalculatorData } from "store/calculator/actions";
import { addCaseData } from "store/case";
import { insertCaseSummaryData } from "store/case_summary";
import { insertCompletedData } from "store/completed";
import { insertDipData } from "store/dip";
import { useRequestWithProgressToastRollbar } from "utils";
import { getCase } from "utils/requests";

const useCaseData = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const fetchRequest = useRequestWithProgressToastRollbar(getCase);

  useEffect(() => {
    fetchRequest(id).then(({ data } = {}) => {
      if (data === undefined) {
        return;
      }
      const { dip, completed, application, caseSummary, ...caseCore } = data;

      batch(() => {
        dispatch(addCaseData({ caseCore }));
        dispatch(insertCompletedData({ completed }));
        dispatch(insertDipData({ dip }));
        dispatch(saveApplicationData(application));
        dispatch(
          saveCalculatorData({ calculatorResponse: dip.calculator_response })
        );
        dispatch(insertCaseSummaryData({ caseSummary }));
      });
    });
  }, [dispatch, fetchRequest, id]);
};

export default useCaseData;
