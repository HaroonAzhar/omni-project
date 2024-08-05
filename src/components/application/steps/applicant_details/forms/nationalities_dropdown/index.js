import React from "react";

import { SelectInput } from "components/atoms";

import availableNationalities from "./nationalities";

const { Nationality: nationalities } = availableNationalities;

const nationalitiesOptions = nationalities.map((nationality) => ({
  value: nationality,
  label: nationality,
}));

const inputOptions = [
  {
    value: "",
    label: " ",
  },
  ...nationalitiesOptions,
];

const NationalitiesDropdown = (params) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <SelectInput options={inputOptions} {...params} />;
};

export default NationalitiesDropdown;
