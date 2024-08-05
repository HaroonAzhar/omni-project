import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { getAdminRecords } from "utils/requests/api";
import { SelectInput, Button } from "components/atoms";
import BrokerEdit from "components/admin/broker_entry/broker_edit";
import useStorageControls from "components/admin/data_view_page/data_entry_context_menu_with_edit/hooks/use_storage_controls";

import {
  StyledButtonsContainer,
  StyledSelection,
  StyledSelectionField,
} from "../styled_exported_components";

const brokerIndividualAsSelectEntry = (brokerIndividual) => ({
  value: brokerIndividual.Id,
  label: `${brokerIndividual.ContactName} (${brokerIndividual.ContactEmail})`,
});

const brokerAsSelectEntry = (broker) => ({
  value: broker.Id,
  label: `${broker.CompanyName} (${
    broker.isApproved ? "approved" : "pending approval"
  })`,
  individualBrokers: broker.individualBrokers,
});

const useBrokers = (broker, refetch) => {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    getAdminRecords("brokers", broker).then((res) =>
      setBrokers(res ? res.data : [])
    );
  }, [broker, refetch]);

  return brokers;
};

const brokersAsSelectEntry = (brokers) => [
  { label: "Choose One", value: "" },
  ...brokers.map(brokerAsSelectEntry),
];

const getOptionsIndividualBrokers = (
  matchingBroker,
  changeIndividualBroker
) => {
  if (matchingBroker) {
    const brokerIndividualsAsSelectEntry = matchingBroker.individualBrokers.map(
      brokerIndividualAsSelectEntry
    );
    if (brokerIndividualsAsSelectEntry.length === 1) {
      changeIndividualBroker(brokerIndividualsAsSelectEntry[0].value);
      return brokerIndividualsAsSelectEntry;
    }
    return [
      { label: "Choose One", value: "" },
      ...brokerIndividualsAsSelectEntry,
    ];
  }
  return [{ label: "Select Broker Company first" }];
};

const page = "brokers";

const Broker = ({
  FkBrokerCompanyId,
  brokerCompanyFieldName = "FkBrokerCompanyId",
  brokerIndividualsFieldName = "FkBrokerIndividualId",
  values,
  formChange,
  pristine,
}) => {
  const [refetch, setRefetch] = useState(true);
  const brokers = useBrokers(FkBrokerCompanyId, refetch);

  const brokerOptions = brokersAsSelectEntry(brokers);

  const selectedBrokerId = values[brokerCompanyFieldName];
  const matchingBroker = brokers.find(
    (broker) => broker.Id.toString() === selectedBrokerId?.toString()
  );

  const changeIndividualBroker = (val) =>
    formChange(brokerIndividualsFieldName, val);

  const optionsIndividualBrokers = getOptionsIndividualBrokers(
    matchingBroker,
    changeIndividualBroker
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

  const onNewAdded = (res) => {
    onStorageFinished();
    formChange(brokerCompanyFieldName, res.data);
  };

  const { onSubmit: onSubmitEdit } = useStorageControls({
    page,
    dataRecord: matchingBroker ?? {},
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
          <Field
            label="Broker Company"
            component={SelectInput}
            type="select"
            name={brokerCompanyFieldName}
            options={brokerOptions}
          />
        </StyledSelectionField>
        <OnChange name={brokerCompanyFieldName}>
          {() => {
            if (pristine) {
              return;
            }
            formChange(brokerIndividualsFieldName, undefined);
          }}
        </OnChange>
        <StyledButtonsContainer>
          <Button kind="secondary" type="button" onClick={startNew}>
            +
          </Button>

          <Button kind="secondary" type="button" onClick={startEdit}>
            E
          </Button>
        </StyledButtonsContainer>
      </StyledSelection>

      <StyledSelectionField>
        <Field
          label="Broker"
          component={SelectInput}
          type="select"
          name={brokerIndividualsFieldName}
          options={optionsIndividualBrokers}
        />
      </StyledSelectionField>

      <BrokerEdit
        dataRecord={matchingBroker ?? {}}
        shouldShowInputs={editExisting}
        onCancel={cancelEdit}
        onSubmit={onSubmitEdit}
      />

      <BrokerEdit
        dataRecord={{}}
        shouldShowInputs={addNew}
        onCancel={cancelNew}
        onSubmit={onSubmitNew}
      />
    </>
  );
};

Broker.propTypes = {
  FkBrokerCompanyId: PropTypes.string,

  brokerCompanyFieldName: PropTypes.string,
  brokerIndividualsFieldName: PropTypes.string,
  values: PropTypes.object.isRequired,
  formChange: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
};

export default Broker;
