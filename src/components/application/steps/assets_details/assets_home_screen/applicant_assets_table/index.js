import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { H2 } from "components/atoms";
import { Table } from "components/molecules";

import columns from "./columns";
import AssetsSumUp from "./assets_sum_up";
import AddAssetOrLiability from "./add_asset_or_liability";
import getSumUpOfAssetsForTable from "./get_sum_up_of_assets_for_table";

const StyledApplicantTableContainer = styled.div`
  margin-bottom: 15px;
`;

const StyledTable = styled(Table)`
  position: relative;

  tbody tr:nth-last-child(-n + 3) {
    border-bottom: 0;

    & td {
      font-weight: bolder;
      padding: 10px 0;
    }
  }
`;

const ApplicantAssetsTable = ({ isViewOnly = false, applicantsData = [] }) => {
  return (
    <>
      {applicantsData.map(({ name, tableData }, indexOfElement) => (
        <StyledApplicantTableContainer>
          <H2>{name}</H2>

          <StyledTable
            columns={columns}
            data={[
              ...tableData,
              ...getSumUpOfAssetsForTable([applicantsData[indexOfElement]]),
            ]}
            shouldShowHeaders={true}
            className="AssetsHomeScreen"
          />
          {!isViewOnly && (
            <AddAssetOrLiability indexOfElement={indexOfElement} />
          )}
        </StyledApplicantTableContainer>
      ))}

      <AssetsSumUp applicantsData={applicantsData} />
    </>
  );
};

ApplicantAssetsTable.propTypes = {
  isViewOnly: PropTypes.bool,
  applicantsData: PropTypes.array,
};

export default ApplicantAssetsTable;
