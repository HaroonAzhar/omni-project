import { humanize } from "inflected";

import { capitalize, currencyFormat, percentFormat } from "utils";

import formatNumber from "./format_number";
import asEntry from "./as_entry";

const addCoreAndFinancialDetails = ({
  data: { application, calculator },
  lists: { replacementList, removeList },
}) => {
  const calcs = calculator.calculatorResponse;
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    replacementList.push(entry);
  };

  const borrowers =
    application.type_of_applicant === "individual"
      ? application?.individuals?.map((individual) => ({
          name: `${individual.personal_data.forename} ${individual.personal_data.surname}`,
        }))
      : [{ name: application?.company?.[0]?.base_data.name }];
  // ToDo: Check if the borrower name needs to be the main borrower only or joined names
  const borrowerNameCombined = borrowers?.map((x) => x.name)?.join(", "); // e.g. "CAMAM CAPITAL LIMITED"
  addReplacement("borrowerNameCombined", borrowerNameCombined);

  addReplacement("caseReference", application.case_nr);

  const securityType = application.securities[0].security_type;
  addReplacement("loanType", capitalize(securityType)); // e.g. "Residential"

  addReplacement(
    "propertyType",
    capitalize(application.securities[0].security_type)
  ); // e.g. "Land"
  addReplacement("interestType", humanize(application.type_of_loan));
  addReplacement(
    "servicingMethodRationale",
    application.summary?.loan?.servicing_method_rationale ?? ""
  );

  const chargeLookup = {
    first_charge: "1st (Standard Security)",
    second_charge: "2nd", // ToDo: check what this should be
  };
  addReplacement(
    "chargePriority",
    chargeLookup[application.securities[0].opfl_charge_type]
  ); // e.g. "1st (Standard Security)"
  addReplacement("loanTerm", `${application.loan_term}`);
  addReplacement("buildTerm", application.build_period);
  addReplacement(
    "interestRate",
    percentFormat(application.interest_rate / 100)
  );
  // percentFormat(value / 100)}
  addReplacement(
    "expectedExit",
    application.repayment_method &&
      `${humanize(application.repayment_method)} ${
        application.repayment_method_details || ""
      }`
  );
  addReplacement("expectedIRR", `${(calcs.xirr * 100.0).toFixed(2)}%`);
  addReplacement(
    "initialNetLoan",
    currencyFormat(calcs.net_amount_of_first_advance)
  ); // ToDo: Add formatting

  if (
    application?.purchase_price === undefined ||
    application?.purchase_price === 0
  ) {
    removeList.push({
      options: { needle: "purchasePrice", element: "table-row" },
    });
  } else {
    addReplacement(
      `purchasePrice`,
      currencyFormat(application?.purchase_price)
    );
  }

  const {
    drawdowns,
    advanced_interest,
    total_loan_facility,
    total_interest,
    gross_amount_at_maturity,
    total_loan_facility_excluding_interest,
    title_insurance,
  } = calcs;
  const drawdownsInterestTotal =
    drawdowns &&
    drawdowns.reduce((acc, drawdown) => acc + drawdown.interest, 0);

  const rolledUpTotalInterest =
    total_interest || drawdownsInterestTotal || advanced_interest;
  const rolledUpGrossFacilityInclInterest =
    gross_amount_at_maturity || total_loan_facility + rolledUpTotalInterest;

  addReplacement("totalInterest", currencyFormat(rolledUpTotalInterest));

  addReplacement("totalLoanFacility", currencyFormat(total_loan_facility));

  addReplacement(
    "furtherDrawdownTotal",
    currencyFormat(application?.further_draw_downs)
  );

  if (title_insurance === undefined) {
    removeList.push({
      options: { needle: "titleInsuranceRowOnly", element: "table-row" },
    });
  } else {
    addReplacement(`titleInsurance`, currencyFormat(title_insurance));
  }
  addReplacement(
    "servicedInterestPCM",
    currencyFormat(calculator.calculatorResponse.advanced_interest)
  );
  addReplacement(
    "servicedInterestTotal",
    formatNumber(calculator.calculatorResponse.serviced_interest_total)
  );

  if (application.loan_advance_type === "single") {
    // If there is a further drawdown row variable this section can be removed
    removeList.push({
      options: { needle: "furtherDrawdownRow", element: "table-row" },
    });
  }
  addReplacement(
    "furtherDrawdowns",
    application.further_draw_downs !== 0
      ? formatNumber(application.further_draw_downs)
      : ""
  );
  const totalFacilityExcludingInterest =
    total_loan_facility_excluding_interest ||
    (application.type_of_loan === "retained"
      ? calcs.total_loan_facility - calcs.advanced_interest
      : calcs.total_loan_facility);
  const totalFacilityIncludingInterest =
    gross_amount_at_maturity ||
    (application.type_of_loan === "retained"
      ? calcs.total_loan_facility
      : rolledUpGrossFacilityInclInterest);

  addReplacement("totalFacility", formatNumber(totalFacilityExcludingInterest));
  addReplacement(
    "totalFacilityIncludingInterest",
    formatNumber(totalFacilityIncludingInterest)
  );
  addReplacement(
    "grossFacilityAmountDayOne",
    currencyFormat(calcs.gross_amount_of_first_advance)
  );
  addReplacement(
    "grossLoanFirstAdvance",
    currencyFormat(calcs.gross_loan_first_advance)
  );
  addReplacement("advancedInterest", formatNumber(advanced_interest));
  addReplacement("retainedInterest", currencyFormat(advanced_interest));

  addReplacement(
    "firstChargeAmount",
    application.properties?.map((x) =>
      x.charge.current_mortgage_outstanding === 0
        ? "n/a"
        : formatNumber(x.charge.current_mortgage_outstanding)
    )
  );
  addReplacement(
    "firstChargeLender",
    application.properties?.map((x) =>
      x.charge.current_mortgage_outstanding === 0
        ? ""
        : x.charge.lenders.map((lender) => lender.name).join(", ")
    )
  );
  addReplacement("existingNotices", "n/a"); // ToDo: find if these is something that should be filled in here

  ["rolled_up", "retained", "serviced"].forEach((x) =>
    addReplacement(`${x}OnlyTable`, "")
  );
};

export default addCoreAndFinancialDetails;
