import SelectQuestion from "../../../shared/select_question";

export default {
  name: "adverse_media_check_satisfactory",
  label: "Adverse Media Check Satisfactory",
  component: SelectQuestion,
  referral: (value) => value === false,
};
