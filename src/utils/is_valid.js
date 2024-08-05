export default {
  price: (val) => /^[0-9,]*(\.[0-9]{0,2})?$/.test(val),
};
