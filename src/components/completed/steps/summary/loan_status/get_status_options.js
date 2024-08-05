import { loanStatuses, REVERT_TO_AUTOMATIC_STATUS } from "./consts";

const getStatusOptions = (automaticLoanStatus, lastManualStatus) => [
  {
    value: "",
    label: "Choose One",
  },
  ...loanStatuses.map((option) => ({ value: option })),
  ...(lastManualStatus !== undefined
    ? [
        {
          label: `Revert to Automatic Status (${automaticLoanStatus})`,
          value: REVERT_TO_AUTOMATIC_STATUS,
        },
      ]
    : []),
];

export default getStatusOptions;
