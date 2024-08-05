import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";

import { formValidation, validationMsg } from "utils";
import { Button, Fieldset, RadioInput } from "components/atoms";
import { Originator, Broker } from "components/admin/exported_components";

import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "../styled_dip_steps";

const validationSchema = yup.object().shape({
  IntroducerType: yup.string().required(),
  FkOriginatorId: yup.number(),

  FkBrokerCompanyId: yup
    .number()
    .when("IntroducerType", (IntroducerType, schema) =>
      IntroducerType === "via_broker"
        ? schema.required(validationMsg.required)
        : schema.nullable()
    ),
  FkBrokerIndividualId: yup
    .number()
    .when("IntroducerType", (IntroducerType, schema) =>
      IntroducerType === "via_broker"
        ? schema.required(validationMsg.required)
        : schema.nullable()
    ),
});

const IntroducerDetailsForm = ({ finalizeStep, goStepBack }) => {
  const onSubmit = (data) => {
    finalizeStep({
      data,
      stepId: "introducer",
    });
  };

  const validate = async (values) => formValidation(validationSchema, values);
  const {
    IntroducerType,
    FkOriginatorId,
    FkBrokerCompanyId,
    FkBrokerIndividualId,
  } = useSelector(({ dip }) => dip);

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        IntroducerType,
        FkOriginatorId,
        FkBrokerCompanyId,
        FkBrokerIndividualId,
      }}
      render={({
        handleSubmit,
        submitting,
        touched,
        errors,
        values,
        form,
        pristine,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <StyledMainFormContent>
              <Grid container spacing={10}>
                <Grid item l>
                  <Originator originator={FkOriginatorId} />

                  <Fieldset
                    touched={touched.IntroducerType}
                    errors={errors.IntroducerType}
                    title="Lead Source"
                  >
                    <Field
                      component={RadioInput}
                      type="radio"
                      name="IntroducerType"
                      value="direct_application"
                      label="Direct Application"
                    />

                    <Field
                      component={RadioInput}
                      type="radio"
                      name="IntroducerType"
                      value="via_broker"
                      label="Via Broker"
                    />
                  </Fieldset>
                </Grid>
                <Grid item l>
                  {values.IntroducerType === "via_broker" && (
                    <Fieldset title="Broker Details">
                      <Broker
                        values={values}
                        formChange={form.change}
                        pristine={pristine}
                      />
                    </Fieldset>
                  )}
                </Grid>
              </Grid>
            </StyledMainFormContent>

            <StyledButtonsContainer>
              <Button kind="fade" type="button" onClick={goStepBack}>
                Back
              </Button>

              <Button type="submit" disabled={submitting}>
                Continue
              </Button>
            </StyledButtonsContainer>
          </form>
        );
      }}
    />
  );
};

export default IntroducerDetailsForm;

IntroducerDetailsForm.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
