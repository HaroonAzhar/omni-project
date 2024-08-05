import _ from "lodash";

import asEntry from "./as_entry";
import addAboutOfferSectionReplacements from "./facility_letter_replacements/add_about_offer_section_replacements";
import addThePartiesSectionReplacements from "./facility_letter_replacements/add_the_parties_section_replacements";
import addGuarantorsSectionReplacements from "./facility_letter_replacements/add_guarantors_section_replacements";
import addLoanDescriptionSectionReplacements from "./facility_letter_replacements/add_loan_description_section_replacements";
import addLoanTermSectionReplacements from "./facility_letter_replacements/add_loan_term_section_replacements";
import addSecurityPropertySectionReplacements from "./facility_letter_replacements/add_security_property_section_replacements";
import addLegalChargeSectionReplacements from "./facility_letter_replacements/add_legal_charge_section_replacements";
import addLendersSecuritySectionReplacements from "./facility_letter_replacements/add_lenders_security_section_replacements";
import addLoanPurposeSectionReplacements from "./facility_letter_replacements/add_loan_purpose_section_replacements";
import addSolicitorDetailsSectionReplacements from "./facility_letter_replacements/add_solicitor_details_section_replacements";
import addLegalOpinionsSectionReplacements from "./facility_letter_replacements/add_legal_opinions_section_replacements";
import addWitnessesSectionReplacements from "./facility_letter_replacements/add_witnesses_section_replacements";
import addSpecialConditionsSectionReplacements from "./facility_letter_replacements/add_special_conditions_section_replacements";
import addIntermediarySectionReplacements from "./facility_letter_replacements/add_intermediary_section_replacements";

const loanAdvanceTypes = [
  "serviced",
  "retained",
  "rolled_up",
  "partRetainedPartService",
  "partRetainedPartRolled",
  "partRolledPartServiced",
];

function addFacilityLetterReplacements({
  data: { calculator, application, additionalOptions },
  lists: { cloneList, removeList, replacementList },
}) {
  const docxpressoLists = {
    cloneList,
    removeList,
    replacementList,
  };

  const { intermediary_commission_fee_value } = calculator?.calculatorResponse;

  const { date_of_agreement, properties } = application;

  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    replacementList.push(entry);
  };

  const findOrRemove = (list, value) => {
    // We define our needle which corresponds to the needle/placeholder in our Template: '/public/doctemplates/facility_letter.odt'
    const needle = `${value}OnlyPara`;

    if (!_.includes(list, value)) {
      removeList.push({
        options: {
          needle: `{{${needle}}}`,
          element: "paragraph",
        },
      });
    }

    replacementList.push(asEntry(needle, ""));
  };

  // IS DRAFT
  const isDraft = additionalOptions?.isDraft;
  if (!isDraft) {
    removeList.push({
      options: {
        needle: "DRAFT",
        target: "header",
      },
    });
  }

  // AGGREEMENT DATE
  addReplacement("agreementDate", date_of_agreement ?? ""); // Clear the placeholder

  // ABOUT OFFER SECTION
  addAboutOfferSectionReplacements(application, docxpressoLists);

  // THE PARTIES SECTION
  addThePartiesSectionReplacements(application, docxpressoLists);

  // LOAN DESCRIPTION SECTION
  addLoanDescriptionSectionReplacements(
    application,
    loanAdvanceTypes,
    docxpressoLists
  );

  // LOAN TERM SECTION
  addLoanTermSectionReplacements(
    application,
    loanAdvanceTypes,
    docxpressoLists
  );

  // COLLATERAL WARRANTY SECTION
  const collateral_Warranty = additionalOptions?.collateral_warranty;
  addReplacement("collateralWarrantyText", null ?? collateral_Warranty);
  addReplacement("collateralWarrantyOnlyListItem", "");
  if (collateral_Warranty === undefined) {
    removeList.push({
      options: {
        needle: "collateralWarrantyOnlyListItem",
        element: "paragraph",
      },
    });
  }

  // INSURANCE SECTION
  const insurances = additionalOptions?.insurances;
  findOrRemove(insurances, "buildingInsurance");
  findOrRemove(insurances, "publicLiabilityInsurance");
  findOrRemove(insurances, "contractorsAllRisk");

  const [property = {}] = properties ?? [];
  // PURPOSE OF BOROWING SECTION
  addLoanPurposeSectionReplacements(application, property, docxpressoLists);

  // LENDERS SECURITY SECTION
  addLendersSecuritySectionReplacements(application, property, docxpressoLists);

  // LEGAL SECURITY PROPERTY
  addSecurityPropertySectionReplacements(properties, docxpressoLists);

  // LEGAL CHARGE SECTION
  addLegalChargeSectionReplacements(property, docxpressoLists);

  // GUARANTORS SECTION
  addGuarantorsSectionReplacements(application, docxpressoLists);

  // SOLICITORS DETAILS SECTION:
  addSolicitorDetailsSectionReplacements(additionalOptions, docxpressoLists);

  // INTERMEDIARY SECTION
  addIntermediarySectionReplacements(
    application,
    calculator,
    intermediary_commission_fee_value,
    docxpressoLists
  );

  // SPECIAL CONDITIONS SECTION
  addSpecialConditionsSectionReplacements(
    application,
    loanAdvanceTypes,
    docxpressoLists
  );

  // LEGAL OPINIONS SECTION
  addLegalOpinionsSectionReplacements(application, docxpressoLists);

  // WITNESSES SECTION
  addWitnessesSectionReplacements(additionalOptions, docxpressoLists);
}

export default addFacilityLetterReplacements;
