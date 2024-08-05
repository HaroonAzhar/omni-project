import React, { useState } from "react";
import { useParams } from "react-router";

import { Label, SelectInput } from "components/atoms";
import { useAssignCaseToUser } from "hooks";

const AssignUserDropdown = () => {
  const { id } = useParams();

  const [caseToAssignUuid, setCaseToAssignUuid] = useState(id);

  const forceRefetch = () => {
    setCaseToAssignUuid("");
    setCaseToAssignUuid(id);
  };

  const {
    initialValues,
    labelText,
    onSubmit,
    options,
    currentUser,
  } = useAssignCaseToUser({
    caseToAssignUuid,
    onAssigned: forceRefetch,
  });
  const selectClassName = "select-user-to-assign";

  return (
    <>
      {currentUser.IsDeleted && (
        <Label color="warn" text={labelText} htmlFor={selectClassName} />
      )}
      <SelectInput
        input={{
          onChange: (event) => {
            onSubmit({ UserId: event.target.value });
          },
          value: initialValues.UserId,
          type: "text",
          name: "",
        }}
        options={options.map((option) => ({
          ...option,
          label: `User: ${option.label}`,
        }))}
        className={selectClassName}
      />
    </>
  );
};

export default AssignUserDropdown;
