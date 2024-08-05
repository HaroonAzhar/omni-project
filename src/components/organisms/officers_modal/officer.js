import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import OfficerNumber from "./officer_number";
import OfficerData from "./officer_data";

const StyledOfficer = styled.div`
  overflow: hidden;
`;

const Officer = ({ officer, number }) => (
  <StyledOfficer>
    <OfficerNumber number={number} />
    <OfficerData officer={officer} />
  </StyledOfficer>
);

export default Officer;

Officer.propTypes = {
  officer: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
};
