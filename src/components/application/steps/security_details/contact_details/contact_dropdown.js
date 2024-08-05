import React, { useEffect, useState, useMemo } from "react";
import { Field, useField } from "react-final-form";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { OnChange } from "react-final-form-listeners";
import { useSelector } from "react-redux";

import { getApplicant } from "utils/requests";
import { SelectInput } from "components/atoms";

import useContactOptions from "./helpers/use_contact_options";
import selectIntroducerContact from "./selectors/select_introducer_contact";
import getManualContactSelector from "./selectors/get_manual_contact_selector";
import getIndividualsContact from "./helpers/get_individuals_contact";

const ContactDropdown = ({ setSelectedIndividual, contactFor }) => {
  const [individuals, setIndividuals] = useState([]);
  const { id, indexOfElement: indexOfProperty = 0 } = useParams();
  const selectedContactElementName = `details.selected_contact_for_${contactFor}_valuation`;

  const manualContactData = useSelector(
    getManualContactSelector(indexOfProperty, contactFor)
  );
  const introducerContactData = useSelector(selectIntroducerContact);
  const individualsContactData = useMemo(
    () => getIndividualsContact(individuals),
    [individuals]
  );

  const [contactsData, options] = useContactOptions(
    manualContactData,
    individualsContactData,
    introducerContactData
  );

  const { input: { value } = {} } = useField(selectedContactElementName);

  useEffect(() => {
    setSelectedIndividual(contactsData[value]);
    // eslint-disable-next-line
  }, [individualsContactData, introducerContactData]);

  useEffect(() => {
    getApplicant(id).then(({ data }) => {
      setIndividuals(data.attributes.individuals);
    });
  }, [id]);

  const switchContact = (formValue) =>
    setSelectedIndividual(contactsData[formValue]);

  return (
    <>
      <Field
        component={SelectInput}
        type="select"
        name={selectedContactElementName}
        label="Select contact"
        defaultValue="manual"
        options={options}
      />
      <OnChange name={selectedContactElementName}>{switchContact}</OnChange>
    </>
  );
};

ContactDropdown.propTypes = {
  setSelectedIndividual: PropTypes.func.isRequired,
  contactFor: PropTypes.string.isRequired,
};

export default ContactDropdown;
