import React, { useState } from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";
import { useParams } from "react-router-dom";

import { Button, H2, Modal, TextAreaInput } from "components/atoms";
import { updateWaypoint } from "utils/requests";
import { useRequestWithProgressToastRollbar } from "utils";

import { ButtonsContainer } from "../../shared_styles/styled_filter";
import { EditWaypointContainer } from "./update_waypoint/styled_update_waypoint";
import useWaypointsData from "./use_waypoints_data";

const ToggleCompletedModal = ({ waypoint, onClose }) => {
  const message = `Mark waypoint as ${
    waypoint.IsCompleted ? "incomplete" : "completed"
  }`;

  const { id } = useParams();
  const { fetchWaypointsAndStore } = useWaypointsData(false);

  const updateRequest = useRequestWithProgressToastRollbar(updateWaypoint);

  const sendEditingRequest = (values) => {
    const toSend = {
      Notes: values.Notes,
      IsCompleted: !values.IsCompleted,
    };
    updateRequest(id, waypoint.WaypointId, toSend).then((res) => {
      if (res) {
        fetchWaypointsAndStore();
        onClose();
      }
    });
  };
  return (
    <EditWaypointContainer>
      <H2> {message}</H2>
      <Form
        onSubmit={sendEditingRequest}
        initialValues={waypoint}
        render={({ handleSubmit, submitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field name="Notes" label="Notes" component={TextAreaInput} />
              <ButtonsContainer>
                <Button type="button" onClick={onClose} kind="secondary">
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {message}
                </Button>
              </ButtonsContainer>
            </form>
          );
        }}
      />
    </EditWaypointContainer>
  );
};

ToggleCompletedModal.propTypes = {
  waypoint: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

const IsCompletedWaypoint = ({ waypoint }) => {
  const [
    shouldShowToggleCompletedModal,
    setShouldShowToggleCompletedModal,
  ] = useState(false);

  const toggleCompleted = () => setShouldShowToggleCompletedModal(true);
  const closeToggleModal = () => setShouldShowToggleCompletedModal(false);
  return (
    <>
      <Modal isOpen={shouldShowToggleCompletedModal} onClose={closeToggleModal}>
        <ToggleCompletedModal waypoint={waypoint} onClose={closeToggleModal} />
      </Modal>
      <input
        type="checkbox"
        checked={waypoint.IsCompleted}
        onClick={toggleCompleted}
      />
    </>
  );
};

IsCompletedWaypoint.propTypes = {
  waypoint: PropTypes.object.isRequired,
};

export default IsCompletedWaypoint;
