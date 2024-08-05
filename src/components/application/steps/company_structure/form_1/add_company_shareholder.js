import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, useForm } from "react-final-form";
import * as yup from "yup";

import { Button, Modal } from "components/atoms";
import { CompaniesHouseSearch } from "components/organisms";
import { StyledButtonsContainer } from "components/dip_forms_steps/styled_dip_steps";
import { formValidation, validationMsg } from "utils";

import addShareholderToStructure from "./add_shareholder_to_structure";

const useCompanyShareholderSave = (
  sharedHoldersStructure,
  currentView,
  setSharedHoldersStructure,
  closeModal
) => {
  const form = useForm();

  return (values) => {
    const id = addShareholderToStructure(
      sharedHoldersStructure,
      currentView,
      setSharedHoldersStructure
    );
    const namePrefix = `shared_holders.${id}`;

    const isCompanyName = `${namePrefix}.isCompany`;
    const companyName = `${namePrefix}.name`;
    const companyNumber = `${namePrefix}.company_number`;

    form.change(isCompanyName, "true");
    form.change(companyName, values.CompanyName);

    form.change(companyNumber, values.CompanyNumber);
    closeModal();
  };
};

const validationSchema = yup.object().shape({
  CompanyName: yup.string().required(validationMsg.required),
  CompanyNumber: yup
    .string()
    .when("notInCh", (notInCh, schema) =>
      notInCh
        ? schema.nullable()
        : schema.required(validationMsg.companyMustBeSelected)
    ),
});

const AddCompanyShareholder = ({
  sharedHoldersStructure,
  setSharedHoldersStructure,
  currentView,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  const onSubmit = useCompanyShareholderSave(
    sharedHoldersStructure,
    currentView,
    setSharedHoldersStructure,
    closeModal
  );

  const validate = async (values) => formValidation(validationSchema, values);

  return (
    <>
      <Modal onClose={closeModal} isOpen={modalVisible}>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, form, touched, values, errors }) => (
            <form onSubmit={handleSubmit}>
              <CompaniesHouseSearch
                errors={errors}
                form={form}
                touched={touched}
                values={values}
              />
              <StyledButtonsContainer>
                <Button kind="fade" type="button" onClick={closeModal}>
                  Cancel
                </Button>

                <Button type="submit">Add</Button>
              </StyledButtonsContainer>
            </form>
          )}
        />
      </Modal>
      <Button kind="extra" type="button" onClick={openModal}>
        + Add Company shareholder
      </Button>
    </>
  );
};

export default AddCompanyShareholder;

AddCompanyShareholder.propTypes = {
  sharedHoldersStructure: PropTypes.object.isRequired,
  setSharedHoldersStructure: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
};
