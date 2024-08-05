import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field, Form } from "react-final-form";
import moment from "moment";

import { Button, H2, PercentField, TextInput } from "components/atoms";
import { validationMsg } from "utils";
import useCompletedData from "components/completed/use_completed_data";

import { ButtonsContainer } from "../shared_styles/styled_filter";
import useSaveExtension from "./hooks/use_save_extension";

const StyledExtensionForm = styled.div`
  width: 400px;
`;
const ExtensionForm = ({
  onClose,
  currentInterestRate,
  currentMaturityDate,
}) => {
  const initialValues = {
    InterestRate: currentInterestRate,
    Date: moment(currentMaturityDate).format("YYYY-MM-DD"),
  };
  const savingRequest = useSaveExtension();
  const [reFetch, setRefetch] = useState(false);
  useCompletedData(() => {}, reFetch);

  const onSubmit = (values) => {
    savingRequest(values).then((res) => {
      if (res) {
        setRefetch(true);
        onClose();
      }
    });
  };

  return (
    <StyledExtensionForm>
      <H2>Add Extension</H2>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field
                name="Date"
                label="Extension Date"
                component={TextInput}
                type="date"
                validate={(value) => {
                  if (
                    moment(value).isSameOrBefore(moment(currentMaturityDate))
                  ) {
                    return validationMsg.extensionOnlyAfterMaturity;
                  }
                }}
              />
              <PercentField
                name="InterestRate"
                label="Interest Rate (%)"
                validate={(value) =>
                  value ? undefined : validationMsg.required
                }
              />
              <ButtonsContainer>
                <Button kind="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button>Save</Button>
              </ButtonsContainer>
            </form>
          );
        }}
      />
    </StyledExtensionForm>
  );
};

ExtensionForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentInterestRate: PropTypes.number.isRequired,
  currentMaturityDate: PropTypes.string.isRequired,
};

export default ExtensionForm;
