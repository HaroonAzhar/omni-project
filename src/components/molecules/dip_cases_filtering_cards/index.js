import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { shadow, mainBlue, lightGrey } from "styles/colors";

const StyledCardsContainer = styled.div`
  align-items: stretch;
  border-radius: 8px;
  box-shadow: 0px 1px 4px ${shadow};
  display: flex;
  height: 58px;
  justify-content: space-between;
  padding: 0 8px 0 8px;
  ${({ isColumn }) =>
    isColumn && "flex-direction: column; width: 200px; height: auto;"}
`;

const StyledCard = styled.button`
  align-items: center;
  background-color: white;
  border: 0;

  border-bottom: 4px solid transparent;
  color: ${lightGrey};
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  padding: 0 30px 0 30px;

  ${({ isColumn }) => isColumn && "padding: 25px 0 25px 25px;"}

  ${({ isChecked }) =>
    isChecked &&
    `
    border-bottom: 4px solid ${mainBlue}
    color: black;
  `}

  :hover, :focus {
    color: black;
  }
`;

const DipCasesFilteringCards = ({
  tabNames,
  selectedTabName,
  setSelectedTabName,
  isColumn,
}) => (
  <StyledCardsContainer isColumn={isColumn}>
    {tabNames.map((name) => (
      <StyledCard
        key={name}
        isChecked={selectedTabName === name}
        onClick={() => setSelectedTabName(name)}
        isColumn={isColumn}
      >
        {name || "All"}
      </StyledCard>
    ))}
  </StyledCardsContainer>
);

export default DipCasesFilteringCards;

DipCasesFilteringCards.propTypes = {
  tabNames: PropTypes.array.isRequired,
  setSelectedTabName: PropTypes.func.isRequired,
  selectedTabName: PropTypes.string,
  isColumn: PropTypes.bool,
};
