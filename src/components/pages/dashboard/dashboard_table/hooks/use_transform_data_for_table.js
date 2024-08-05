import { useCallback } from "react";

import {
  prepareSearchingString,
  getDefaultStatusOf,
  mapStages,
  getStatusRepr,
} from "../helpers";

const useTransformDataForTable = () => {
  return useCallback((item) => {
    /**
     * TODO: when we use CC in app, transformer like that is a good place to convert it for further using.
     */
    return {
      name: item.Applicants,
      ref_number: item.CaseNr,
      date_created: item.CreatedAt,
      gross_amount: item.GrossTotalLoanAmount,
      loan_term: item.LoanTerm,
      case_stage: mapStages(item.Stage),
      status: getStatusRepr(item.Status || getDefaultStatusOf(item.Stage)),
      sub_statuses: item.SubStatuses,
      _searching: prepareSearchingString(item),
      assigned_user: item.AssignedUserName,
      edit_link: `/${item.Stage}/${item.Id}`,
      associatedTags: item.associatedTags,
    };
  }, []);
};

export default useTransformDataForTable;
