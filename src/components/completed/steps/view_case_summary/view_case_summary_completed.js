import React from "react";

import ViewCaseSummaryUI from "components/case_summary/steps/view_case_summary/view_case_summary_ui";

import useViewCaseSummaryCompletedData from "./use_view_case_summary_completed_data";

const ViewCaseSummary = () => {
  const viewCaseSummaryData = useViewCaseSummaryCompletedData();
  return <ViewCaseSummaryUI viewCaseSummaryData={viewCaseSummaryData} />;
};
export default ViewCaseSummary;
