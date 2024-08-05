import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { rollbar } from "utils";
import { Table } from "components/molecules";
import { getCases } from "utils/requests";

import useTransformDataForTable from "../hooks/use_transform_data_for_table";
import columns from "./columns";

const CasesTable = ({
  selectedStage,
  selectedStatus,
  selectedUser,
  searchingString,
  page = "home",
}) => {
  const columnsMemoized = useMemo(() => columns, []);
  const [casesData, setCasesData] = useState([]);

  const transformDataForTable = useTransformDataForTable();

  const tranformCasesData = (cases) => {
    // eslint-disable-next-line array-callback-return

    return cases.reduce(function (filtered, currentCase) {
      currentCase.CaseNr = currentCase.CaseNr ?? "N/A";
      if (currentCase.Stage) {
        filtered.push(currentCase);
      }
      return filtered;
    }, []);
  };

  const dataForTable = casesData
    .map((item) => transformDataForTable(item))
    .reverse();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCasesRequest = () => {
    getCases().then(({ data }) => {
      if (!data) {
        rollbar.warning("GET /cases response doesn't contain data prop!");
        return;
      }

      setCasesData(tranformCasesData(data));
    });
  };

  useEffect(() => {
    getCasesRequest();
  }, [getCasesRequest]);

  let hiddenColsArray;

  if (page === "home") {
    hiddenColsArray = ["_searching"];
  } else {
    hiddenColsArray = ["_searching", "status", "case_stage"];
  }

  return (
    <>
      <Table
        columns={columnsMemoized}
        data={dataForTable}
        shouldShowHeaders={true}
        sortable={true}
        filters={[
          {
            id: "case_stage",
            value: selectedStage,
          },
          {
            id: "status",
            value: selectedStatus,
          },
          {
            id: "assigned_user",
            value: selectedUser,
          },
        ]}
        searchingString={searchingString}
        hiddenColumns={hiddenColsArray}
      />
    </>
  );
};

CasesTable.propTypes = {
  selectedStage: PropTypes.string.isRequired,
  selectedStatus: PropTypes.string.isRequired,
  selectedUser: PropTypes.string,
  searchingString: PropTypes.string,
  page: PropTypes.string,
};

export default CasesTable;
