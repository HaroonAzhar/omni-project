import React from "react";

import useViewApplicationData from "./use_view_application_data";
import ViewApplicationUI from "./view_application_ui";

const ViewApplication = () => {
  const viewApplicationData = useViewApplicationData();

  return (
    <ViewApplicationUI
      viewApplicationData={viewApplicationData}
      showMenu={true}
    />
  );
};

export default ViewApplication;
