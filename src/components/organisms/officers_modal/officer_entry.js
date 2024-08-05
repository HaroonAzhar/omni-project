import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const StyledLabel = styled.div`
  float: left;
  width: 120px;
`;

const StyledContent = styled.div`
  float: left;
`;

const StyledEntry = styled.div`
  overflow: hidden;
`;

const OfficerEntry = ({ label, content }) => (
  <StyledEntry>
    <StyledLabel>{label}</StyledLabel>
    <StyledContent>{content}</StyledContent>
  </StyledEntry>
);

OfficerEntry.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default OfficerEntry;
