import SelectQuestion from "../select_question";

export default {
  name: "creditsafe_clear",
  label: "Credit safe report is clear",
  component: SelectQuestion,
  referral: (value) => value === false,
};
