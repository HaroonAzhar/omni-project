import SelectQuestion from "../../../shared/select_question";

export default {
  name: "copies_on_file",
  label: "Copies on File",
  component: SelectQuestion,
  referral: (value) => value === false,
};
