import React, { useCallback, useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";

import LtvRequestService from "module/ltv/requestService";
import { useProgress } from "components/progress";
import Pagination, { usePagination } from "components/pagination";
import LOCALE from "core/locale";

import useColumns from "./hooks/useColumns";
import { StyledTable, StyledTr } from "./ltv.atoms";

const History = () => {
  const columns = useColumns();
  const [page, pagination, setPagination] = usePagination();
  const [row, setRow] = useState();
  const [, setLoading] = useProgress();
  const { addToast } = useToasts();
  const { push } = useHistory();

  useEffect(() => {
    const asyncEffect = async () => {
      setLoading(true);

      try {
        const {
          data,
          pagination: paginationFromResponse,
        } = await LtvRequestService.getHistoricals(page);

        if (data && data.length) {
          const firstRow = data[0];

          setRow(firstRow);
          setPagination(paginationFromResponse);
        } else {
          setRow();
          setPagination();
        }
      } catch (err) {
        addToast("We cannot fetch historical data", { appearance: "error" });
      }

      setLoading(false);
    };

    asyncEffect();
  }, [addToast, page, setLoading, setPagination]);

  const handlePageClick = useCallback(
    (newPage) => {
      push(`/ltv/history?page=${newPage}`);
    },
    [push]
  );

  if (!(columns.length && row)) {
    return null;
  }

  const startDate = new Date(row.CreatedAt).toLocaleDateString(LOCALE);
  const endDate = row.ExpiredAt
    ? new Date(row.ExpiredAt).toLocaleDateString(LOCALE)
    : undefined;

  return (
    <>
      <StyledTable>
        <thead>
          <StyledTr>
            <th>Type of change</th>
            <th>Loan type</th>
            <th>Charge</th>
            <th>Borrower</th>
            <th>Value</th>
            <th>Start date</th>
            <th>End date</th>
          </StyledTr>
        </thead>
        <tbody>
          {columns.map(([key, fields]) => {
            return (
              <StyledTr key={key}>
                {fields.map((field, index) => (
                  <td key={`${key}-${index}`}>{field}</td>
                ))}
                <td>{row[key]}%</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
              </StyledTr>
            );
          })}
        </tbody>
      </StyledTable>
      <Pagination data={pagination} handlePageClick={handlePageClick} />
    </>
  );
};

export default History;
