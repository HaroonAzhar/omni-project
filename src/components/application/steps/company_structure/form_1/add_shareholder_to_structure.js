import { v4 as uuidv4 } from "uuid";

const addShareholderToStructure = (
  sharedHoldersStructure,
  currentView,
  setSharedHoldersStructure
) => {
  const copied = { ...sharedHoldersStructure };
  const id = uuidv4();

  copied[currentView].push(id);
  copied[id] = [];

  setSharedHoldersStructure(copied);
  return id;
};

export default addShareholderToStructure;
