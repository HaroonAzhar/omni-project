import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { camelize, titleize } from "inflected";

import ManualAddressEdit, {
  defaultNames,
} from "components/molecules/address_input/manual_address_edit";
import { getUserIdentities } from "utils/requests";

import columns from "./columns";
import DataViewPage, { DataEntryContextMenuWithEdit } from "./data_view_page";
import Inputs from "./inputs";
import UserIdentitySelect from "./user_identity_select";
import TagPreview from "./tag/tag_preview";
import InputWithPicker from "./tag/inputs_with_color_picker";
import BrokerEntry from "./broker_entry";

const DataViewPageWithName = ({ page }) => {
  const mapRecordToTableData = useCallback(
    (record, index) => ({
      Name: record.Name,
      index: index + 1,
      _buttons: (
        <DataEntryContextMenuWithEdit
          page={page}
          dataRecord={record}
          Inputs={Inputs}
        >
          <Inputs />
        </DataEntryContextMenuWithEdit>
      ),
    }),
    [page]
  );
  return (
    <DataViewPage
      page={page}
      mapRecordToTableData={mapRecordToTableData}
      columns={columns}
    />
  );
};

const mappedNames = Object.keys(defaultNames).reduce(
  (acc, key) => ({
    ...acc,
    [key]: camelize(key),
  }),
  {}
);
const InputsWithAddress = () => (
  <>
    <Inputs />
    <ManualAddressEdit
      canSkipAddressValidation={false}
      prefix="Address."
      names={mappedNames}
    />
  </>
);

const InputsWithFirebaseUserSelect = ({ identities }) => (
  <>
    <Inputs />
    <UserIdentitySelect identities={identities} />
  </>
);

InputsWithFirebaseUserSelect.propTypes = {
  identities: PropTypes.array,
};

const DataViewPageWithAddress = ({ page }) => {
  const mapRecordToTableData = useCallback(
    (record, index) => {
      // eslint-disable-next-line no-unused-vars
      const { Id: _, Country, ...rest } = record.Address || {};
      return {
        Name: record.Name,
        Address: Object.values({ ...rest, Country: titleize(Country) })
          .filter(Boolean)
          .join(", "),
        index: index + 1,
        _buttons: (
          <DataEntryContextMenuWithEdit page={page} dataRecord={record}>
            <InputsWithAddress />
          </DataEntryContextMenuWithEdit>
        ),
      };
    },
    [page]
  );
  const columnsWithAddress = [
    ...columns.slice(0, columns.length - 1),
    {
      Header: "Address",
      accessor: "Address",
    },
    columns[columns.length - 1],
  ];
  return (
    <DataViewPage
      page={page}
      mapRecordToTableData={mapRecordToTableData}
      columns={columnsWithAddress}
    />
  );
};

const InputsWithColorPicker = () => (
  <>
    <Inputs />
    <InputWithPicker />
  </>
);
const DataViewPageWithTagPreview = ({ page }) => {
  const mapRecordToTableData = useCallback(
    (record, index) => {
      return {
        Name: record.Name,
        ColorCode: record.ColorCode,
        index: index + 1,
        Preview: <TagPreview name={record.Name} color={record.ColorCode} />,
        _buttons: (
          <DataEntryContextMenuWithEdit page={page} dataRecord={record}>
            <InputsWithColorPicker />
          </DataEntryContextMenuWithEdit>
        ),
      };
    },
    [page]
  );
  const columnsWithPreview = [
    ...columns.slice(0, -1),

    {
      Header: "Preview",
      accessor: "Preview",
    },
    columns[columns.length - 1],
  ];
  return (
    <DataViewPage
      page={page}
      mapRecordToTableData={mapRecordToTableData}
      columns={columnsWithPreview}
    />
  );
};

const DataViewPageWithFirebaseUser = ({ page }) => {
  const [identities, setIdentities] = useState([]);
  useEffect(() => {
    getUserIdentities().then(({ data }) => setIdentities(data));
  }, []);
  const mapRecordToTableData = useCallback(
    (record, index) => {
      return {
        Name: record.Name,
        UserIdentity: record.UserIdentity,
        index: index + 1,
        _buttons: (
          <DataEntryContextMenuWithEdit page={page} dataRecord={record}>
            <InputsWithFirebaseUserSelect identities={identities} />
          </DataEntryContextMenuWithEdit>
        ),
      };
    },
    [page, identities]
  );
  const columnsWithAddress = [
    ...columns.slice(0, columns.length - 1),
    {
      Header: "User Identity",
      accessor: "UserIdentity",
    },
    columns[columns.length - 1],
  ];
  return (
    <DataViewPage
      page={page}
      mapRecordToTableData={mapRecordToTableData}
      columns={columnsWithAddress}
    />
  );
};

DataViewPageWithName.propTypes = {
  page: PropTypes.string.isRequired,
};

DataViewPageWithAddress.propTypes = {
  page: PropTypes.string.isRequired,
};

DataViewPageWithTagPreview.propTypes = {
  page: PropTypes.string.isRequired,
};

DataViewPageWithFirebaseUser.propTypes = {
  page: PropTypes.string.isRequired,
};

const brokerSortComparator = (a, b) => {
  return (a.Name.toLowerCase() > b.Name.toLowerCase() && 1) || -1;
};
const getAssociatedCasesNrs = (associatedCases) => {
  const caseNrs = associatedCases
    ? associatedCases.map((associatedCase) => {
        return <p>{`${associatedCase.CaseNr},`}</p>;
      })
    : [];
  return caseNrs;
};

const columnsWithAssociatedCases = [
  ...columns.slice(0, -1),

  {
    Header: "Associated Cases",
    accessor: "AssociatedCases",
  },
  columns[columns.length - 1],
];
const DataViewPageBroker = ({ page }) => {
  const mapRecordToTableData = useCallback(
    (record, index) => {
      return {
        Name: record.isApproved
          ? record.CompanyName
          : `${record.CompanyName} (pending approval)`,
        AssociatedCases: getAssociatedCasesNrs(record.associatedCases),
        index: index + 1,
        _buttons: <BrokerEntry dataRecord={record} page={page} />,
      };
    },
    [page]
  );
  return (
    <DataViewPage
      page={page}
      mapRecordToTableData={mapRecordToTableData}
      sortDataWith={brokerSortComparator}
      columns={columnsWithAssociatedCases}
    />
  );
};

DataViewPageBroker.propTypes = {
  page: PropTypes.string.isRequired,
};

const adminPages = [
  { page: "underwriters", DataViewPage: DataViewPageWithName },
  { page: "originators", DataViewPage: DataViewPageWithName },
  { page: "solicitors", DataViewPage: DataViewPageWithAddress },
  { page: "waypointNames", DataViewPage: DataViewPageWithName },
  { page: "users", DataViewPage: DataViewPageWithFirebaseUser },
  { page: "tags", DataViewPage: DataViewPageWithTagPreview },
  { page: "brokers", DataViewPage: DataViewPageBroker },
];

export default adminPages;
