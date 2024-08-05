import { createSelector } from "reselect";

const getCaseNr = ({ case: caseData }) => caseData.CaseNr;
const getApplicants = ({ dip }) => dip.applicants;

export default createSelector(
  [getCaseNr, getApplicants],
  (case_nr, applicants = []) => {
    if (case_nr) return case_nr;
    return applicants[0] && applicants[0].Name;
  }
);
