import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { DeleteIcon } from "components/icons";
import { DeletingModal } from "components/organisms";
import { useRequestWithProgressToastRollbar } from "utils";
import { deleteNote } from "utils/requests";

import useNotesData from "./use_notes_data";

const DeleteNote = ({ note }) => {
  const { id } = useParams();
  const { fetchNotesAndStore } = useNotesData();
  const [shouldShowDeletingModal, setShouldShowDeletingModal] = useState();

  const onDelete = () => setShouldShowDeletingModal(true);
  const deleteRequest = useRequestWithProgressToastRollbar(deleteNote);

  const sendDeletingRequest = () => {
    deleteRequest(id, note.NoteId).then(() => {
      fetchNotesAndStore();
      setShouldShowDeletingModal(false);
    });
  };

  return (
    <>
      <DeletingModal
        content="Do you want to delete this note?"
        isModalShowed={shouldShowDeletingModal}
        hideModal={() => setShouldShowDeletingModal()}
        isError={false}
        sendDeletingRequest={sendDeletingRequest}
      />
      <button type="button" onClick={onDelete}>
        <DeleteIcon />
      </button>
    </>
  );
};

DeleteNote.propTypes = {
  note: PropTypes.object.isRequired,
};

export default DeleteNote;
