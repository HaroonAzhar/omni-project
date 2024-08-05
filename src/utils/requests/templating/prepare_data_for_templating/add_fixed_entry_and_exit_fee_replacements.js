import { currencyFormat } from "utils";

import formatNumber from "./format_number";
import asEntry from "./as_entry";

function addFixedEntryAndExitFeeReplacements({
  data: { application, calculator },
  lists: { replacementList, removeList },
}) {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    replacementList.push(entry);
  };
  addReplacement(
    "arrangementFeePercent",
    application.arrangement_fee_advance_date_percent
  );
  addReplacement(
    "arrangementFeeAmount",
    currencyFormat(calculator.calculatorResponse.arrangement_fee_in_value)
  ); // e.g. "13,814.40"
  addReplacement("exitFeePercent", ""); // Not set in the dip

  if (
    calculator.calculatorResponse.exit_fee_value === undefined ||
    calculator.calculatorResponse.exit_fee_value === 0
  ) {
    removeList.push({
      options: { needle: "exitFeeOnlyRow", element: "table-row" },
    });
  } else {
    addReplacement("exitFeeOnlyRow", "");
  }

  addReplacement(
    "exitFeeAmount",
    currencyFormat(calculator.calculatorResponse.exit_fee_value)
  ); // e.g. "13,814.40"
  addReplacement(
    "arrangementFeeOmniPercent",
    formatNumber(
      application.arrangement_fee_advance_date_percent -
        (application.intermediary_commission_fee_percent ?? 0)
    )
  );
  addReplacement(
    "arrangementFeeOmniAmount",
    currencyFormat(
      calculator.calculatorResponse.arrangement_fee_retained_value ||
        calculator.calculatorResponse.arrangement_fee_in_value -
          (calculator.calculatorResponse.intermediary_commission_fee_value ?? 0)
    )
  );
  addReplacement(
    "arrangementFeeBrokerPercent",
    formatNumber(application.intermediary_commission_fee_percent)
  );

  addReplacement(
    "arrangementFeeBrokerAmount",
    currencyFormat(
      calculator.calculatorResponse.intermediary_commission_fee_value
    )
  );
  addReplacement("exitFeeOmniPercent", ""); // Not set in the dip
  addReplacement(
    "exitFeeOmniAmount",
    currencyFormat(
      calculator.calculatorResponse.exit_fee_retained_value ||
        (calculator.calculatorResponse.exit_fee_value ?? 0) -
          (application.exit_fee_intermediary ?? 0),
      "-"
    )
  );
  addReplacement("exitFeeBrokerPercent", ""); // Not set in the dip
  addReplacement(
    "exitFeeBrokerAmount",
    currencyFormat(application.exit_fee_intermediary)
  );

  addReplacement(
    "arrangementFee",
    currencyFormat(calculator.calculatorResponse.arrangement_fee_in_value)
  );

  const otherFees =
    application.premium_for_lenders_insurance +
    application.completion_administration_fee;
  addReplacement("otherFees", currencyFormat(otherFees));
  addReplacement(
    "insuranceIndemnityFee",
    currencyFormat(application.premium_for_lenders_insurance)
  );
  addReplacement(
    "completionAdministrationFee",
    currencyFormat(application.completion_administration_fee)
  );
}

export default addFixedEntryAndExitFeeReplacements;
