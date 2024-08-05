import * as accounting from "accounting";

const formatPrice = (price) => {
  return accounting.formatMoney(price, "£", 2, ",", ".");
};

export const Fields = [
  {
    name: "security_address",
    label: "Security Address",
    style: "tableColSmall",
    data_key: {
      securities: [
        "security_address_line1",
        "security_address_line2",
        "security_town_city",
        "security_postcode",
        "security_country",
      ],
    },
    decorate: (value) => {
      return value;
    },
  },
  {
    name: "loan_description",
    label: "Loan Description",
    data_key: ["loan_advance_type", "type_of_loan"],
    translations: {
      retained: "Retained",
      serviced: "Fully Serviced",
      rolled_up: "Fully Rolled Up",
      multiple: "Multiple",
      single: "Single",
    },
    content: () => {
      return "<%=0%> Advance <%=1%> Interest Loan";
    },
  },
  {
    name: "loan_purpose",
    label: "Loan Purpose",
    left: true,
    data_key: "loan_purpose",
    translations: {
      purchase: "Purchase",
      refinance: "Refinance",
      capital_raising: "Capital raising",
    },
    css: {
      tableRow: {
        backgroundColor: "#FBFBFA",
      },
    },
  },
  {
    name: "purchase_price",
    label: "Purchase Price",
    data_key: "purchase_price",
    decorate: (value) => {
      return formatPrice(value);
    },
    css: {
      tableRow: {
        backgroundColor: "#FBFBFA",
      },
    },
    right: true,
  },
  {
    name: "security_type",
    label: "Security Type",
    data_key: {
      securities: ["security_type"],
    },
    translations: {
      residential: "Residential",
      commercial: "Commercial",
      land: "Land",
      semi_commercial: "Semi commercial",
      development: "Development",
    }, // security_type
    left: true,
  },
  {
    name: "market_value",
    label: "Market Value",
    data_key: "market_value",
    decorate: (value) => {
      return formatPrice(value);
    },
    right: true,
  },
  {
    name: "opfl_charge",
    label: "OPFL Charge",
    data_key: {
      securities: ["OpflType"],
    },
    translations: {
      first_charge: "First Charge",
      second_charge: "Second Charge",
    },
    css: {
      tableRow: {
        backgroundColor: "#FBFBFA",
      },
    },
    left: true,
  },
  {
    name: "term_of_the_loan",
    label: "Term of the Loan",
    data_key: "loan_term",
    right: true,
    decorate: (value) => {
      return `${value} Months`;
    },
    css: {
      tableRow: {
        backgroundColor: "#FBFBFA",
      },
    },
  },
  {
    name: "interest_rate", // interest_rate
    label: "Interest Rate",
    description: "(per month)",
    data_key: ["interest_rate"],
    content: () => {
      return "<%=0%>";
    },
    decorate: (value) => {
      const number = parseFloat(value);
      return `${number.toFixed(2)}%`;
    },
    left: true,
  },
  {
    name: "estimate_interest",
    label: "Estimated Interest",
    description: "(LTV Day 1)",
    data_key: {
      calculatorResponse: ["advanced_interest"],
    },
    decorate: (value, data) => {
      let price = formatPrice(value);
      if (
        data.type_of_loan === "rolled_up" &&
        data.loan_advance_type !== "single"
      ) {
        price = "TBC";
      }

      return price;
    },
    right: true,
  },
  {
    name: "initial_net_loan",
    label: "Initial Net Loan",
    data_key: {
      calculatorResponse: ["net_amount_of_first_advance"],
    },
    decorate: (value) => {
      return formatPrice(value);
    },
    css: {
      tableRow: {
        backgroundColor: "#FBFBFA",
      },
    },
    left: true,
  },
  {
    name: "total_loan_facility",
    label: "Total Loan Facility",
    data_key: {
      calculatorResponse: ["total_loan_facility"],
    },
    decorate: (value) => {
      return formatPrice(value);
    },
    css: {
      tableRowHead: {
        paddingRight: 0,
      },
      tableRow: {
        backgroundColor: "#FBFBFA",
      },
    },
    right: true,
  },
  {
    name: "further_drawdowns",
    label: "Further \n Drawdowns",
    data_key: "further_draw_downs", // further_drawdowns
    left: true,
    decorate: (value) => {
      return formatPrice(value);
    },
  },
  {
    name: "build_period",
    label: "Build Period",
    data_key: "build_period",
    decorate: (value) => {
      const result = value ? `${value} Months` : "";
      return result;
    }, // build_period
    right: true,
  },
];

export const CaseReference = [
  {
    name: "case_nr",
    label: "Case Reference",
    style: "tableColSmall",
    data_key: "CaseNr",
    css: {
      container: {
        borderTopWidth: 1,
        borderColor: "#75787B",
      },
    },
  },
];

export const BorrowerNameCompany = [
  {
    name: "borrower_name",
    label: "Borrower Name",
    data_key: "company_name",
    style: "tableColSmall",
  },
];

export const BorrowerNameIndividual = [
  {
    name: "borrower_name",
    label: "Borrower Name",
    data_key: {
      applicants: ["name"],
    },
    style: "tableColSmall",
  },
];

export const OtherImportantFields = [
  {
    name: "max_ltv_day_one",
    label: "Max LTV",
    data_key: ["max_ltv_day_one"],
    content: () => {
      return "<%=0%>";
    },
    decorate: (value) => {
      return `Maximum LTV Day One is ${Math.round(
        parseFloat(value)
      ).toFixed()}%`;
    },
  },
  {
    name: "ltv_to_gdv",
    label: "LTV to GDV",
    data_key: ["max_ltv_day_one", "ltv_to_gdv"],
    content: () => {
      return "<%=0%><%=1$>";
    },
    decorate: (value, data) => {
      return (
        // eslint-disable-next-line max-len
        `Maximum LTV Day One is ${Math.round(
          parseFloat(data.max_ltv_day_one)
        ).toFixed()}% and the Maximum LTGDV (including fees & interest) is ${Math.round(
          parseFloat(data.ltv_to_gdv)
        ).toFixed()}%`
      );
    },
  },
];

export const FeeFields = [
  {
    name: "arrangement_fee",
    label: "Arrangement Fee (Total)",
    description: "(Deducted from first advance)",
    left: true,
    decorate: (value) => {
      return formatPrice(value);
    },
    data_key: {
      calculatorResponse: ["arrangement_fee_in_value"],
    },
    css: {
      tableRowHead: {
        maxWidth: "55%",
        paddingRight: 0,
        borderTopWidth: 1,
        borderColor: "#75787B",
      },
      tableRow: {
        maxWidth: "35%",
        borderTopWidth: 1,
        borderColor: "#75787B",
        backgroundColor: "#FBFBFA",
      },
    },
  },
  {
    name: "intermediary_commission_fee_value",
    label: "Arrangement Fee (Intermediary)",
    description:
      "(Paid by the lender upon \n completion of the loan \n from the Arrangement fee)",
    data_key: {
      calculatorResponse: ["intermediary_commission_fee_value"],
    },
    style: "tableRowHeadBig",
    decorate: (value) => {
      return formatPrice(value);
    },
    css: {
      tableRowHead: {
        borderTopWidth: 1,
        borderColor: "#75787B",
      },
      tableRow: {
        borderTopWidth: 1,
        borderColor: "#75787B",
        backgroundColor: "#FBFBFA",
        borderRightWidth: 1,
        maxWidth: "36.8%",
      },
    },
    right: true,
  },
  {
    name: "completion_administration_fee",
    label: "Completion Administration Fee",
    style: "tableRowHeadBig",
    description: "(Deducted from first advance)",
    data_key: "completion_administration_fee",
    left: true,
    decorate: (value) => {
      return formatPrice(value);
    },
    css: {
      tableRowHead: {
        maxWidth: "55%",
        paddingRight: 0,
      },
      tableRow: {
        maxWidth: "35%",
      },
    },
  },
  {
    name: "lenders_contigency_insurance",
    label: "Lender's Insurance Fee",
    style: "tableRowHeadBig",
    description: "(Deducted from first \n advance)",
    data_key: "premium_for_lenders_insurance",
    right: true,
    decorate: (value) => {
      return formatPrice(value);
    },
    css: {
      tableRow: {
        borderColor: "#75787B",
        borderRightWidth: 1,
        width: "36.8%",
      },
    },
  },
  {
    name: "exit_fee", // exit_fee
    label: "Exit Fee (Total)",
    style: "tableRowHeadBig",
    description: "(Payable on the day \n of repayment)",
    data_key: "arrangement_fee_repayment_date",
    left: true,
    defaultValue: 0,
    decorate: (value) => {
      return formatPrice(value);
    },
    css: {
      tableRowHead: {
        maxWidth: "55%",
        paddingRight: 0,
      },
      tableRow: {
        maxWidth: "35%",
        backgroundColor: "#FBFBFA",
      },
    },
  },
  {
    name: "exit_fee_intermediary", // exit_fee
    label: "Exit Fee (Intermediary)",
    style: "tableRowHeadBig",
    description: "(Payable on the day \n of repayment)",
    data_key: "exit_fee_intermediary",
    right: true,
    defaultValue: 0,
    decorate: (value) => {
      return formatPrice(value);
    },
    css: {
      tableRowHead: {
        paddingRight: 0,
      },
      tableRow: {
        maxWidth: "36.8%",
        backgroundColor: "#FBFBFA",
      },
    },
  },
  {
    name: "opl_legal_fees",
    label: "Lender's Legal Fee",
    style: "tableRowHeadBig",
    description: "(Paid by borrower direct \n to solicitor)",
    data_key: "legal_fee",
    left: true,
    defaultValue: "TBC",
    css: {
      tableRowHead: {
        maxWidth: "55%",
        paddingRight: 0,
      },
      tableRow: {
        maxWidth: "35%",
        backgroundColor: "#FBFBFA",
      },
    },
  },
  {
    name: "valuation_fee", // Valuation fee
    label: "Valuation Fee",
    style: "tableRowHeadBig",
    description: "(Paid by borrower direct to \n valuer)",
    data_key: "valuation_fee",
    defaultValue: "TBC",
    right: true,
    css: {
      tableRow: {
        borderColor: "#75787B",
        borderRightWidth: 1,
        width: "36.8%",
      },
    },
  },
];
