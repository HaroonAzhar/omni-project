import SelectQuestion from "../select_question";

export default {
  name: "is_pep",
  label: "Any Individual PEP match",
  component: SelectQuestion,
  referral: (value) => value === true,
};
