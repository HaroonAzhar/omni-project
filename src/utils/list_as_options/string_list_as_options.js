import genericListAsOptions from "./generic_list_as_options";

const elementAsSelectOption = (value) => ({ value, label: value });

const stringListAsSelectOptions = genericListAsOptions(elementAsSelectOption);

export default stringListAsSelectOptions;
