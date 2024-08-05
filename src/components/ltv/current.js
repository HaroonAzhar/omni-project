import React, { useMemo } from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import * as yup from "yup";
import { useToasts } from "react-toast-notifications";

import LtvRequestService from "module/ltv/requestService";
import formValidation from "utils/form_validation";
import validationMsg from "utils/validation_messages";
import { useProgress } from "components/progress";

import useCurrentValues from "./hooks/useCurrentValues";
import { Button, TextInput, Container } from "../atoms";
import { StyledTable, StyledTr } from "./ltv.atoms";
import useColumns from "./hooks/useColumns";

const StyledInput = styled(TextInput)`
  max-width: 90px;
  padding: 0;
`;

/**
 * Returned value is integer from 0 to 100.
 */
const parseToProperValue = (value) => {
  if (value) {
    const parsedValue = parseInt(value);

    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(parsedValue)) {
      return Math.min(Math.max(parsedValue, 0), 100);
    }
  }

  return value;
};

const Current = () => {
  const [, setLoading] = useProgress();
  const { addToast } = useToasts();

  const columns = useColumns();
  const currentValues = useCurrentValues();

  // prepare validation schema
  const validationSchema = useMemo(() => {
    const schema = {};

    columns.forEach(([key]) => {
      schema[key] = yup
        .number()
        .required(validationMsg.required)
        .min(0)
        .max(100);
    });

    return yup.object().shape(schema);
  }, [columns]);

  // submit form
  const submit = async (data) => {
    setLoading(true);

    try {
      await LtvRequestService.save(data);

      addToast("Saved successfully", { appearance: "success" });
    } catch (err) {
      addToast("Saving failed", { appearance: "error" });
    }

    setLoading(false);
  };

  return (
    <Form
      onSubmit={submit}
      validate={async (values) => formValidation(validationSchema, values)}
      initialValues={currentValues}
      render={({ handleSubmit, submitting, pristine }) => {
        return (
          <form onSubmit={handleSubmit}>
            <StyledTable>
              <thead>
                <StyledTr>
                  <th>Type of change</th>
                  <th>Loan type</th>
                  <th>Charge</th>
                  <th>Borrower</th>
                  <th>Value</th>
                </StyledTr>
              </thead>
              <tbody>
                {columns.map(([key, fields]) => {
                  return (
                    <StyledTr key={key}>
                      {fields.map((field, index) => (
                        <td key={`${key}-${index}`}>{field}</td>
                      ))}
                      <td>
                        <Field
                          name={key}
                          parse={parseToProperValue}
                          disabled={submitting}
                          component={StyledInput}
                          type="number"
                        />
                      </td>
                    </StyledTr>
                  );
                })}
              </tbody>
            </StyledTable>

            <Container align="right">
              <Button type="submit" disabled={submitting || pristine}>
                Save
              </Button>
            </Container>
          </form>
        );
      }}
    />
  );
};

export default Current;
