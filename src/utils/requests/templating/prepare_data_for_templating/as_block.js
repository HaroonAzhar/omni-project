import asEntry from "./as_entry";

const asBlock = (style) => (name, values) => {
  const entry = asEntry(name, values ? style + values : "");
  // Rich text output also needs a block-type element to retain formatting so set up a variant that adds this
  entry["block-type"] = true;
  return entry;
};

export default asBlock;
