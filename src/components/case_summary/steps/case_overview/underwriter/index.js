import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getAdminRecords } from "utils/requests/api";

import UnderwriterNameInput from "./underwriter_name_input";

const underwriterAsSelectEntry = (underwriter) => ({
  value: underwriter.Id,
  label: underwriter.Name,
});

export const useUnderwriters = (underwriter) => {
  const [underwriters, setUnderwriters] = useState([]);
  useEffect(() => {
    getAdminRecords("underwriters", underwriter).then((res) =>
      setUnderwriters(res ? res.data : [])
    );
  }, [underwriter]);
  return [
    { label: "Choose One", value: "" },
    ...underwriters.map(underwriterAsSelectEntry),
  ];
};

const Underwriter = ({ underwriter, getOnSubmitFunction }) => {
  const underwriters = useUnderwriters(underwriter);
  const fieldName = "underwriter";

  return (
    <UnderwriterNameInput
      initialState={{ underwriter }}
      fieldName={fieldName}
      save={(data) => getOnSubmitFunction(fieldName)(data)}
      underwriters={underwriters}
    />
  );
};

Underwriter.propTypes = {
  underwriter: PropTypes.string.isRequired,
  getOnSubmitFunction: PropTypes.func.isRequired,
};

export default Underwriter;
