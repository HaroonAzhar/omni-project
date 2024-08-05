import React from "react";
import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";

import { Button, H2, SelectInput, TextInput } from "components/atoms";
import { Question } from "components/molecules";
import { useQueryParamsAsFilter } from "utils";

import {
  ButtonsContainer,
  QuestionsWrapper,
} from "../../shared_styles/styled_filter";
import getWaypointsCategories from "../get_waypoint_categories";

const FilterForm = ({ afterSubmit }) => {
  const {
    putQueryParamsIntoPath,
    getQueryParamsFromPath,
    clearQueryParamsFromPath,
  } = useQueryParamsAsFilter();
  const onSubmit = (values) => {
    if (values.IsCompleted === undefined) {
      delete values.IsCompleted;
    }
    putQueryParamsIntoPath(values);
    afterSubmit();
  };

  const queryParams = getQueryParamsFromPath();
  const initialValues = {
    ...queryParams,
    IsCompleted: queryParams.IsCompleted && queryParams.IsCompleted === "true",
  };
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <H2>Filter Waypoints</H2>
          <QuestionsWrapper>
            <Field
              component={TextInput}
              name="DueDateMin"
              label="Due Date Range Min"
              type="date"
            />
            <Field
              component={TextInput}
              name="DueDateMax"
              label="Due Date Range Max"
              type="date"
            />
            <Field
              component={SelectInput}
              name="Category"
              label="Category"
              type="text"
              options={getWaypointsCategories()}
            />
            <Question
              name="IsCompleted"
              label="Is Completed"
              withUndefined={true}
            />
          </QuestionsWrapper>
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
