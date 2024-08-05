import React, { useMemo, useRef } from "react";
import { Form, Field } from "react-final-form";
import moment from "moment";

import { Button, H2, SelectInput, TextInput } from "components/atoms";
import { formValidation, validationMsg } from "utils";

import { AddContainer } from "../../shared_styles/styled_add";
import useSaveDefaultEvent from "./use_save_default_event";
import validationSchema from "./validation_schema";
import useDefaultEventsData from "../view_default_events/use_default_events_data";
import getDefaultEventTypeOptions from "../get_default_event_type_options";

const defaultEventTypeOptions = getDefaultEventTypeOptions();

const AddDefaultEvent = () => {
  const { fetchDefaultEventsAndStore, defaultEvents } = useDefaultEventsData();

  const existingDates = useMemo(
    () =>
      defaultEvents.map((defaultEvent) =>
        moment(defaultEvent.Date).format("YYYY-MM-DD")
      ),
    [defaultEvents]
  );
  const saveNewDefaultEvent = useSaveDefaultEvent();

  const formRef = useRef();

  const submit = (values) => {
    saveNewDefaultEvent(values).then((res) => {
      if (res) {
        fetchDefaultEventsAndStore();
        formRef.current.reset();
      }
    });
  };
  const validate = async (values) => formValidation(validationSchema, values);
  return (
    <AddContainer>
      <H2>Add Default Event</H2>
      <Form
        onSubmit={submit}
        validate={validate}
        render={({ handleSubmit, submitting, form }) => {
          formRef.current = form;
          return (
            <form onSubmit={handleSubmit}>
              <Field
                component={SelectInput}
                name="Type"
                label="Type"
                type="text"
                options={defaultEventTypeOptions}
              />
              <Field
                component={TextInput}
                name="Date"
                label="Date"
                type="date"
                validate={(value) => {
                  if (!value) {
                    return validationMsg.required;
                  }
                  if (existingDates.includes(value)) {
                    return validationMsg.defaultEventsOnlyOnDistinctDates;
                  }
                }}
              />
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

export default AddDefaultEvent;
