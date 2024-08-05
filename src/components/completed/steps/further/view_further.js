import React from "react";
import PropTypes from "prop-types";

import { currencyFormat, dateFormat, percentFormat } from "utils";

import UnderwriterFlow from "./underwriter_flow";
import { ViewFurtherTable } from "./styled_further";
import OriginationChecklist from "./origination_checklist";
import ReadOnlyView from "./read_only_view";
import { useRequests } from "./view_further_context";

const columns = [
  {
    Header: "",
    accessor: "description",
  },
  {
    Header: "Date",
    accessor: "RequestedDate",
    Cell: ({ row }) => dateFormat(row.values.RequestedDate),
    sortType: "basic",
  },
  {
    Header: "Requested Amount",
    accessor: "RequestedAmount",
    Cell: ({ row }) => currencyFormat(row.values.RequestedAmount),
    sortType: "basic",
  },
  {
    Header: "Remaining Funds",
    accessor: "remainingFunds",
    Cell: ({ row }) => currencyFormat(row.values.remainingFunds),
    sortType: "basic",
  },
  {
    Header: "Cumulative Balance",
    accessor: "CumulativeBalance",
    Cell: ({ row }) => currencyFormat(row.values.CumulativeBalance),
    sortType: "basic",
  },
  {
    Header: "Total Valuations",
    accessor: "TotalValuations",
    Cell: ({ row }) => currencyFormat(row.values.TotalValuations),
    sortType: "basic",
  },
  {
    Header: "Total GDV",
    accessor: "TotalGDV",
    Cell: ({ row }) => currencyFormat(row.values.TotalGDV),
    sortType: "basic",
  },
  {
    Header: "LTV (%)",
    accessor: "LTV",
    Cell: ({ row }) => percentFormat(row.values.LTV),
    sortType: "basic",
  },
  {
    Header: "LTGDV (%)",
    accessor: "LTGDV",
    Cell: ({ row }) => percentFormat(row.values.LTGDV),
    sortType: "basic",
  },
  {
    Header: "Notes",
    accessor: "Notes",
  },

  {
    Header: "",
    accessor: "originationChecklist",
  },

  {
    Header: "",
    accessor: "underwriterFlow",
  },

  {
    Header: "",
    accessor: "readOnlyView",
  },
];

const mapFurther = ({
  shouldOriginationBeVisible,
  shouldUnderwriterBeVisible,
  shouldReadOnlyBeVisible,
}) => (further) => ({
  ...further,
  underwriterFlow: shouldUnderwriterBeVisible(further) && (
    <UnderwriterFlow further={further} />
  ),
  originationChecklist: shouldOriginationBeVisible(further) && (
    <OriginationChecklist further={further} />
  ),
  readOnlyView: shouldReadOnlyBeVisible(further) && (
    <ReadOnlyView further={further} />
  ),
});

function ViewFurther({ further = [] }) {
  const {
    shouldOriginationBeVisible,
    shouldUnderwriterBeVisible,
    shouldReadOnlyBeVisible,
  } = useRequests();
  const data = further.map(
    mapFurther({
      shouldOriginationBeVisible,
      shouldUnderwriterBeVisible,
      shouldReadOnlyBeVisible,
    })
  );
  return (
    <ViewFurtherTable shouldShowHeaders={true} columns={columns} data={data} />
  );
}

ViewFurther.propTypes = {
  further: PropTypes.array,
};

export default ViewFurther;
