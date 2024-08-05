import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSectionHeadingWrapper = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 500;
  justify-content: flex-start;
  margin-bottom: 32px;
`;

const StyledDirectorName = styled.div`
  width: 356px;
`;
const SectionHeading = ({ title }) => (
  <StyledSectionHeadingWrapper>
    <StyledDirectorName>{title} name</StyledDirectorName>
    <div>Guarantor?</div>
  </StyledSectionHeadingWrapper>
);

export default SectionHeading;

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
};
