import React from "react";

import columns from "./columns";
import useNotesData from "./use_notes_data";
import { StyledTable } from "../../shared_styles/styled_view";
import mapNotesForTable from "./map_notes_for_table";

const ViewNotes = () => {
  const { notes } = useNotesData();
  const notesData = mapNotesForTable(notes);
  return (
    <StyledTable
      className="view-notes-table"
      columns={columns}
      data={notesData}
      shouldShowHeaders={true}
      sortable={true}
    />
  );
};

export default ViewNotes;
