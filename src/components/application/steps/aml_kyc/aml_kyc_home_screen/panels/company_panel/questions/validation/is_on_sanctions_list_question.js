import SelectQuestion from "../../../shared/select_question";

export default {
  name: "is_on_sanctions_list",
  label: "Corporate on Sanctions List",
  component: SelectQuestion,
  referral: (value) => value === true,
};
