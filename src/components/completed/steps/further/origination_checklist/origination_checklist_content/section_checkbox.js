import React from "react";
import PropTypes from "prop-types";
import { camelize } from "inflected";

import { Checkbox } from "components/atoms";

const SectionCheckbox = ({
  sectionData,
  savingRequest,
  field,
  label,
  readOnlyView = false,
}) => {
  return (
    <Checkbox
      label={label}
      input={{
        onClick: () =>
          savingRequest(camelize(field, false), {
            [field]: true,
          }),
        checked: sectionData[field],
      }}
      disabled={readOnlyView || sectionData[field]}
    />
  );
};

SectionCheckbox.propTypes = {
  sectionData: PropTypes.object.isRequired,
  savingRequest: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
  label: PropTypes.string,
  readOnlyView: PropTypes.bool,
};

export default SectionCheckbox;
