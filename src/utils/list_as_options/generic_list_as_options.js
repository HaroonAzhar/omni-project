const genericListAsOptions = (elementMap) => (elements) => [
  { value: "", label: "Choose one" },
  ...elements.map(elementMap),
];

export default genericListAsOptions;
