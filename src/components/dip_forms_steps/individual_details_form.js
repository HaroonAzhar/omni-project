import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import * as yup from "yup";
import { useSelector } from "react-redux";

import { validationMsg } from "utils";
import { Button, TextInput } from "components/atoms";
import { Contact } from "components/admin/exported_components";

import {
  StyledButtonsContainer,
  StyledMainFormContent,
  StyledMultipleEntriesTitle,
  StyledMultipleEntry,
} from "./styled_dip_steps";

const validationSchema = yup.object().shape({
  FkSharedContactId: yup.number().required(validationMsg.required),
  Email: yup.string().email().required(validationMsg.required),
});

const fieldValidation = (fieldName, value) => {
  try {
    yup.reach(validationSchema, fieldName).validateSync(value);
  } catch (validation_error) {
    return validation_error.errors[0];
  }
};

const ApplicantInput = ({ name, onRemove, index, values, form }) => {
  const IntroducerType = useSelector((state) => state.dip?.IntroducerType);

  return (
    <StyledMultipleEntry>
      <StyledMultipleEntriesTitle>
        {`Applicant ${index + 1}`}
      </StyledMultipleEntriesTitle>

      <Contact values={values} formChange={form.change} index={index} />
      {IntroducerType !== "via_broker" && (
        <Field
          component={TextInput}
          type="text"
          name={`${name}.Email`}
          label="Email"
          validate={(value) => fieldValidation("Email", value)}
          placeholder="name@domain.domain"
        />
      )}
      {name !== "contacts[0]" && (
        <Button kind="extra" type="button" onClick={onRemove}>
          - Remove Applicant
        </Button>
      )}
    </StyledMultipleEntry>
  );
};

const IndividualDetailsForm = ({ finalizeStep, goStepBack }) => {
  const { contacts, ApplicantType } = useSelector(({ dip }) => dip);
  const onSubmit = (data) =>
    finalizeStep({
      data: { ...data, ContactType: "individual" },
      stepId: "contact_individual",
    });

  const getDefaultApplicants = () => {
    if (ApplicantType === "company" || !contacts || contacts.length === 0)
      return [{}];

    return contacts;
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        contacts: getDefaultApplicants(),
      }}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit, submitting, form, values }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <FieldArray name="contacts">
              {({ fields }) =>
                fields.map((name, index) => (
                  <ApplicantInput
                    key={name}
                    name={name}
                    onRemove={() => form.mutators.remove("contacts", index)}
                    index={index}
                    form={form}
                    values={values}
                  />
                ))
              }
            </FieldArray>

            <Button
              kind="extra"
              type="button"
              onClick={() => form.mutators.push("contacts", {})}
            >
              + Add another applicant
            </Button>
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
      )}
    />
  );
};

export default IndividualDetailsForm;

IndividualDetailsForm.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};

ApplicantInput.propTypes = {
  name: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  values: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};
