import SelectQuestion from "../../../shared/select_question";

export default {
  name: "electronic_document_check_satisfactory",
  label: "Electronic Document Check Satisfactory",
  component: SelectQuestion,
  referral: (value) => value === false,
};
