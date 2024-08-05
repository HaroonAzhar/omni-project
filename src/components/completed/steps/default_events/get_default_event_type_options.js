const defaultEventTypes = ["Start", "End"];

const getDefaultEventTypeOptions = () => [
  { label: "Choose One", value: "" },
  ...defaultEventTypes.map((defaultEventType) => ({
    label: defaultEventType,
    value: defaultEventType,
  })),
];

export default getDefaultEventTypeOptions;
