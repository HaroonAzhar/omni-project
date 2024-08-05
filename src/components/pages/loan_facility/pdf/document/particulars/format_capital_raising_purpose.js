const CAPITAL_RAISING = "Capital Raising";

const formatCapitalRaisingPurpose = (purposeOfBorrowings = "") => {
  if (!purposeOfBorrowings) {
    return CAPITAL_RAISING;
  }

  if (
    purposeOfBorrowings.toLowerCase().startsWith(CAPITAL_RAISING.toLowerCase())
  ) {
    return purposeOfBorrowings;
  }

  return `${CAPITAL_RAISING} for ${purposeOfBorrowings}`;
};

export default formatCapitalRaisingPurpose;
