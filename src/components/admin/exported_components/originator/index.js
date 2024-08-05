import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getAdminRecords } from "utils/requests/api";

import OriginatorNameInput from "./originator_name_input";

const originatorAsSelectEntry = (originator) => ({
  value: originator.Id,
  label: originator.Name,
});

const useOriginators = (originator) => {
  const [originators, setOriginators] = useState([]);

  useEffect(() => {
    getAdminRecords("originators", originator).then((res) =>
      setOriginators(res ? res.data : [])
    );
  }, [originator]);

  return [
    { label: "Choose One", value: "" },
    ...originators.map(originatorAsSelectEntry),
  ];
};

const Originator = ({ originator, fieldName = "FkOriginatorId" }) => {
  const originators = useOriginators(originator);

  return (
    <OriginatorNameInput fieldName={fieldName} originators={originators} />
  );
};

Originator.propTypes = {
  originator: PropTypes.string,
  fieldName: PropTypes.string,
};

export default Originator;
