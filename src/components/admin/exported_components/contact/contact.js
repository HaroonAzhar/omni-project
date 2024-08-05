import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Autocomplete } from "mui-rff";

import { getAdminRecords } from "utils/requests/api";
import { Button } from "components/atoms";
import useStorageControls from "components/admin/data_view_page/data_entry_context_menu_with_edit/hooks/use_storage_controls";
import ContactEdit from "components/admin/contact_entry/contact_edit";

import {
  StyledSelection,
  StyledSelectionField,
  StyledButtonsContainer,
} from "../styled_exported_components";

const contactAsSelectEntry = (contact) => ({
  value: contact.Id.toString(),
  label: `${contact.Forename} ${contact.Surname}`,
  contact,
});

const useContacts = (contact, refetch) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getAdminRecords("contacts", contact).then((res) =>
      setContacts(res ? res.data : [])
    );
  }, [contact, refetch]);

  return contacts;
};

export const contactsAsSelectEntry = (contacts) => [
  ...contacts.map(contactAsSelectEntry),
];

const page = "contacts";

const Contact = ({
  FkSharedContactId,
  contactFieldName = "FkSharedContactId",
  values,
  formChange,
  index,
  onChange = () => {},
  disabled = false,
}) => {
  const [refetch, setRefetch] = useState(true);
  const contacts = useContacts(FkSharedContactId, refetch);

  const getContactLabel = (contact) => contact.label;
  const getContactValue = (contact) => contact.value;

  const contactOptions = contactsAsSelectEntry(contacts);

  const selectedContactId =
    index !== undefined
      ? values[page][index][contactFieldName]
      : values[contactFieldName];
  const matchingContact = contacts.find(
    (contact) => contact.Id.toString() === selectedContactId?.toString()
  );

  const [editExisting, setEditExisting] = useState(false);

  const startEdit = () => setEditExisting(true);
  const cancelEdit = () => setEditExisting(false);

  const [addNew, setAddNew] = useState(false);

  const startNew = () => setAddNew(true);
  const cancelNew = () => setAddNew(false);

  const onStorageFinished = () => {
    cancelNew();
    cancelEdit();
    setRefetch((existing) => !existing);
  };

  const combinedName =
    index !== undefined
      ? `${page}[${index}].${contactFieldName}`
      : contactFieldName;

  const onNewAdded = (res) => {
    onStorageFinished();
    formChange(combinedName, res.data);
  };

  const { onSubmit: onSubmitEdit } = useStorageControls({
    page,
    dataRecord: matchingContact ?? {},
    onStorageFinished,
  });

  const { onSubmit: onSubmitNew } = useStorageControls({
    page,
    dataRecord: {},
    onStorageFinished: onNewAdded,
  });

  return (
    <>
      <StyledSelection>
        <StyledSelectionField>
          {contactOptions.length > 0 && (
            <Autocomplete
              label="Contact"
              name={combinedName}
              options={contactOptions}
              getOptionLabel={getContactLabel}
              getOptionValue={getContactValue}
              defaultValue={
                matchingContact && contactAsSelectEntry(matchingContact)
              }
              fullWidth
              required
              onChange={onChange}
              disabled={disabled}
            />
          )}
        </StyledSelectionField>
        <StyledButtonsContainer>
          <Button kind="secondary" type="button" onClick={startNew}>
            +
          </Button>

          <Button kind="secondary" type="button" onClick={startEdit}>
            E
          </Button>
        </StyledButtonsContainer>
      </StyledSelection>

      <ContactEdit
        dataRecord={matchingContact ?? {}}
        shouldShowInputs={editExisting}
        onCancel={cancelEdit}
        onSubmit={onSubmitEdit}
      />

      <ContactEdit
        dataRecord={{}}
        shouldShowInputs={addNew}
        onCancel={cancelNew}
        onSubmit={onSubmitNew}
      />
    </>
  );
};

Contact.propTypes = {
  FkSharedContactId: PropTypes.string,

  contactFieldName: PropTypes.string,
  values: PropTypes.object.isRequired,
  formChange: PropTypes.func.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Contact;
