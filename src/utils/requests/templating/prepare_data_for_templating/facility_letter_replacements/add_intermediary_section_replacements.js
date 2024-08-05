import { currencyFormat } from "utils";

import asEntry from "../as_entry";

const addIntermediarySectionReplacements = (
  application,
  calculator,
  intermediaryComissionFeeValue,
  lists
) => {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    lists.replacementList.push(entry);
  };

  const brokerAddress = [
    application?.introducer_details?.address_line_1,
    application?.introducer_details?.address_line_2,
    application?.introducer_details?.city,
    application?.introducer_details?.postcode,
  ]
    .filter(Boolean)
    .join(", ");

  if (application?.type_of_introducer !== "via_broker") {
    lists.removeList.push({
      options: { needle: "brokerOnlyRow", element: "table-row" },
    });
    lists.removeList.push({
      options: { needle: "brokerOnlyListItem", element: "paragraph" },
    });
  } else {
    addReplacement("brokerOnlyRow", ""); // Clear the placeholder
    addReplacement("broker", application?.broker_company_name); // e.g. "Mountview Capital Limited"
    addReplacement("brokerAddress", brokerAddress); // e.g. "Mountview Capital Limited"
    addReplacement("brokerFeeOnlyPara", ""); // Clear the placeholder
    addReplacement("brokerFee", currencyFormat(intermediaryComissionFeeValue)); // e.g. "Mountview Capital Limited"
    addReplacement("brokerExitFeeOnlyPara", ""); // Clear the placeholder
    addReplacement(
      "brokerExitFee",
      currencyFormat(application?.exit_fee_intermediary)
    ); //
    addReplacement("brokerOnlyListItem", ""); // Clear the placeholder
  }
};

export default addIntermediarySectionReplacements;
