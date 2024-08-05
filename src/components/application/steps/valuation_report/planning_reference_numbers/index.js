import React from "react";
import PropTypes from "prop-types";
import { FieldArray } from "react-final-form-arrays";

import { Button, H2 } from "components/atoms";

import { StyledPlanningReferenceNumbersContainer } from "./styled_planning_reference_numbers";
import PlanningReferenceNumber from "./planning_reference_number";

const PlanningReferenceNumbers = ({ mutators }) => {
  const fieldName = "planning_reference_numbers";
  return (
    <StyledPlanningReferenceNumbersContainer>
      <H2> Planning Reference numbers</H2>
      <FieldArray name={fieldName}>
        {({ fields }) => {
          return fields.map((name, index) => (
            <PlanningReferenceNumber
              key={name}
              name={name}
              onRemove={() => {
                mutators.remove(fieldName, index);
              }}
              index={index}
            />
          ));
        }}
      </FieldArray>

      <Button
        kind="extra"
        type="button"
        onClick={() => mutators.push(fieldName, undefined)}
      >
        + Add Planning Reference
      </Button>
    </StyledPlanningReferenceNumbersContainer>
  );
};

export default PlanningReferenceNumbers;

PlanningReferenceNumbers.propTypes = {
  mutators: PropTypes.array.isRequired,
};
