import checkIfEitherOfNationalities from "./check_if_either_of_nationalities";
import { eeaSwissCountries } from "./eea_swiss_countries_list";

const isNationalityEaa = (nationality) =>
  eeaSwissCountries.includes(nationality);

const isEaaSwiss = checkIfEitherOfNationalities(isNationalityEaa);

export default isEaaSwiss;
