import asEntry from "./as_entry";

const addBrokerReplacements = ({
  data: { application },
  lists: { replacementList, removeList },
}) => {
  const addReplacement = (name, value) => {
    const entry = asEntry(name, value);
    replacementList.push(entry);
  };
  // Broker details
  if (application.type_of_introducer !== "via_broker") {
    removeList.push({
      options: { needle: "brokerRow", element: "table-row" },
    });
  }
  addReplacement("brokerRow", ""); // Clear the placeholder
  addReplacement("brokerCompanyName", application.broker_company_name); // e.g. "Mountview Capital Limited"
};

export default addBrokerReplacements;
