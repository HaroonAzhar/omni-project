import asEntry from "./as_entry";

function addCreditCommitteeAndPostCreditCommitteeReplacements({
  lists: { replacementList },
}) {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    replacementList.push(entry);
  };
  addReplacement("creditCommitteeRationale", ""); // ToDo: See if there's something to fill in here or whether this needs to be filled in manually currently
  addReplacement("ccDeclined", ""); // ToDo: See if there's something to use here or whether this needs to be filled in manually currently
  addReplacement("ccApproved", ""); // ToDo: See if there's something to use here or whether this needs to be filled in manually currently
  addReplacement("creditCommitteeName", ""); // ToDo: See if there's something to fill in here or whether this needs to be filled in manually currently
  addReplacement("creditCommitteeSignatureDate", ""); // ToDo: See if there's something to fill in here or whether this needs to be filled in manually currently
  addReplacement("creditCommitteeMeetingDate", ""); // ToDo: See if there's something to fill in here or whether this needs to be filled in manually currently

  // Post Credit committee - currently we do not capture this so all values will need to be left blank for manually filling in
  addReplacement("postCreditCommitteeUpdateDescription", "");
  addReplacement("postCreditCommitteeName", "");
  addReplacement("postCreditCommitteeSignatureDate", "");
  addReplacement("postCreditCommitteeUpdateDate", "");
}

export default addCreditCommitteeAndPostCreditCommitteeReplacements;
