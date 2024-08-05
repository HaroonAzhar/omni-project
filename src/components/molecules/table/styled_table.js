import styled from "styled-components";
import { css } from "styled-components/macro";

import { shadow, darkGrey, lightBackgroundBlue } from "styles/colors";

const drawdownTableTdStyles = css`
  border-right: 1px solid ${shadow};
  padding: 5px 0 5px 0;
  position: relative;
  text-align: center;

  &: last-child {
    border-right: none;
  }

  & label {
    left: 4px;
    padding: 0;
    position: absolute;
    top: 4px;
  }
`;

export const StyledTable = styled.div`
  &.waypoint_table {
    td {
      &:first-child {
        width: 18%;
      }
      &:nth-child(2) {
        width: 22%;
      }
      &:nth-child(3) {
        width: 10%;
      }
    }
  }
  table {
    line-height: 16px;
    margin-top: 10px;
    width: 100%;
    ${({ kind }) =>
      kind.marginTop && kind.marginTop === "small" && "margin-top: 40px;"}

    tr {
      border-bottom: 1px solid ${shadow};
    }

    th {
      padding: 10px 25px 10px 0px;
      text-align: left;

      ${({ kind }) =>
        kind.type === "drawdown_split"
          ? `
        text-align: center;
        padding: 5px 0 5px 0;
      `
          : ""}
    }

    tbody {
      color: ${darkGrey};
    }

    tbody tr:last-child {
      border-bottom: none;
    }

    th,
    td:first-child {
      font-weight: 500;
    }

    td {
      padding: 10px 4px 10px 0px;
      text-align: left;
      ${({ kind }) =>
        kind.paddings && kind.paddings === "small" && "padding: 10px 0 10px 0"}
      ${({ kind }) =>
        kind.type === "drawdown_split"
          ? drawdownTableTdStyles
          : ""}

        &:first-child {
        width: 40%;
      }
    }

    .highlighted {
      background: ${lightBackgroundBlue};

      :last-child {
        td:first-child {
          border-bottom-left-radius: 8px;
        }
        td:last-child {
          border-bottom-right-radius: 8px;
        }
      }
      :first-child {
        td:first-child {
          border-top-left-radius: 8px;
        }
        td:last-child {
          border-top-right-radius: 8px;
        }
      }
    }
  }
`;

const arrow = css`
  :before,
  :after {
    border-bottom: 2px solid ${darkGrey};
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
    content: "";
    height: 0;
    ${({ isActive }) => !isActive && `border-bottom: 2px solid ${shadow};`}
    position: absolute;
    width: 10px;
  }
  :before {
    transform: rotate(45deg);
    ${({ isAscending }) => isAscending && "transform: rotate(-45deg);"}
  }
  :after {
    left: 6px;
    transform: rotate(-225deg);
    ${({ isAscending }) => isAscending && "transform: rotate(225deg);"}
  }
`;

export const StyledSortingArrow = styled.span`
  cursor: pointer;
  left: 0.5em;
  position: relative;
  top: 0.55em;

  ${arrow}
`;

export const StyledPaginationWrapper = styled.div`
  color: ${darkGrey};
  display: flex;
  font-size: 16px;
  justify-content: center;
  margin-bottom: 16px;
  width: 100%;
`;

const basicNavigationButton = css`
  background: transparent;
  border: none;

  cursor: pointer;
  position: relative;

  ${arrow}

  :before, :after {
    border-bottom: 2px solid black;
  }
  :hover:before,
  :hover:after {
    border-bottom: 2px solid ${shadow};
  }
  :before {
    left: 0;
  }
`;

export const StyledLeftButton = styled.button`
  ${basicNavigationButton}
  margin-right: 7px;
  transform: rotate(90deg);
`;

export const StyledRightButton = styled.button`
  ${basicNavigationButton}
  margin-left: 7px;
  top: 2px;
  transform: rotate(-90deg);
`;

export const StyledTableFoot = styled.tfoot`
  border-top: 1px solid ${shadow};
  font-size: 1.1em;
  font-weight: bold;
`;
