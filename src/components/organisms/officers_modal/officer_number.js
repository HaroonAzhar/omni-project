import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const StyledOfficerNumber = styled.div`
  float: left;
  width: 60px;
`;

const OfficerNumber = ({ number }) => (
  <StyledOfficerNumber>{`${number}.`}</StyledOfficerNumber>
);

OfficerNumber.propTypes = {
  number: PropTypes.number.isRequired,
};

export default OfficerNumber;
