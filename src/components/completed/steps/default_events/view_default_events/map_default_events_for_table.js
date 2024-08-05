import React from "react";

import DeleteDefaultEvent from "./delete_default_event";

const mapSingleDefaultEvent = (defaultEvent) => ({
  ...defaultEvent,
  delete: <DeleteDefaultEvent defaultEvent={defaultEvent} />,
});

const mapDefaultEventsForTable = (defaultEventsData) => {
  return defaultEventsData.map(mapSingleDefaultEvent);
};

export default mapDefaultEventsForTable;
