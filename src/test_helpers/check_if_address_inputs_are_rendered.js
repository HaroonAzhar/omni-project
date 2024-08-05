export default (getByLabelText) => {
  getByLabelText(/Address Line 1/i);
  getByLabelText(/Address Line 2/i);
  getByLabelText(/Town\/City/i);
  getByLabelText(/Postcode/i);
  getByLabelText(/Country/i);
};
