import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const StyledCell = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  min-height: 30px;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledCellHeader = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-right: 20px;
  width: 50%;
`;

export const StyledCellContent = styled.div`
  color: ${({ theme }) => theme.colors.grey};
  font-size: 16px;
  width: 50%;
`;

const Cell = ({ title, children, className }) => (
  <StyledCell className={className}>
    <StyledCellHeader>{title}</StyledCellHeader>
    <StyledCellContent>{children}</StyledCellContent>
  </StyledCell>
);

Cell.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Cell;
