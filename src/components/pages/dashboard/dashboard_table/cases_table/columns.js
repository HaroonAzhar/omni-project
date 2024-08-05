import { currencyFormat } from "utils";
import LOCALE from "core/locale";

import RefLink from "./ref_link";
import NameLink from "./name_link";
import CaseTagsCell from "./case_tags_cell";

function filterStatus(rows, id, filterValue) {
  return rows.filter((row) => {
    if (filterValue === "Active" || filterValue === "") {
      return row.values.status !== "Not proceeding";
    } else if (filterValue === "All") {
      return true;
    } else {
      return row.values.status === filterValue;
    }
  });
}
function filterPhase(rows, id, filterValue) {
  return rows.filter((row) => {
    if (filterValue === "Any Origination") {
      return row.values.case_stage !== "Completed";
    } else if (filterValue === "All" || filterValue === "") {
      return true;
    } else {
      return row.values.case_stage === filterValue;
    }
  });
}
function filterUser(rows, id, filterValue) {
  return rows.filter((row) => {
    if (filterValue === "All" || filterValue === "") {
      return true;
    } else {
      return row.values.assigned_user === filterValue;
    }
  });
}

export default [
  {
    Header: "Name",
    accessor: "name",
    sortType: (a, b) => {
      const nameA = a.values.name || "";
      const nameB = b.values.name || "";
      return nameA.localeCompare(nameB, LOCALE);
    },
    Cell: NameLink,
  },
  {
    Header: "Ref. number",
    accessor: "ref_number",
    Cell: RefLink,
  },
  {
    Header: "Case Tags",
    accessor: "CaseAssociatedTags",
    Cell: CaseTagsCell,
    disableSortBy: true,
  },
  {
    Header: "Date created",
    accessor: "date_created",
    Cell: ({ row }) =>
      new Date(row.values.date_created).toLocaleDateString(LOCALE),
  },
  {
    Header: "Status",
    accessor: "status",
    filter: filterStatus,
  },
  {
    Header: "Gross amount",
    accessor: "gross_amount",
    Cell: ({ row }) => currencyFormat(row.values.gross_amount),
  },
  {
    Header: "Type",
    accessor: "case_stage",
    filter: filterPhase,
  },
  {
    Header: "Assigned User",
    accessor: "assigned_user",
    filter: filterUser,
  },
  {
    accessor: "_searching",
  },
];
