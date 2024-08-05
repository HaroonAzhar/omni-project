export default {
  addressRequired: "Please search address or add manually",
  advancesShouldAddUp:
    "The sum of advances are not equal to further drawdowns!",
  applicantTypeRequired: "Please select the applicant type to proceed",
  applicationTypeRequired: "Please select the application type to proceed",
  companyMustBeSelected:
    "Please search companies and select one or check Not In Companies House",
  currentMortgageMoreThanCurrentValue:
    'Current "Mortgage outstanding" should be less than "Estimated current value".',
  email: "Please enter a valid email address",
  mustBeDate: "This field must be a date! Try with format: 30/02/2020",
  mustBeNumber: "This field must be a number!",
  mustBePrice: "This field must be a number with upto 2 decimal places!",
  phoneNumber: "This field should be valid phone number!",
  postcode: "This field must be a proper UK postcode.",
  required: "This field is required to continue!",
  shouldBeLettersAndWhiteSpaces:
    "This input allows to letters and whitespace characters.",
  old18: "You have to be at least 18 years old",
  dateInFuture: "date cannot be in future",
  in6months: "date must be within 6 months",
  cumulative3years:
    "Cannot continue until cumulative time at all addresses is 3 years or more.",
  maxLength: ({ max }) => `This field may contain up to ${max} characters`,
  insuranceNumber: "The number is incorrect! Try with the format: AA123456B",
  proofOfAddressTheSameAsProofOfId:
    "Proof of ID should not be the same as Proof of Address.",
  defaultEventsOnlyOnDistinctDates:
    "Only one event can exist for a given date.",
  extensionOnlyAfterMaturity:
    "The extension date can not be the same or before the maturity date",
  manualStatusBeforeCompletion:
    "The effective form date can not be before Completion date",
  manualStatusBeforeExisting:
    "The effective form date can not be before Existing",
  specifiedFieldMustBeNumberAndIsRequired: ({ field }) =>
    `${field}, must be a number and required!`,
};
