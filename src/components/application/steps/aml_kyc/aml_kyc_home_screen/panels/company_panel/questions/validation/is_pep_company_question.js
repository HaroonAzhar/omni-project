import SelectQuestion from "../../../shared/select_question";

export default {
  name: "is_pep",
  label: "Any Corporate a PEP",
  component: SelectQuestion,
  referral: (value) => value === true,
};
