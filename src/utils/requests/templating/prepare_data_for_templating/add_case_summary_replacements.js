import {
  getAnalysisOfPropertyFromSecurity,
  getDescriptionOfPropertyFromSecurity,
  getDescriptionOfWorksFromSecurity,
  getExecutiveSummaryOfOverview,
  getExitStrategyOfFurtherComments,
  getOngoingMonitoringOfFurtherComments,
  getSpecialConditionsOfFurtherComments,
  getStartCaseSummaryDateOfOverview,
  getUnderwriterRationaleOfRiskAndMitigation,
} from "components/case_summary/selectors";
import { dateFormat } from "utils";

import asBlockCaseSummary from "./as_block_case_summary";
import asEntry from "./as_entry";

function addCaseSummaryReplacements({
  data: { application },
  lists: { replacementList },
}) {
  // Add the Case Summary replacements
  // Note that rich text content needs to be output with block-type set so that it uses the formatting in the resulting document
  const addBlockReplacement = (name, value) => {
    replacementList.push(asBlockCaseSummary(name, value));
  };

  const executiveSummary = getExecutiveSummaryOfOverview({ application });
  const startCaseSummaryDate = getStartCaseSummaryDateOfOverview({
    application,
  });
  const underwriterRationale = getUnderwriterRationaleOfRiskAndMitigation({
    application,
  });

  const ongoingMonitoring = getOngoingMonitoringOfFurtherComments({
    application,
  });
  const specialConditions = getSpecialConditionsOfFurtherComments({
    application,
  });
  const exitStrategy = getExitStrategyOfFurtherComments({ application });

  const descriptionOfWorks = getDescriptionOfWorksFromSecurity({ application });
  const descriptionOfProperty = getDescriptionOfPropertyFromSecurity({
    application,
  });
  const analysisOfProperty = getAnalysisOfPropertyFromSecurity({ application });

  addBlockReplacement("underwriterRationale", underwriterRationale);
  addBlockReplacement("ongoingMonitoring", ongoingMonitoring);
  addBlockReplacement("specialConditions", specialConditions);
  addBlockReplacement("exitStrategy", exitStrategy);
  addBlockReplacement("descriptionOfWorks", descriptionOfWorks);
  addBlockReplacement(
    "s_Description",
    descriptionOfProperty // N.B. This part of case summary is going to have to change to have an entry per property
  );
  addBlockReplacement("s_analysisOfProperty", analysisOfProperty); // ToDo: This will need to change to per-security
  addBlockReplacement("executiveSummary", executiveSummary);
  replacementList.push(
    asEntry("writeUpDate", dateFormat(startCaseSummaryDate))
  );

  replacementList.push(asEntry("underwriter", application.underwriter?.Name));
}

export default addCaseSummaryReplacements;
