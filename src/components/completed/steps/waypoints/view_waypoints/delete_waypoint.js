import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { DeleteIcon } from "components/icons";
import { DeletingModal } from "components/organisms";
import { useRequestWithProgressToastRollbar } from "utils";
import { deleteWaypoint } from "utils/requests";

import useWaypointsData from "./use_waypoints_data";

const DeleteWaypoint = ({ waypoint }) => {
  const { id } = useParams();
  const { fetchWaypointsAndStore } = useWaypointsData(false);
  const [shouldShowDeletingModal, setShouldShowDeletingModal] = useState();

  const onDelete = () => setShouldShowDeletingModal(true);
  const deleteRequest = useRequestWithProgressToastRollbar(deleteWaypoint);

  const sendDeletingRequest = () => {
    deleteRequest(id, waypoint.WaypointId).then(() => {
      fetchWaypointsAndStore();
      setShouldShowDeletingModal(false);
    });
  };

  return (
    <>
      <DeletingModal
        content={`Do you want to delete waypoint: "${waypoint.Name}"?`}
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

DeleteWaypoint.propTypes = {
  waypoint: PropTypes.object.isRequired,
};

export default DeleteWaypoint;
