import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { getAdminRecords } from "utils/requests/api";
import { SelectInput } from "components/atoms";

const waypointNameAsSelectEntry = (waypointName) => ({
  value: waypointName.Name,
  label: waypointName.Name,
});

const useWaypointNames = (waypointName) => {
  const [waypointNames, setWaypointNames] = useState([]);
  useEffect(() => {
    getAdminRecords("waypointNames", "").then((res) =>
      setWaypointNames(res ? res.data : [])
    );
  }, []);
  const currentOption =
    (waypointName && [{ label: waypointName, value: waypointName }]) ?? [];
  return [
    ...currentOption,
    { label: "Choose One", value: "" },
    ...waypointNames.map(waypointNameAsSelectEntry),
  ];
};

const WaypointName = ({ waypointName }) => {
  const waypointNames = useWaypointNames(waypointName);
  const fieldName = "Name";

  return (
    <Field
      component={SelectInput}
      type="select"
      name={fieldName}
      options={waypointNames}
    />
  );
};

WaypointName.propTypes = {
  waypointName: PropTypes.string.isRequired,
};

export default WaypointName;
