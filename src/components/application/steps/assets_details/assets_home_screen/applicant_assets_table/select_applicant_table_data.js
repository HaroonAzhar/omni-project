import React from "react";
import { createSelector } from "reselect";

import PropertyRowContextMenu from "./property_row_context_menu";
import AssetLiabilityRowContextMenu from "./asset_liability_row_context_menu";

const getIndividuals = (state) => state.application.individuals;

const getAddress = ({ address_line_1, address_line_2, city }) => {
  return [address_line_1, address_line_2, city].filter(Boolean).join(", ");
};

const getTableDataForApplicant = (isViewOnly) => (
  { personal_data, assets = [], liabilities = [], property_portfolio = [] },
  indexOfElement
) => {
  const assetsData = [...assets, ...liabilities].map((asset, indexOfAsset) => ({
    type: asset.type,
    description: asset.description,
    gross_value: asset.gross_value,
    outstanding_debt: asset.outstanding_debt,
    net_value:
      (Number(asset.gross_value) || 0) - (Number(asset.outstanding_debt) || 0),
    _buttons: !isViewOnly && (
      <AssetLiabilityRowContextMenu
        indexOfElement={indexOfElement}
        indexOfAsset={indexOfAsset}
        asset={asset}
      />
    ),
  }));

  const propertiesData = property_portfolio.map(
    (property, indexOfProperty) => ({
      type: "property",
      description: getAddress(property),
      gross_value: property.estimated_value,
      outstanding_debt: property.current_debt,
      net_value:
        (Number(property.estimated_value) || 0) -
        (Number(property.current_debt) || 0),
      monthly_mortgage: property.monthly_mortgage,
      monthly_rental: property.monthly_rental,
      _buttons: !isViewOnly && (
        <PropertyRowContextMenu
          indexOfElement={indexOfElement}
          indexOfProperty={indexOfProperty}
        />
      ),
    })
  );

  return {
    name: `${personal_data?.forename} ${personal_data?.surname}`,
    applicant_id: personal_data?.applicant_id,
    tableData: [...assetsData, ...propertiesData],
  };
};

export const assetsDataMapReadOnly = getTableDataForApplicant(true);
export const assetsDataMapModifiable = getTableDataForApplicant(false);

export default createSelector([getIndividuals], (individuals = []) => {
  const applicantsTableData = individuals.map(assetsDataMapModifiable);

  return applicantsTableData;
});
