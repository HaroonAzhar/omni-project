import React from "react";

import ViewApplicationUI from "components/application/steps/view_application/view_application_ui";

import useViewApplicationCompletedData from "./use_view_application_completed_data";

const ViewCaseSummary = () => {
  const viewApplicationData = useViewApplicationCompletedData();
  return <ViewApplicationUI viewApplicationData={viewApplicationData} />;
};
export default ViewCaseSummary;
