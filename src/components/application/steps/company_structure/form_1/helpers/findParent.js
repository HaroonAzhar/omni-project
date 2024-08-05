const findParent = (sharedHoldersStructure, key) => {
  for (const k in sharedHoldersStructure) {
    if (sharedHoldersStructure[k].indexOf(key) >= 0) {
      return k;
    }
  }

  return undefined;
};

export default findParent;
