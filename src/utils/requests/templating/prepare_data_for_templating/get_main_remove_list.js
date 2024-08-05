const asEntry = (needle, element) => {
  return {
    options: {
      needle: `{{${needle}}}`,
      element,
    },
  };
};
const asTableEntry = (needle) => asEntry(needle, "table");
const asRowEntry = (needle) => asEntry(needle, "table-row");

function getMainRemoveList(application) {
  const removeList = [];
  const addRemoves = (name) => {
    removeList.push(asTableEntry(`${name}OnlyTable`));
    removeList.push(asRowEntry(`${name}OnlyRow`));
  };

  ["rolled_up", "retained", "serviced"]
    .filter((x) => x !== application.type_of_loan)
    .forEach((x) => addRemoves(x));

  return removeList;
}

export default getMainRemoveList;
