import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form } from "react-final-form";
import moment from "moment";

import { EditIcon } from "components/icons";
import { useRequestWithProgressToastRollbar, formValidation } from "utils";
import { updateWaypoint } from "utils/requests";
import { Modal, Button, H2 } from "components/atoms";
import { Question } from "components/molecules";

import useWaypointsData from "../use_waypoints_data";
import validationSchema from "../../validation_schema";
import {
  EditWaypointContainer,
  SaveButtonContainer,
} from "./styled_update_waypoint";
import { BaseFields, WaypointCategory } from "../../fields";

const EditWaypoint = ({ waypoint }) => {
  const { id } = useParams();
  const { fetchWaypointsAndStore } = useWaypointsData(false);
  const [shouldShowEditingModal, setShouldShowEditingModal] = useState(false);

  const onEdit = () => setShouldShowEditingModal(true);
  const onClose = () => setShouldShowEditingModal(false);
  const updateRequest = useRequestWithProgressToastRollbar(updateWaypoint);

  const sendEditingRequest = (values) => {
    updateRequest(id, waypoint.WaypointId, values).then((res) => {
      if (res) {
        fetchWaypointsAndStore();
        setShouldShowEditingModal(false);
      }
    });
  };

  const validate = async (values) => formValidation(validationSchema, values);

  const initialValues = {
    ...waypoint,
    DueDate: moment(waypoint.DueDate).format("YYYY-MM-DD"),
    DueTime: waypoint.DueTime && moment(waypoint.DueTime).format("HH:mm"),
  };
  return (
    <>
      <Modal isOpen={shouldShowEditingModal} onClose={onClose}>
        <EditWaypointContainer>
          <H2>Edit waypoint</H2>
          <Form
            onSubmit={sendEditingRequest}
            validate={validate}
            initialValues={initialValues}
            render={({ handleSubmit, submitting, values }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <BaseFields values={values} initialValues={initialValues} />
                  <Question label="Is completed?" name="IsCompleted" />
                  <WaypointCategory />
                  <SaveButtonContainer>
                    <Button type="button" onClick={onClose} kind="secondary">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      Save
                    </Button>
                  </SaveButtonContainer>
                </form>
              );
            }}
          />
        </EditWaypointContainer>
      </Modal>
      <button type="button" onClick={onEdit}>
        <EditIcon />
      </button>
    </>
  );
};

EditWaypoint.propTypes = {
  waypoint: PropTypes.object.isRequired,
};

export default EditWaypoint;
