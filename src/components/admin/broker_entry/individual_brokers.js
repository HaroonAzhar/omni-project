import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import * as yup from "yup";

import { TextInput, Button } from "components/atoms";
import { DeleteIcon } from "components/icons";
import { validationMsg, fieldValidation } from "utils";

import { BrokerElement, StyledIndividualBroker } from "./styled_broker_entry";

const individualBrokerSchema = yup.object().shape({
  ContactName: yup.string().required(validationMsg.required),
  ContactEmail: yup
    .string()
    .email(validationMsg.email)
    .required(validationMsg.required),
});

const IndividualBroker = ({ name, onRemove }) => {
  const brokerValidation = fieldValidation(individualBrokerSchema);
  return (
    <StyledIndividualBroker>
      <BrokerElement>
        <Field
          component={TextInput}
          name={`${name}.ContactName`}
          type="text"
          validate={(value) => brokerValidation("ContactName", value)}
        />
      </BrokerElement>
      <BrokerElement>
        <Field
          component={TextInput}
          name={`${name}.ContactEmail`}
          validate={(value) => brokerValidation("ContactEmail", value)}
          type="text"
        />
      </BrokerElement>

      <button type="button" onClick={onRemove}>
        <DeleteIcon />
      </button>
    </StyledIndividualBroker>
  );
};

IndividualBroker.propTypes = {
  name: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const IndividualBrokers = ({ form }) => {
  return (
    <>
      <StyledIndividualBroker>
        <BrokerElement>Name</BrokerElement>
        <BrokerElement>Email</BrokerElement>
        <Button
          kind="extra"
          type="button"
          onClick={() => form.mutators.push("individualBrokers", {})}
        >
          Add
        </Button>
      </StyledIndividualBroker>
      <FieldArray name="individualBrokers">
        {({ fields }) =>
          fields.map((name, index) => (
            <IndividualBroker
              key={name}
              name={name}
              onRemove={() => form.mutators.remove("individualBrokers", index)}
              index={index}
            />
          ))
        }
      </FieldArray>
    </>
  );
};

IndividualBrokers.propTypes = {
  form: PropTypes.object.isRequired,
};

export default IndividualBrokers;
