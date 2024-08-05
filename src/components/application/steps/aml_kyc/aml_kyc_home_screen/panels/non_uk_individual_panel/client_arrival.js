import React from "react";
import PropTypes from "prop-types";

import SelectQuestion from "../shared/select_question";

const clientArrivalOptions = ["> 3 Months", "< 3 Months"];

const ClientArrival = ({ disabled = false }) => {
  return (
    <SelectQuestion
      optionLabels={clientArrivalOptions}
      name="client_arrival_in_uk"
      label="Client arrival in UK"
      disabled={disabled}
    />
  );
};

export default ClientArrival;

ClientArrival.propTypes = {
  disabled: PropTypes.bool,
};
