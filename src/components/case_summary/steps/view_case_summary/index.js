import React from "react";

import useViewCaseSummaryData from "./use_view_case_summary_data";
import ViewCaseSummaryUI from "./view_case_summary_ui";

const ViewCaseSummary = () => {
  const viewCaseSummaryData = useViewCaseSummaryData();
  return (
    <ViewCaseSummaryUI
      viewCaseSummaryData={viewCaseSummaryData}
      showMenu={true}
    />
  );
};

export default ViewCaseSummary;
