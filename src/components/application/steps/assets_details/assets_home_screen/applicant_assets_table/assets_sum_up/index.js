import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Table } from "components/molecules";

import columns from "./columns";
import getSumOfAssets from "./get_sum_of_assets";

const StyledTable = styled(Table)`
  tbody {
    font-size: 1.2em;
    font-weight: bold;
  }

  table thead th {
    font-weight: 400;
  }

  table tr,
  table thead {
    border-bottom: 0;
  }
`;

const AssetsSumUp = ({ applicantsData }) => {
  const {
    overallPropertySubtotal,
    overallNonPropertySubtotal,
    overallSubtotal,
  } = getSumOfAssets(applicantsData);

  const data = [
    {
      row_name: "Overall Property Subtotal",
      ...overallPropertySubtotal,
    },
    {
      row_name: "Overall Non Property Subtotal",
      ...overallNonPropertySubtotal,
    },
    {
      row_name: "Overall Subtotal",
      ...overallSubtotal,
    },
  ];

  return <StyledTable columns={columns} data={data} shouldShowHeaders={true} />;
};

AssetsSumUp.propTypes = {
  applicantsData: PropTypes.object,
};

export default AssetsSumUp;
