// Docxpresso templating - including loading templates to base 64, getting an access token and running a conversion
// Note that while DX supports PDF output we tend to want to allow minor changes currently and besides PDF output causes problems with our choice of font
import addSecuritySectionReplacements from "./add_security_section_replacements";
import addAssetsAndLiabilitiesReplacements from "./add_assets_and_liabilities_replacements";
import addCompanyReplacements from "./add_company_replacements";
import addRiskReplacements from "./add_risk_replacements";
import addFixedEntryAndExitFeeReplacements from "./add_fixed_entry_and_exit_fee_replacements";
import addCaseSummaryReplacements from "./add_case_summary_replacements";
import addCreditCommitteeAndPostCreditCommitteeReplacements from "./add_credit_committee_and_post_credit_committee_replacements";
import addBuildingWorksReplacements from "./add_building_works_replacements";
import addBrokerReplacements from "./add_broker_replacements";
import addCoreAndFinancialDetails from "./add_core_and_financial_details";
import addBorrowerSectionReplacements from "./add_borrower_section_replacements";
import addDocumentGeneratingReplacements from "./add_document_generating_replacements";
import getMainRemoveList from "./get_main_remove_list";
import addCompletedReplacements from "./add_completed_replacements";
import addAdditionalTransactionsReplacements from "./add_additional_transactions_replacements";
import addFacilityLetterReplacements from "./add_facility_letter_replacements";

const prepareDataForTemplating = (data) => {
  const { application } = data;
  // Set up the request to do all the replacements
  const removeList = getMainRemoveList(application);
  const cloneList = [];
  const replaceVars = [];

  const lists = { cloneList, replacementList: replaceVars, removeList };
  addSecuritySectionReplacements({ data, lists });
  addAssetsAndLiabilitiesReplacements({ data, lists });
  addRiskReplacements({ data, lists });
  addCompanyReplacements({ data, lists });

  addBrokerReplacements({ data, lists });

  addCoreAndFinancialDetails({ data, lists });
  addFixedEntryAndExitFeeReplacements({ data, lists });

  addBorrowerSectionReplacements({ data, lists });
  addCaseSummaryReplacements({ data, lists });
  addCreditCommitteeAndPostCreditCommitteeReplacements({ data, lists });
  addBuildingWorksReplacements({ data, lists });
  addDocumentGeneratingReplacements({ data, lists });
  addCompletedReplacements({ data, lists });
  addAdditionalTransactionsReplacements({ data, lists });

  addFacilityLetterReplacements({ data, lists });
  return { removeList, replaceVars, cloneList };
};

export default prepareDataForTemplating;
