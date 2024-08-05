import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { DeleteIcon } from "components/icons";
import { DeletingModal } from "components/organisms";
import { dateFormat, useRequestWithProgressToastRollbar } from "utils";
import { deleteDefaultEvent } from "utils/requests";

import useDefaultEventsData from "./use_default_events_data";

const DeleteDefaultEvent = ({ defaultEvent }) => {
  const { id } = useParams();
  const { fetchDefaultEventsAndStore } = useDefaultEventsData(false);
  const [shouldShowDeletingModal, setShouldShowDeletingModal] = useState();

  const onDelete = () => setShouldShowDeletingModal(true);
  const deleteRequest = useRequestWithProgressToastRollbar(deleteDefaultEvent);

  const sendDeletingRequest = () => {
    deleteRequest(id, defaultEvent.DefaultEventId).then(() => {
      fetchDefaultEventsAndStore();
      setShouldShowDeletingModal(false);
    });
  };

  return (
    <>
      <DeletingModal
        content={`Do you want to delete default ${
          defaultEvent.Type
        } from ${dateFormat(defaultEvent.Date)}?`}
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

DeleteDefaultEvent.propTypes = {
  defaultEvent: PropTypes.object.isRequired,
};

export default DeleteDefaultEvent;
