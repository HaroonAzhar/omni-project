import React from "react";

import columns from "./columns";
import useDefaultEventsData from "./use_default_events_data";
import { StyledTable } from "../../shared_styles/styled_view";
import mapDefaultEventsForTable from "./map_default_events_for_table";

const ViewDefaultEvents = () => {
  const { defaultEvents } = useDefaultEventsData(true);
  const defaultEventsData = mapDefaultEventsForTable(defaultEvents);
  return (
    <StyledTable
      className="view-defaultEvents-table"
      columns={columns}
      data={defaultEventsData}
      shouldShowHeaders={true}
      sortable={true}
    />
  );
};

export default ViewDefaultEvents;
