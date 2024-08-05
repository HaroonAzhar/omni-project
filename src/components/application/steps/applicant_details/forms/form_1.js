import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import moment from "moment";

import { parseUndefinedToEmptyString } from "utils";
import { TextInput, Button, TitleField } from "components/atoms";
import {
  StyledButtonsContainer,
  StyledMainFormContent,
} from "components/dip_forms_steps/styled_dip_steps";
import { Contact } from "components/admin/exported_components";

import getOnSubmit from "./get_on_submit";

const Form1 = ({ finalizeStep, goStepBack }) => {
  const { indexOfElement = 0 } = useParams();
  const { individuals, type_of_applicant: typeOfApplicant } = useSelector(
    (state) => state.application
  );
  const applicant = (individuals && individuals[indexOfElement]) || {
    personal_data: { marital_status: undefined },
    addresses: [{}],
  };

  const shouldNamesEditBeDisabled = typeOfApplicant === "individual";

  const onSubmit = getOnSubmit(applicant, finalizeStep);

  const changeNames = (formChange) => (_, selected) => {
    formChange("personal_data.forename", selected?.contact?.Forename);
    formChange("personal_data.surname", selected?.contact?.Surname);
    formChange("personal_data.middle_name", selected?.contact?.MiddleName);
    formChange(
      "personal_data.date_of_birth",
      moment(selected?.contact?.DateOfBirth).format(moment.HTML5_FMT.DATE)
    );
    formChange(
      "personal_data.insurance_number",
      selected?.contact?.NationalInsuranceNumber
    );
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={applicant}
      render={({ handleSubmit, submitting, values, form }) => (
        <form onSubmit={handleSubmit}>
          <StyledMainFormContent>
            <TitleField name="personal_data.title" />

            <Contact
              FkSharedContactId={applicant.fk_shared_contact_id}
              values={values}
              formChange={form.change}
              onChange={changeNames(form.change)}
              disabled={shouldNamesEditBeDisabled}
              contactFieldName="fk_shared_contact_id"
            />
            <Field
              component={TextInput}
              type="text"
              name="personal_data.forename"
              label="Forename"
              placeholder="Anna"
              disabled={true}
            />
            <Field
              component={TextInput}
              type="text"
              name="personal_data.middle_name"
              label="Middle name(s)"
              placeholder="Maria"
              parse={parseUndefinedToEmptyString}
              disabled={true}
            />
            <Field
              component={TextInput}
              type="text"
              name="personal_data.surname"
              label="Surname"
              placeholder="Jons"
              disabled={true}
            />
            <Field
              component={TextInput}
              type="text"
              name="personal_data.other_name"
              label="Other name (Maiden or Alias)"
              placeholder="James"
              parse={parseUndefinedToEmptyString}
            />
            <Field
              component={TextInput}
              type="text"
              name="personal_data.mothers_maiden_name"
              label="Mother’s maiden name"
              parse={parseUndefinedToEmptyString}
            />
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

export default Form1;

Form1.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
