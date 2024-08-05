import moment from "moment";

import { dateFormat } from "utils";

import asEntry from "./as_entry";
import formatNumber from "./format_number";

// Add Building Works substitutions - these might need to be manually filled in. At the moment it's planned as a single section not a repeating section
function addBuildingWorksReplacements({
  data: { application },
  lists: { replacementList },
}) {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    replacementList.push(entry);
  };
  const [property = {}] = application.properties ?? []; // Data from the first valuation report.
  const { valuation_report = {} } = property;

  const buildCompletionDate =
    valuation_report.commencement_date_of_works &&
    valuation_report.build_duration &&
    moment(valuation_report.commencement_date_of_works)
      .add(valuation_report.build_duration, "M")
      .toDate();

  addReplacement("buildTime", valuation_report.build_duration);
  addReplacement("buildCostPercentFunded", ""); // ToDo: See if there's something to fill in here or whether this needs to be filled in manually currently
  addReplacement("buildCostTotal", formatNumber(valuation_report.build_costs));
  addReplacement(
    "buildCostPerSqFt",
    formatNumber(valuation_report.build_costs_per_square_foot)
  );
  addReplacement(
    "buildStart",
    dateFormat(valuation_report.commencement_date_of_works)
  );
  addReplacement("buildCompletionDate", dateFormat(buildCompletionDate));
  addReplacement("buildStrategy", ""); // ToDo: See if there's something to fill in here or whether this needs to be filled in manually currently
  addReplacement("buildContractor", valuation_report.contractor);
  addReplacement("buildPM", valuation_report.project_manager);
  addReplacement("buildArchitects", valuation_report.architect);
  addReplacement(
    "buildStructuralEngineer",
    valuation_report.structural_engineer
  );
  addReplacement(
    "buildOtherSubcontractors",
    valuation_report.other_relevant_subcontractors
  );
  addReplacement(
    "buildOmniExperience",
    valuation_report.omni_experience_with_the_professional_team
  );
  addReplacement("buildQSPMSSummary", "");
}

export default addBuildingWorksReplacements;
