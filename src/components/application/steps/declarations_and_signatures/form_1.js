import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import moment from "moment";
import { OnChange } from "react-final-form-listeners";

import { Fieldset, Checkbox, TextInput, H1 } from "components/atoms";
import { FlowControlButtons } from "components/molecules";
import validationMsg from "utils/validation_messages";
import { StyledMainFormContent } from "components/dip_forms_steps/styled_dip_steps";

const StyledDateInput = styled(TextInput)`
  width: 180px;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 500px;
`;

const StyledSignatureContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: 35px;
  padding-right: 30px;
`;

const SignatureInputs = ({ groupName, name, applicantData, form }) => {
  const nameOfDateField = `${name}.declarations_signatures.date_of_${groupName}`;
  const nameOfCheckbox = `${name}.declarations_signatures.${groupName}`;
  return (
    <StyledSignatureContainer>
      <Field
        component={Checkbox}
        type="checkbox"
        name={nameOfCheckbox}
        label={`${applicantData.personal_data.forename} ${applicantData.personal_data.surname}`}
        disabled={applicantData.notReady}
      />
      <OnChange name={nameOfCheckbox}>
        {(value) => {
          if (value === false) {
            form.change(nameOfDateField, "");
          }
        }}
      </OnChange>

      <Field
        component={StyledDateInput}
        type="date"
        name={nameOfDateField}
        label={`Date of ${groupName}`}
        disabled={!applicantData.declarations_signatures?.[groupName]}
        validate={(value, _, { pristine }) => {
          const checkboxState = form.getFieldState(nameOfCheckbox) || {};
          const isDateValueNeeded = checkboxState.value;

          if (!isDateValueNeeded) {
            return undefined;
          }
          if (!value) {
            return validationMsg.required;
          }

          try {
            const start = moment(value);
            const stop = moment();

            const diff = stop.diff(start, "days", true);

            if (diff < 0) {
              return validationMsg.dateInFuture;
            }

            if (pristine) {
              return undefined;
            }

            if (diff > 6 * 30) {
              return validationMsg.in6months;
            }

            return undefined;
          } catch (e) {
            return validationMsg.mustBeDate;
          }
        }}
      />
    </StyledSignatureContainer>
  );
};

const Form1 = ({ finalizeStep, goStepBack }) => {
  const onSubmit = ({ individuals }) => finalizeStep({ data: individuals });

  const individuals =
    useSelector((state) => state.application.individuals) || [];

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ individuals }}
      mutators={arrayMutators}
      render={({ handleSubmit, submitting, values, form }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <section>
              <H1>Declarations</H1>
              <Fieldset title="Have declarations been signed?">
                <StyledDiv>
                  <FieldArray name="individuals">
                    {({ fields }) =>
                      fields.map((name, index) => (
                        <SignatureInputs
                          groupName="declaration"
                          name={name}
                          key={name}
                          applicantData={values.individuals[index]}
                          form={form}
                        />
                      ))
                    }
                  </FieldArray>
                </StyledDiv>
              </Fieldset>
            </section>

            <section>
              <H1>
                Signatures and declarations for Asset & Liability statement
              </H1>
              <Fieldset title="Have signatures been received?">
                <StyledDiv>
                  <FieldArray name="individuals">
                    {({ fields }) =>
                      fields.map((name, index) => (
                        <SignatureInputs
                          groupName="signature"
                          name={name}
                          key={name}
                          applicantData={values.individuals[index]}
                          form={form}
                        />
                      ))
                    }
                  </FieldArray>
                </StyledDiv>
              </Fieldset>
            </section>
          </StyledMainFormContent>

          <FlowControlButtons
            onBack={goStepBack}
            isContinueDisabled={submitting}
          />
        </form>
      )}
    />
  );
};

export default Form1;

Form1.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};

SignatureInputs.propTypes = {
  groupName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  applicantData: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};
