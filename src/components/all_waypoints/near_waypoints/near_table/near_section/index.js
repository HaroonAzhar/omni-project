import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { H2 } from "components/atoms";

import { SectionHeader, StyledSectionHeaderCell } from "./styled_near_section";

const H2Waypoints = styled(H2)`
  margin-bottom: 0px;
`;

/* eslint-disable react/jsx-props-no-spreading */

const NearSection = ({ rows, prepareRow, title, color, noColumns }) => {
  return (
    <>
      <SectionHeader color={color}>
        <StyledSectionHeaderCell
          colSpan={noColumns}
          className="section-header-cell"
        >
          <H2Waypoints>{title}</H2Waypoints>
        </StyledSectionHeaderCell>
      </SectionHeader>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
            })}
          </tr>
        );
      })}
    </>
  );
};

NearSection.propTypes = {
  rows: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  prepareRow: PropTypes.func.isRequired,
  noColumns: PropTypes.number.isRequired,
};

export default NearSection;
