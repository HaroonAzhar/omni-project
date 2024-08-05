import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { underscore } from "inflected";

import { SelectInput } from "components/atoms";
import { useRequestWithProgressToastRollbar } from "utils";

const ChangeStatusDropdown = ({ status, changeStatus, statuses }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const { id } = useParams();
  const changeStatusRequest = useRequestWithProgressToastRollbar(changeStatus);

  const options = statuses.map((statusName) => ({
    label: `Status: ${statusName}`,
    value: underscore(statusName).split(" ").join("_"),
  }));
  return (
    <SelectInput
      input={{
        onChange: async (event) => {
          const newStatus = event.target.value;
          const success = await changeStatusRequest(id, newStatus);
          if (success) {
            setCurrentStatus(newStatus);
          }
        },
        value: currentStatus ?? status,
        type: "text",
        name: "",
      }}
      options={options}
    />
  );
};

ChangeStatusDropdown.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  status: PropTypes.string,
  statuses: PropTypes.array.isRequired,
};

export default ChangeStatusDropdown;
