const formatNumber = (num) => {
  if (num == null || num === undefined) return "";
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export default formatNumber;
