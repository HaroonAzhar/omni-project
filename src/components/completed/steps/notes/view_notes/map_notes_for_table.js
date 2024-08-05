import React from "react";

import DeleteNote from "./delete_note";
import EditNote from "./update_note";

const mapSingleNote = (note) => ({
  ...note,
  edit: <EditNote note={note} />,
  delete: <DeleteNote note={note} />,
});

const mapNotesForTable = (notesData) => {
  return notesData.map(mapSingleNote);
};

export default mapNotesForTable;
