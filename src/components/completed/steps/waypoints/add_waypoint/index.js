import React, { useRef } from "react";
import { Form, Field } from "react-final-form";

import { Button, H2, SelectInput, IntegerField } from "components/atoms";
import { formValidation } from "utils";

import { AddContainer } from "../../shared_styles/styled_add";
import useSaveWaypoint from "./use_save_waypoint";
import validationSchema from "./validation_schema";
import getRecurringEventOptions from "./get_recurring_event_options";
import useWaypointsData from "../view_waypoints/use_waypoints_data";
import { BaseFields, WaypointCategory } from "../fields";

const AddWaypoint = () => {
  const { fetchWaypointsAndStore } = useWaypointsData(false);

  const saveNewWaypoint = useSaveWaypoint();

  const formRef = useRef();

  const submit = (values) => {
    saveNewWaypoint(values).then((res) => {
      if (res) {
        fetchWaypointsAndStore();
        formRef.current.reset();
      }
    });
  };

  const validate = async (values) => formValidation(validationSchema, values);
  return (
    <AddContainer>
      <H2>Add Waypoint</H2>
      <Form
        onSubmit={submit}
        validate={validate}
        initialValues={{ RecurringEvent: "not_recurring", IsCompleted: false }}
        render={({ handleSubmit, submitting, values, initialValues, form }) => {
          formRef.current = form;
          return (
            <form onSubmit={handleSubmit}>
              <BaseFields values={values} initialValues={initialValues} />
              <Field
                component={SelectInput}
                name="RecurringEvent"
                label="Recurring Event"
                type="text"
                options={getRecurringEventOptions()}
              />
              {values.RecurringEvent !== "not_recurring" && (
                <IntegerField
                  name="NumberOfTimesToRepeat"
                  label="Number of times to repeat"
                />
              )}
              <WaypointCategory />
              <Button type="submit" disabled={submitting}>
                Add
              </Button>
            </form>
          );
        }}
      />
    </AddContainer>
  );
};

export default AddWaypoint;
