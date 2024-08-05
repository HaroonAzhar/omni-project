import React from "react";
import styled from "styled-components";

import { AssignUserDropdown, AddTagDropdown } from "components/molecules";

import ApplicationButton from "./application_button";
import ChangeDipStatusDropdown from "./change_dip_status";
import DeleteButton from "./delete_button";

const DipActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 700px;
`;

const DipActions = () => {
  return (
    <DipActionsWrapper>
      <DeleteButton />
      <AssignUserDropdown />
      <AddTagDropdown />
      <ChangeDipStatusDropdown />
      <ApplicationButton />
    </DipActionsWrapper>
  );
};

export default DipActions;
