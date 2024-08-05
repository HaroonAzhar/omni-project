import React from "react";

import columns from "./columns";
import useExtensionsData from "./use_extensions_data";
import { StyledTable } from "../../shared_styles/styled_view";
import mapExtensionsForTable from "./map_extensions_for_table";

const ViewExtensions = () => {
  const { extensions } = useExtensionsData(true);
  const extensionsData = mapExtensionsForTable(extensions);
  return (
    <StyledTable
      className="view-extensions-table"
      columns={columns}
      data={extensionsData}
      shouldShowHeaders={true}
      sortable={true}
    />
  );
};

export default ViewExtensions;
