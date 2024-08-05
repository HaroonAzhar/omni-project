import SelectQuestion from "../select_question";

export default {
  name: "any_suspicion_of_money_laundering",
  label: "Any suspicion of Money Laundering Activities",
  component: SelectQuestion,
  referral: (value) => value === true,
};
