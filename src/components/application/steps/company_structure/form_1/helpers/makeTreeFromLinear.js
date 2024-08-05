const makeTreeFromLinear = (
  entriesDetails,
  entriesStructure,
  key = "main",
  arr = []
) => {
  for (let i = 0; i < entriesStructure[key].length; i += 1) {
    const uuid = entriesStructure[key][i];

    const obj = {
      name: entriesDetails[uuid].name,
      held: entriesDetails[uuid].held,
      isCompany: entriesDetails[uuid].isCompany === "true",
      is_guarantor: entriesDetails[uuid].is_guarantor,
      company_number: entriesDetails[uuid].company_number,
      fk_shared_contact_id: entriesDetails[uuid].fk_shared_contact_id,
    };

    if (obj.isCompany) {
      obj.company = [];

      makeTreeFromLinear(entriesDetails, entriesStructure, uuid, obj.company);
    }

    arr.push(obj);
  }

  return arr;
};

export default makeTreeFromLinear;
