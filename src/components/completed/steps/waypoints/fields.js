import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { TextAreaInput, TextInput, SelectInput } from "components/atoms";

import getWaypointsCategories from "./get_waypoint_categories";
import WaypointName from "./waypoint_name";

export const BaseFields = ({ values, initialValues }) => (
  <>
    <WaypointName waypointName={initialValues.Name} />
    {values?.Name === "Other" && (
      <Field
        component={TextAreaInput}
        name="OtherWaypointDescription"
        label="Other Waypoint Description"
        type="text"
      />
    )}
    <Field component={TextInput} name="DueDate" label="Due Date" type="date" />
    <Field component={TextInput} name="DueTime" label="Due Time" type="time" />
    <Field component={TextAreaInput} name="Notes" label="Notes" type="text" />
  </>
);

BaseFields.propTypes = {
  values: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export const WaypointCategory = () => (
  <Field
    component={SelectInput}
    name="Category"
    label="Category"
    type="text"
    options={getWaypointsCategories()}
  />
);
