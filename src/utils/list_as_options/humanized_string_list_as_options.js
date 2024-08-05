import { humanize } from "inflected";

import genericListAsOptions from "./generic_list_as_options";

const elementAsSelectOption = (value) => ({
  value,
  label: humanize(value),
});

const humanizeStringListAsSelectOptions = genericListAsOptions(
  elementAsSelectOption
);

export default humanizeStringListAsSelectOptions;
