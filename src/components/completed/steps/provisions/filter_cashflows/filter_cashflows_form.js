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
          <H2>Filter Cashflows</H2>
          <Field
            component={TextInput}
            name="ActualDateMin"
            label="Actual Date Range min"
            type="date"
          />
          <Field
            component={TextInput}
            name="ActualDateMax"
            label="Actual Date Range max"
            type="date"
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
