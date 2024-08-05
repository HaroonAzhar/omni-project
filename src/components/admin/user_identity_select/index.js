import React from "react";
import PropTypes from "prop-types";

import { SelectInput } from "components/atoms";

import { StyledAdminField } from "../styled_admin";

const UserIdentitySelect = ({ identities = [] }) => {
  const userIdentityOptions = [
    { value: "", label: "Choose one" },
    ...identities.map((identity) => ({
      value: identity,
      label: identity,
    })),
  ];
  return (
    <StyledAdminField
      component={SelectInput}
      name="UserIdentity"
      label="User Identity"
      options={userIdentityOptions}
    />
  );
};

UserIdentitySelect.propTypes = {
  identities: PropTypes.array,
};
export default UserIdentitySelect;
