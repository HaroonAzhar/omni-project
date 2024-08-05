import React from "react";
import { useSelector } from "react-redux";

import { ChangeStatusDropdown } from "components/molecules";
import { changeDipStatus } from "utils/requests";

const ChangeDipStatusDropdown = () => {
  const status = useSelector(({ case: caseData }) => caseData.Status);
  return (
    <ChangeStatusDropdown
      status={status}
      changeStatus={changeDipStatus}
      statuses={[
        "Not proceeding",
        "Awaiting Application",
        "Pending",
        "Issued",
        "On Hold",
      ]}
    />
  );
};

export default ChangeDipStatusDropdown;
