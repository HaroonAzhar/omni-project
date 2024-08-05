const numberedEntries = (entries) =>
  entries?.length > 1
    ? entries?.map((entry, index) => `${index + 1} - ${entry}`).join("\n")
    : entries;

export default numberedEntries;
