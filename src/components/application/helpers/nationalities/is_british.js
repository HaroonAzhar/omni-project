import checkIfEitherOfNationalities from "./check_if_either_of_nationalities";
import { ukNationalities } from "./uk_nationalities_list";

const isNationalityBritish = (nationality) =>
  ukNationalities.includes(nationality);

const isBritish = checkIfEitherOfNationalities(isNationalityBritish);

export default isBritish;
