import checkIfEitherOfNationalities from "./check_if_either_of_nationalities";

const isNationalityIrish = (nationality) => ["Irish"].includes(nationality);

const isIrish = checkIfEitherOfNationalities(isNationalityIrish);

export default isIrish;
