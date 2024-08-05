import React from "react";
import PropTypes from "prop-types";

import { currencyFormat, dateFormat, propertyAddressFormat } from "utils";
import { Table } from "components/molecules";
import { mapPropertyAddress } from "components/completed/utils";

import DeleteEstimatedRedemption from "./delete_estimated_redemption";
import EditEstimatedRedemption from "./edit_estimated_redemption";

const columns = [
  {
    Header: "Date",
    accessor: "Date",
    Cell: ({ row }) => dateFormat(row.values.Date),
    sortType: "basic",
  },
  {
    Header: "Amount",
    accessor: "Amount",
    Cell: ({ row }) =>
      typeof row.values.Amount === "number"
        ? currencyFormat(row.values.Amount)
        : row.values.Amount,
    sortType: "basic",
  },

  {
    Header: "Security",
    accessor: "security",
    sortType: "basic",
  },
  {
    Header: "",
    accessor: "edit",
  },

  {
    Header: "",
    accessor: "delete",
  },

  {
    Header: "",
    accessor: "startDrawdown",
  },
];

const securityDescription = (security) => {
  if (security?.isReleased) {
    return "- Released";
  }

  if (security?.isConverted) {
    return "- Converted";
  }

  return "";
};
const mapSecurity = (security) => {
  const addressText = propertyAddressFormat({
    address: mapPropertyAddress(security?.property ?? {}),
  });

  const securityDescriptionText = securityDescription(security);

  return [addressText, securityDescriptionText].filter(Boolean).join(" ");
};
const mapEstimatedRedemption = (estimatedRedemption, index, all) => {
  const isRemainder = index === all.length - 1;
  return {
    ...estimatedRedemption,
    delete: isRemainder ? null : (
      <DeleteEstimatedRedemption
        estimatedRedemption={estimatedRedemption}
        key={estimatedRedemption.EstimatedRedemptionId}
      />
    ),
    edit: (
      <EditEstimatedRedemption
        estimatedRedemption={estimatedRedemption}
        key={estimatedRedemption.EstimatedRedemptionId}
      />
    ),
    Amount: isRemainder ? "Remainder" : estimatedRedemption.Amount,
    security: mapSecurity(estimatedRedemption.security),
  };
};

function ViewEstimatedRedemptions({ estimatedRedemptions = [] }) {
  const data = estimatedRedemptions.map(mapEstimatedRedemption);
  return <Table shouldShowHeaders={true} columns={columns} data={data} />;
}

ViewEstimatedRedemptions.propTypes = {
  estimatedRedemptions: PropTypes.array,
};

export default ViewEstimatedRedemptions;
