import { v4 as uuidv4 } from "uuid";

const makeLinearFromTree = (
  tree,
  key = "main",
  entriesDetails = {},
  entriesStructure = {}
) => {
  // eslint-disable-next-line no-param-reassign
  entriesStructure[key] = [];

  if (!tree) {
    return;
  }

  for (const item of tree) {
    const uuid = uuidv4();
    entriesStructure[key].push(uuid);

    // eslint-disable-next-line no-param-reassign
    entriesDetails[uuid] = {
      name: item.name,
      held: item.held,
      is_guarantor: item.is_guarantor,
      isCompany: item.isCompany ? "true" : "false",
      links: item.links,
      company_number: item.company_number,
      fk_shared_contact_id: item.fk_shared_contact_id,
    };

    makeLinearFromTree(item.company, uuid, entriesDetails, entriesStructure);
  }

  return [entriesDetails, entriesStructure];
};

export default makeLinearFromTree;
