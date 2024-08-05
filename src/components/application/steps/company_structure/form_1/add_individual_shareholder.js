import React, { useState } from "react";
import PropTypes from "prop-types";
import { Field, Form, useForm } from "react-final-form";
import * as yup from "yup";

import { Button, Modal, SelectInput } from "components/atoms";
import { StyledButtonsContainer } from "components/dip_forms_steps/styled_dip_steps";
import { formValidation, validationMsg } from "utils";

import addShareholderToStructure from "./add_shareholder_to_structure";

const useIndividualShareholderSave = (
  sharedHoldersStructure,
  currentView,
  setSharedHoldersStructure,
  closeModal,
  individualsOptions
) => {
  const form = useForm();

  return (values) => {
    const id = addShareholderToStructure(
      sharedHoldersStructure,
      currentView,
      setSharedHoldersStructure
    );
    const namePrefix = `shared_holders.${id}`;

    const [{ label }] = individualsOptions.filter(
      (option) =>
        option.value.toString() === values.FkSharedContactId.toString()
    );

    const isCompanyName = `${namePrefix}.isCompany`;
    const fkSharedContactIdName = `${namePrefix}.fk_shared_contact_id`;
    const name = `${namePrefix}.name`;

    form.change(isCompanyName, "false");
    form.change(fkSharedContactIdName, values.FkSharedContactId);
    form.change(name, label);

    closeModal();
  };
};

const validationSchema = yup.object().shape({
  FkSharedContactId: yup.string().required(validationMsg.required),
});

const AddIndividualShareholder = ({
  sharedHoldersStructure,
  setSharedHoldersStructure,
  currentView,
  individualsOptions,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  const onSubmit = useIndividualShareholderSave(
    sharedHoldersStructure,
    currentView,
    setSharedHoldersStructure,
    closeModal,
    individualsOptions
  );

  const validate = async (values) => formValidation(validationSchema, values);

  return (
    <>
      <Modal onClose={closeModal} isOpen={modalVisible}>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                component={SelectInput}
                name="FkSharedContactId"
                options={individualsOptions}
                label="Individual Shareholder"
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
        + Add Individual shareholder
      </Button>
    </>
  );
};

export default AddIndividualShareholder;

AddIndividualShareholder.propTypes = {
  sharedHoldersStructure: PropTypes.object.isRequired,
  setSharedHoldersStructure: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  individualsOptions: PropTypes.array.isRequired,
};
