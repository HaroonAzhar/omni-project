import {
  getBorrowerProfileOfBorrower,
  getClientMeetingAttendeesOfBorrower,
  getClientMeetingDateOfBorrower,
  getClientMeetingNotesOfBorrower,
} from "components/case_summary/selectors";
import { dateFormat } from "utils";

import asBlockCaseSummary from "./as_block_case_summary";
import asEntry from "./as_entry";

const addBorrowerSectionReplacements = ({
  data: { application },
  lists: { replacementList },
}) => {
  // Borrower Section
  replacementList.push(
    asBlockCaseSummary(
      "borrowerProfile",
      getBorrowerProfileOfBorrower({ application })
    )
  );
  replacementList.push(
    asEntry(
      "clientMeetingDate",
      dateFormat(getClientMeetingDateOfBorrower({ application }))
    )
  );
  replacementList.push(
    asBlockCaseSummary(
      "clientMeetingAttendees",
      getClientMeetingAttendeesOfBorrower({ application })
    )
  );
  replacementList.push(
    asBlockCaseSummary(
      "clientMeetingNotes",
      getClientMeetingNotesOfBorrower({ application })
    )
  );
};

export default addBorrowerSectionReplacements;
