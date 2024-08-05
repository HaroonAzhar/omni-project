import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Modal } from "components/atoms";
import { getCompanyOfficers } from "utils/requests";

import {
  StyledTabList,
  StyledTabs,
  StyledTab,
  StyledTabPanel,
} from "./styled_tabs";
import Officer from "./officer";
import CompanyName from "./company_name";

const OfficersList = ({ officers }) => {
  let renderOfficers = officers.map((officer, index) => (
    <Officer key={officer.name} officer={officer} number={index + 1} />
  ));

  if (renderOfficers.length > 1) {
    renderOfficers = renderOfficers.reduce((prev, curr, index) => [
      prev,
      <hr key={`hr_${index}`} />,
      curr,
    ]);
  }

  return renderOfficers;
};

const OfficersModal = ({ companyNumber, companyName, isOpen, close }) => {
  const [officers, setOfficers] = useState([]);

  useEffect(() => setOfficers([]), [companyNumber]);

  useEffect(() => {
    if (!isOpen) return;

    getCompanyOfficers(companyNumber).then(({ items }) => setOfficers(items));

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [companyNumber]);

  const activeOfficers = officers.filter((officer) => !officer.resigned_on);
  const resignedOfficers = officers.filter((officer) => officer.resigned_on);

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      onClose={close}
      onRequestClose={close}
    >
      <div style={{ minWidth: "700px", minHeight: "400px" }}>
        <CompanyName companyName={companyName} />
        <StyledTabs selectedTabClassName="is-selected">
          <StyledTabList>
            <StyledTab>Active</StyledTab>
            <StyledTab>Resigned</StyledTab>
          </StyledTabList>

          <StyledTabPanel>
            <OfficersList officers={activeOfficers} />
          </StyledTabPanel>
          <StyledTabPanel>
            <OfficersList officers={resignedOfficers} />
          </StyledTabPanel>
        </StyledTabs>
      </div>
    </Modal>
  );
};

export default OfficersModal;

OfficersModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  companyNumber: PropTypes.string,
  companyName: PropTypes.string,
};
