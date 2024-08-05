import React from "react";

import { TextInput } from "components/atoms";
import { validationMsg } from "utils";

import { StyledAdminField } from "./styled_admin";

const Inputs = () => (
  <>
    <StyledAdminField
      component={TextInput}
      type="text"
      label="Name"
      name="Name"
      validate={(value) => (value ? undefined : validationMsg.required)}
    />
  </>
);

export default Inputs;
