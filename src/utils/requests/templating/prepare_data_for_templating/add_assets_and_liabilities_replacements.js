import { currencyFormat } from "utils";

import formatNumber from "./format_number";
import asEntry from "./as_entry";
import formatAddress from "./format_address";

const addAssetsOrLiabilities = (addReplacement, cloneList) => (
  entries,
  name,
  accessor
) => {
  const rowCell = `${name}Row`;
  const nameCell = `${name}_Name`;
  const valueCell = `${name}_Value`;

  // A&L Assets
  if (entries.length > 1) {
    cloneList.push({
      options: {
        needle: `{{${rowCell}}}`,
        element: "table-row",
        repeat: entries.length - 1,
      },
    });
  }
  if (entries.length > 0) {
    addReplacement(
      nameCell,
      entries.map((a) => [a.type, a.description].join(" "))
    ); // e.g ["Savings in personal names","Shares/Stocks in personal names"]
    addReplacement(
      valueCell,
      entries.map((a) => formatNumber(a[accessor]))
    ); // e.g. ["120,000", "105,000"]);
  } else {
    addReplacement(nameCell, "");
    addReplacement(valueCell, "");
  }
  addReplacement(rowCell, ""); // Remove clone placeholder
};

function addAssetsAndLiabilitiesReplacements({
  data: { application },
  lists: { cloneList, replacementList, removeList },
}) {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    replacementList.push(entry);
  };
  const alAssets = application.individuals.flatMap(
    (individual) => individual.assets
  );

  const liabilities = alAssets.filter((asset) => asset.outstanding_debt > 0);
  const assets = alAssets.filter((asset) => asset.gross_value > 0);

  const alProperties = application.individuals.flatMap(
    (individual) => individual.property_portfolio
  );

  // Total Assets come from the applicants Property Portfolio and Assets
  const totalAssets =
    assets.reduce((acc, a) => acc + a.gross_value, 0) +
    alProperties.reduce((acc, p) => acc + p.estimated_value, 0);
  // Total Liabilities come from the applicants Liabilities
  const totalLiabilities =
    liabilities.reduce((acc, l) => acc + l.outstanding_debt, 0) +
    alProperties.reduce((acc, p) => acc + p.current_debt, 0);

  const uboText =
    application.type_of_applicant === "company"
      ? " (the UBOs share of the values advised below)"
      : "";
  const totalAssetsText = `${formatNumber(totalAssets)}${uboText}`;
  const totalLiabilitiesText = `${formatNumber(totalLiabilities)}${uboText}`;

  addReplacement("totalAssets", totalAssetsText);
  addReplacement("totalLiabilities", totalLiabilitiesText);

  // A&L Properties --------------
  if (alProperties.length === 0) {
    removeList.push({
      options: { needle: "propertyRow", element: "table-row" },
    });
  }
  if (alProperties.length > 1) {
    cloneList.push({
      options: {
        needle: "{{propertyRow}}",
        element: "table-row",
        repeat: alProperties.length - 1,
      },
    });
  }
  addReplacement("ap_Address", alProperties.map(formatAddress));
  addReplacement(
    "ap_Lender",
    alProperties.map((property) => property.name_of_lender || "")
  );
  addReplacement(
    "ap_Value",
    alProperties.map((property) =>
      currencyFormat(property.estimated_value, "-")
    )
  );
  addReplacement(
    "ap_Debt",
    alProperties.map((property) => currencyFormat(property.current_debt, "-"))
  );
  addReplacement(
    "ap_MortgagePayment",
    alProperties.map((property) =>
      currencyFormat(property.monthly_mortgage, "-")
    )
  );
  addReplacement(
    "ap_Rent",
    alProperties.map((property) => currencyFormat(property.monthly_rental, "-"))
  );
  addReplacement("propertyRow", ""); // Remove clone placeholder

  const addUsingReplacements = addAssetsOrLiabilities(
    addReplacement,
    cloneList
  );

  addUsingReplacements(assets, "asset", "gross_value");
  addUsingReplacements(liabilities, "liability", "outstanding_debt");
}

export default addAssetsAndLiabilitiesReplacements;
