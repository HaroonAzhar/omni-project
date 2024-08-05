import SelectQuestion from "../select_question";

export default {
  name: "creditsafe",
  label: "Credit safe report has been produced",
  component: SelectQuestion,
  referral: (value) => value === false,
  referralMessage:
    "You cannot proceed until the Credit Safe report has been run. Please consult MLRO if this is not possible",
};
