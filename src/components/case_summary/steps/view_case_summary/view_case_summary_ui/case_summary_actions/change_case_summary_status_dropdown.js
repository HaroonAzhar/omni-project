import React from "react";
import { useSelector } from "react-redux";

import { ChangeStatusDropdown } from "components/molecules";
import { changeApplicationStatus } from "utils/requests";

const ChangeCaseSummaryStatusDropdown = () => {
  const { status } = useSelector(({ application }) => application);

  return (
    <ChangeStatusDropdown
      status={status}
      changeStatus={changeApplicationStatus}
      statuses={["In progress", "Checked", "Not proceeding", "On Hold"]}
    />
  );
};

export default ChangeCaseSummaryStatusDropdown;
