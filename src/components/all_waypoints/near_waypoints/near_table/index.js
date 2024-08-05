import React from "react";
import { useTable } from "react-table";
import PropTypes from "prop-types";

import { StyledTable } from "components/molecules/table/styled_table";
import theme from "core/theme";

import columns from "../columns";
import NearSection from "./near_section";

/* eslint-disable react/jsx-props-no-spreading */

const NearTable = ({ waypoints7days, waypointsOverdue, waypointsToday }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows: rowsToday,
    prepareRow,
  } = useTable({
    columns,
    data: waypointsToday,
  });

  const { rows: rowsOverdue } = useTable({
    columns,
    data: waypointsOverdue,
  });

  const { rows: rows7Days } = useTable({
    columns,
    data: waypoints7days,
  });

  return (
    <>
      <StyledTable kind={{}} className="waypoint_table">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(({ getHeaderProps, render }) => (
                  <th {...getHeaderProps()}>{render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            <NearSection
              title="Overdue"
              color={theme.colors.red}
              rows={rowsOverdue}
              prepareRow={prepareRow}
              noColumns={columns.length}
            />
            <NearSection
              title="Due Today"
              color={theme.colors.darkOrange}
              rows={rowsToday}
              prepareRow={prepareRow}
              noColumns={columns.length}
            />
            <NearSection
              title="Due Within 7 Days"
              color={theme.colors.darkYellow}
              rows={rows7Days}
              prepareRow={prepareRow}
              noColumns={columns.length}
            />
          </tbody>
        </table>
      </StyledTable>
    </>
  );
};

NearTable.propTypes = {
  waypointsOverdue: PropTypes.array.isRequired,
  waypointsToday: PropTypes.array.isRequired,
  waypoints7days: PropTypes.array.isRequired,
};

export default NearTable;
