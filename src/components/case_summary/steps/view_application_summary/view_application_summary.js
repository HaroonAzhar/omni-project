import React from "react";

import useViewApplicationData from "components/application/steps/view_application/use_view_application_data";
import ViewApplicationSummaryUI from "components/application/steps/view_application/view_application_ui/view_application_ui";

const ViewApplicationSummary = () => {
  const viewApplicationData = useViewApplicationData();

  return (
    <ViewApplicationSummaryUI
      viewApplicationData={viewApplicationData}
      showMenu={false}
    />
  );
};

export default ViewApplicationSummary;
