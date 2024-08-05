import React, { useState } from "react";
import PropTypes from "prop-types";

import { SelectInput } from "components/atoms";

const ActionsDropdown = ({ actions, children, prompt }) => {
  const options = [prompt, ...Object.keys(actions)];
  const [value, setValue] = useState(prompt);
  return (
    <>
      <SelectInput
        input={{
          onChange: async (event) => {
            const actionName = event.target.value;
            (actions[actionName] ?? (() => {}))();
            setValue(prompt);
          },
          value,
        }}
        options={options}
      />
      {children}
    </>
  );
};

ActionsDropdown.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.node,
  prompt: PropTypes.string,
};

export default ActionsDropdown;
