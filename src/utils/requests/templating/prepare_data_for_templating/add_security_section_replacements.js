import { currencyFormat, percentFormat } from "utils";

import addValuationReportReplacements from "./add_valuation_report_replacements";
import asEntry from "./as_entry";
import { numberedEntries } from "./helpers";

const formatThirdPartyDescription = (property = {}) => {
  const { charge = {} } = property;
  if (charge.security_owner === "applicant") {
    return "n/a";
  }
  const owner = [
    charge.security_owner_title,
    charge.security_owner_forename,
    charge.security_owner_middle_name,
    charge.security_owner_surname,
  ]
    .filter(Boolean)
    .join(" ");
  return `Owned by ${owner}`;
};

const numberedEntriesWithTotal = (entries) => {
  const totalValue = entries?.reduce((acc, entry) => acc + (entry ?? 0), 0);
  const totalText =
    entries?.length > 1 ? `\nTotal: ${currencyFormat(totalValue)}` : "";
  return (
    numberedEntries(
      entries?.map((val) => (val === undefined ? "" : currencyFormat(val)))
    ) + totalText
  );
};

function addSecuritySectionReplacements({
  data: { application, calculator },
  lists: { cloneList, removeList, replacementList },
}) {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    replacementList.push(entry);
  };
  if (application.securities.length > 1) {
    // Set up copies for table or row based cloning
    cloneList.push({
      options: {
        needle: "{{securityTable}}",
        element: "table",
        repeat: application.securities.length - 1,
      },
    });
    cloneList.push({
      options: {
        needle: "{{securityRow}}",
        element: "table-row",
        repeat: application.securities.length - 1,
      },
    });
  }

  const securityAddressStrings = application.securities.map((s) =>
    [
      s.security_address_line_1,
      s.security_address_line_2,
      s.security_town_city,
      s.security_postcode,
    ]
      .filter(Boolean)
      .join(", ")
  );
  addReplacement("s_Address", numberedEntries(securityAddressStrings));
  addReplacement(
    "s_titleNumber",
    numberedEntries(
      application.properties?.map((p) => p.title_numbers?.join(", "))
    )
  ); // e.g. ["MID213303"]
  addReplacement(
    "s_thirdPartyLegalCharge",
    numberedEntries(
      application.properties?.map((x) =>
        x.charge.security_owner === "applicant" ? "N" : "Y"
      )
    )
  );

  addReplacement(
    "s_thirdPartyLegalChargeDescription",
    numberedEntries(application.properties?.map(formatThirdPartyDescription))
  );
  addReplacement(
    "s_purchasePrice",
    numberedEntriesWithTotal(
      application.properties?.map(
        (property) => property.details?.purchase_price
      ) ?? Array.from(application.securities, () => undefined)
    )
  ); //  e.g. ["1,648,000"]
  addReplacement("s_purchaseDate", ""); // not captured - e.g. ["19/11/2019"]

  // We have a Gross LTV value but only for a single property - so will set to "n/a" unless there is a single property
  const s_grossLTV = percentFormat(
    calculator.calculatorResponse.gross_day_one_ltv
  );
  addReplacement("s_grossLTV", s_grossLTV);
  addReplacement(
    "s_openMarketValue",
    numberedEntriesWithTotal(
      application.securities?.map((x) => x.security_initial_estimation)
    )
  );
  // We have an open market Gross LTV value but only for a single property - will set to "n/a" unless there is a single property
  addReplacement(
    "s_openMarketGLTV",
    percentFormat(calculator.calculatorResponse.gross_day_one_ltv)
  ); // e.g. "17.41"

  addReplacement(
    "s_90DayValue",
    numberedEntriesWithTotal(
      application.securities.map((x) => x.current_estimated_90_day_market_value)
    )
  );
  const total_initial_estimation = application.securities.reduce(
    (acc, security) => acc + (security.security_initial_estimation ?? 0),
    0
  );
  const total_current_estimated_90_day_market_value = application.securities.reduce(
    (acc, security) =>
      acc + (security.current_estimated_90_day_market_value ?? 0),
    0
  );
  // If there is a single property we can get the percentage by multiplying the gross day one ltv percentage by current value over the 90 day value
  const s_90DayGLTV =
    total_current_estimated_90_day_market_value !== 0
      ? percentFormat(
          calculator.calculatorResponse.gross_day_one_ltv *
            (total_initial_estimation /
              total_current_estimated_90_day_market_value)
        )
      : undefined;
  addReplacement("s_90DayGLTV", s_90DayGLTV); // e.g. "23.02"
  addReplacement(
    "s_GDV",
    numberedEntriesWithTotal(application.securities.map((x) => x.gdv))
  );
  // LTGDV only works with a single address so set to "n/a" if multiple properties
  const s_LTGDV = percentFormat(calculator.calculatorResponse.gdltv);
  addReplacement("s_LTGDV", s_LTGDV);

  addValuationReportReplacements({
    data: { application },
    lists: { removeList, replacementList },
  });
  addReplacement("securityAddress", securityAddressStrings.join("\n"));

  // Remove security placeholders
  addReplacement("securityTable", "");
  addReplacement("securityRow", "");
}

export default addSecuritySectionReplacements;
