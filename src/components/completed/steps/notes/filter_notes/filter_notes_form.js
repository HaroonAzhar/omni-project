import React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";

import { Button, H2, TextInput } from "components/atoms";
import { useQueryParamsAsFilter } from "utils";

import { ButtonsContainer } from "../../shared_styles/styled_filter";

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
          <H2>Filter Notes</H2>
          <Field
            component={TextInput}
            name="CreatedDateMin"
            label="Date Range min"
            type="date"
          />
          <Field
            component={TextInput}
            name="CreatedDateMax"
            label="Date Range max"
            type="date"
          />
          <Field
            component={TextInput}
            name="CreatedBy"
            label="Created By"
            type="text"
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
