import React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";

import { Button, H2, TextInput, SelectInput } from "components/atoms";
import { useQueryParamsAsFilter } from "utils";

import { ButtonsContainer } from "../../shared_styles/styled_filter";
import getDefaultEventTypeOptions from "../get_default_event_type_options";

const defaultEventTypeOptions = getDefaultEventTypeOptions();

const FilterForm = ({ afterSubmit }) => {
  const {
    putQueryParamsIntoPath,
    getQueryParamsFromPath,
    clearQueryParamsFromPath,
  } = useQueryParamsAsFilter();
  const onSubmit = (values) => {
    putQueryParamsIntoPath(values);
    afterSubmit();
  };

  const initialValues = getQueryParamsFromPath();
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <H2>Filter Default Events</H2>
          <Field
            component={TextInput}
            name="DateMin"
            label="Date Range min"
            type="date"
          />
          <Field
            component={TextInput}
            name="DateMax"
            label="Date Range max"
            type="date"
          />
          <Field
            component={SelectInput}
            name="Type"
            label="Type"
            type="text"
            options={defaultEventTypeOptions}
          />
          <ButtonsContainer>
            <Button kind="secondary" onClick={clearQueryParamsFromPath}>
              Reset
            </Button>
            <Button type="submit">Apply</Button>
          </ButtonsContainer>
        </form>
      )}
    />
  );
};

FilterForm.propTypes = {
  afterSubmit: PropTypes.func.isRequired,
};

export default FilterForm;
