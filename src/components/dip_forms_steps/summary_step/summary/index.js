import React from "react";
import PropTypes from "prop-types";

import { StyledColumnContainer } from "../styles";
import useSummaryData from "./use_summary_data";
import getColumnCells from "./get_column_cells";
import { Table } from "./styled_summary_table";

export const SummaryUI = ({ summaryData }) => {
  const [left, right] = getColumnCells(summaryData);

  return (
    <StyledColumnContainer>
      <Table>
        <tbody>{left}</tbody>
      </Table>
      <Table>
        <tbody>{right}</tbody>
      </Table>
    </StyledColumnContainer>
  );
};

SummaryUI.propTypes = {
  summaryData: PropTypes.object.isRequired,
};

const Summary = ({ storeName }) => {
  const summaryData = useSummaryData(storeName);
  return <SummaryUI summaryData={summaryData} />;
};

export default Summary;

Summary.propTypes = {
  storeName: PropTypes.string,
};
