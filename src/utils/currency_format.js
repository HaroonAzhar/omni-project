import LOCALE from "core/locale";

export default (number, defaultValue) => {
  if (defaultValue !== undefined && (number === undefined || number === null))
    return defaultValue;
  const val = number === undefined ? 0 : number;

  return (+val).toLocaleString(LOCALE, {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  });
};
