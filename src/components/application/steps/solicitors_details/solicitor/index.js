import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getAdminRecords } from "utils/requests/api";

import SolicitorNameInput from "./solicitor_name_input";

const solicitorAsSelectEntry = (solicitor) => ({
  value: solicitor.Id,
  label: solicitor.Name,
});

const useSolicitors = (solicitor) => {
  const [solicitors, setSolicitors] = useState([]);

  useEffect(() => {
    getAdminRecords("solicitors", solicitor).then((res) =>
      setSolicitors(res ? res.data : [])
    );
  }, [solicitor]);

  return [
    { label: "Choose One", value: "" },
    ...solicitors.map(solicitorAsSelectEntry),
  ];
};

const Solicitor = ({ solicitor }) => {
  const solicitors = useSolicitors(solicitor);

  return <SolicitorNameInput solicitors={solicitors} />;
};

Solicitor.propTypes = {
  solicitor: PropTypes.string,
};

export default Solicitor;
