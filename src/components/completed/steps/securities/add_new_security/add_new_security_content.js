import React from "react";
import { Grid } from "@material-ui/core";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button, H2, TextAreaInput } from "components/atoms";
import { AddressInput } from "components/molecules";
import { formValidation } from "utils";

import AddSecurityValuationFields from "../view_completed_securities/valuations/add_security_valuation_fields";
import { ButtonsContainer } from "../../shared_styles/styled_filter";
import useCompletedSecuritiesData from "../view_completed_securities/use_completed_securities_data";
import useSaveNewSecurity from "./use_save_new_security";
import validationSchema from "./validation_schema";

const AddressWrapper = styled.div`
  width: 400px;
  > div {
    > button {
      left: 0px;
      position: relative;
      top: 12px;
    }
  }
`;

function AddNewSecurityContent({ closeAdd }) {
  const saveSecurityNewSecurity = useSaveNewSecurity();
  const { fetchSecuritiesAndStore } = useCompletedSecuritiesData();

  const submit = ({ address, Note, ...valuation }) => {
    const toSave = {
      property: {
        AddressLine1: address.line_1,
        AddressLine2: address.line_2,
        AddressCity: address.town_city,
        AddressCountry: address.country,
        AddressPostcode: address.postcode,
      },
      note: {
        Text: Note,
      },
      valuation,
    };

    saveSecurityNewSecurity(toSave).then((res) => {
      if (res) {
        fetchSecuritiesAndStore();
        closeAdd();
      }
    });
  };

  const validate = async (values) => formValidation(validationSchema, values);
  return (
    <Form
      onSubmit={submit}
      validate={validate}
      render={({ handleSubmit, values, form }) => {
        return (
          <form onSubmit={handleSubmit}>
            <H2>Underwriter Flow</H2>

            <Grid container spacing={3}>
              <Grid item l>
                <AddressWrapper>
                  <AddressInput name="address" form={form} />
                </AddressWrapper>

                <Field
                  component={TextAreaInput}
                  label="Note about created security"
                  name="Note"
                />
              </Grid>
              <Grid item m>
                <AddSecurityValuationFields values={values} />
              </Grid>
            </Grid>

            <ButtonsContainer>
              <Button kind="secondary" onClick={closeAdd}>
                Cancel
              </Button>
              <Button>Save</Button>
            </ButtonsContainer>
          </form>
        );
      }}
    />
  );
}

AddNewSecurityContent.propTypes = {
  closeAdd: PropTypes.func.isRequired,
};

export default AddNewSecurityContent;
