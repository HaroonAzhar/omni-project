/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import PropTypes from "prop-types";

import { Label } from "components/atoms";

const labelText =
  "Step(s) need rechecking as the DIP was edited since these steps were last amended";

const WarningLabel = ({ applicationSteps = [] }) => {
  const shouldShowLabel = applicationSteps.some(
    ({ status }) => status === "Recheck"
  );

  return shouldShowLabel ? <Label text={labelText} color="warn" /> : null;
};

WarningLabel.propTypes = {
  applicationSteps: PropTypes.array,
};

export default WarningLabel;
