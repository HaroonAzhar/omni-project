/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useTable, useSortBy } from "react-table";
import PropTypes from "prop-types";

import { StyledSortingArrow } from "components/molecules/table/styled_table";

import { StyledTable } from "./styled_adjustments_table";
const AdjustmentTable = ({ columns, adjustments, sortBy = [] }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows: AdjustmentsRows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: adjustments,
      initialState: { sortBy },
    },
    useSortBy
  );
  const renderRevisions = (revisions) => {
    return revisions.map((revision) => {
      return <p>{revision}</p>;
    });
  };

  return (
    <>
      <StyledTable>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(
                  ({
                    getHeaderProps,
                    render,
                    getSortByToggleProps,
                    isSorted,
                    isSortedDesc,
                    canSort,
                  }) => (
                    <th {...getHeaderProps(canSort && getSortByToggleProps())}>
                      {render("Header")}
                      {canSort && (
                        <StyledSortingArrow
                          isActive={isSorted}
                          isAscending={isSortedDesc}
                        />
                      )}
                    </th>
                  )
                )}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {AdjustmentsRows.map((row) => {
              prepareRow(row);
              return (
                <React.Fragment {...row.getRowProps()}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>

                  {row.original.subRowsData.internalNote && (
                    <tr>
                      <td
                        className="internal-notes-sub-row"
                        colSpan={row.cells.length}
                      >
                        <p>{row.original.subRowsData.internalNote} </p>
                      </td>
                    </tr>
                  )}

                  {row.original.subRowsData.revisions && (
                    <tr>
                      <td
                        className="revisions-sub-row"
                        colSpan={row.cells.length}
                      >
                        <p> Revisions</p>
                        {renderRevisions(row.original.subRowsData.revisions)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </StyledTable>
    </>
  );
};

AdjustmentTable.propTypes = {
  sortBy: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.bool,
    })
  ),
  sortable: PropTypes.bool,
  columns: PropTypes.array,
  adjustments: PropTypes.array,
};

export default AdjustmentTable;
