import React, { useEffect } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";
import PropTypes from "prop-types";

import {
  StyledTable,
  StyledSortingArrow,
  StyledPaginationWrapper,
  StyledLeftButton,
  StyledRightButton,
  StyledTableFoot,
} from "./styled_table";

const defaultPropGetter = () => ({});

/* eslint-disable react/jsx-props-no-spreading */
function Table({
  columns,
  data,
  selectedIndex,
  shouldShowHeaders,
  sortable = false,
  filters = [],
  goPageBack,
  goToNextPage,
  currentPage,
  totalPages,
  kind = {},
  className,
  searchingString,
  hiddenColumns = [],
  sortBy = [],
  isFooterAllowed,
  getRowProps = defaultPropGetter,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { filters, hiddenColumns, sortBy },
      disableSortBy: !sortable,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  useEffect(() => {
    if (searchingString !== undefined)
      setGlobalFilter(searchingString || undefined);

    /* eslint-disable-next-line */
  }, [searchingString]);

  return (
    <>
      <StyledTable kind={kind} className={className}>
        <table {...getTableProps()}>
          {shouldShowHeaders && (
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(
                    ({
                      getHeaderProps,
                      getSortByToggleProps,
                      render,
                      isSorted,
                      isSortedDesc,
                      canSort,
                    }) => (
                      <th
                        {...getHeaderProps(canSort && getSortByToggleProps())}
                      >
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
          )}

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <>
                  <tr
                    {...row.getRowProps(getRowProps(row))}
                    className={row.index === selectedIndex ? "highlighted" : ""}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                </>
              );
            })}
          </tbody>

          {isFooterAllowed && (
            <StyledTableFoot>
              {footerGroups.map((group) => (
                <tr {...group.getFooterGroupProps()}>
                  {group.headers.map((column) => (
                    <td {...column.getFooterProps()}>
                      {column.render("Footer")}
                    </td>
                  ))}
                </tr>
              ))}
            </StyledTableFoot>
          )}
        </table>
      </StyledTable>

      {currentPage && !Number.isNaN(currentPage) && (
        <StyledPaginationWrapper>
          <StyledLeftButton
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) goPageBack();
            }}
            disabled={currentPage <= 1}
          />

          {`${currentPage}/${totalPages}`}

          <StyledRightButton
            onClick={(e) => {
              e.preventDefault();
              goToNextPage();
            }}
            disabled={currentPage >= totalPages}
          />
        </StyledPaginationWrapper>
      )}
    </>
  );
}

export default Table;

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  shouldShowHeaders: PropTypes.bool,
  sortable: PropTypes.bool,
  goPageBack: PropTypes.func,
  goToNextPage: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  kind: PropTypes.object,
  selectedIndex: PropTypes.number,
  className: PropTypes.string,
  searchingString: PropTypes.string,
  hiddenColumns: PropTypes.array,
  isFooterAllowed: PropTypes.bool,
  sortBy: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.bool,
    })
  ),
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  getRowProps: PropTypes.func,
  usesSubRows: PropTypes.bool,
};
