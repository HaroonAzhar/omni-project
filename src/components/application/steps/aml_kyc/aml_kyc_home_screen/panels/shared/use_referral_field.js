const useReferralField = (isReferral = () => {}) => {
  const parse = (value) => {
    return { innerValue: value, referral: isReferral(value) };
  };
  const format = (value) => {
    if (value) {
      return value.innerValue;
    }
  };
  return { format, parse };
};

export default useReferralField;
