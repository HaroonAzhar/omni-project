import moment from "moment";

import asEntry from "./as_entry";

const addDocumentGeneratingReplacements = ({ lists: { replacementList } }) => {
  replacementList.push(asEntry("annexNumber", [1, 2, 3, 4, 5])); // Used to ensure if an annex is removed that the numbering is sequential

  replacementList.push({
    ...asEntry("generationDate", moment(Date.now()).format("DD MMMM YYYY")),
    target: "footer",
  }); // e.g. "11 September 2020"
};

export default addDocumentGeneratingReplacements;
