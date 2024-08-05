import { humanize } from "inflected";

import { currencyFormat } from "utils";

const initialReduceAccumulator = {
  properties: [],
  otherAssets: [],
  liabilities: [],
  totalValueOfAssets: 0,
  totalValueOfLiabilities: 0,
};

const getProperties = (property) => ({
  address: `${property.address_line_1 || "(No address line 1 specified)"} ${
    property.address_line_2
  } ${property.city}`,
  lender_name: property.name_of_lender || "N/A",
  estimated_value: currencyFormat(property.estimated_value) || "N/A",
  current_debt: currencyFormat(property.current_debt) || "N/A",
  mortgage: currencyFormat(property.monthly_mortgage) || "N/A",
  rental: currencyFormat(property.monthly_rental) || "N/A",
});

const getOtherAssets = (asset) => ({
  name: humanize(asset.type) || "N/A",
  price: currencyFormat(asset.net_value) || "N/A",
});

const getLiabilities = (liability) => ({
  name: humanize(liability.description) || "N/A",
  price: currencyFormat(liability.net_value) || "N/A",
});

export default (individualResults) =>
  individualResults.reduce(
    (acc, { property_portfolio = [], assets, liabilities }) => {
      const properties = property_portfolio.map(getProperties);
      const otherAssets = assets.map(getOtherAssets);
      const liabilitiesData = liabilities.map(getLiabilities);

      const totalValueOfAssets = assets.reduce(
        (summedValue, { net_value }) => summedValue + net_value,
        0
      );
      const totalValueOfLiabilities = liabilities.reduce(
        (summedValue, { net_value }) => summedValue + net_value,
        0
      );

      return {
        properties: [...acc.properties, ...properties],
        otherAssets: [...acc.otherAssets, ...otherAssets],
        liabilities: [...acc.liabilities, ...liabilitiesData],
        totalValueOfAssets: acc.totalValueOfAssets + totalValueOfAssets,
        totalValueOfLiabilities:
          acc.totalValueOfLiabilities + totalValueOfLiabilities,
      };
    },
    initialReduceAccumulator
  );
