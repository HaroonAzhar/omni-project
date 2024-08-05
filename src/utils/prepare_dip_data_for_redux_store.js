import moment from "moment";

class DataPreparation {
  constructor(data) {
    this.data = data;
    this.preparedData = {};
  }

  prepareAdvanceDateForEdit() {
    const { data } = this;
    const { preparedData } = this;

    if (data.arrangement_fee_advance_date_percent) {
      preparedData.value_type_of_arrangement_fee_advance_date = "percent";
      preparedData.arrangement_fee_advance_date =
        data.arrangement_fee_advance_date_percent;
    }

    if (data.arrangement_fee_advance_date_value) {
      preparedData.value_type_of_arrangement_fee_advance_date = "value";
      preparedData.arrangement_fee_advance_date =
        data.arrangement_fee_advance_date_value;
    }

    return this;
  }

  prepareRepaymentForEdit() {
    const { data } = this;
    const { preparedData } = this;

    if (data.arrangement_fee_repayment_date_percent) {
      preparedData.value_type_of_arrangement_fee_repayment_date = "percent";
      preparedData.arrangement_fee_repayment_date =
        data.arrangement_fee_repayment_date_percent;
    }

    if (data.arrangement_fee_repayment_date_value) {
      preparedData.value_type_of_arrangement_fee_repayment_date = "value";
      preparedData.arrangement_fee_repayment_date =
        data.arrangement_fee_repayment_date_value;
    }

    return this;
  }

  prepareIntermediaryForEdit() {
    const { data } = this;
    const { preparedData } = this;

    if (data.intermediary_commission_fee_value) {
      preparedData.value_type_of_intermediary_commission_fee = "value";
      preparedData.intermediary_commission_fee =
        data.intermediary_commission_fee_value;
    }

    if (data.intermediary_commission_fee_percent) {
      preparedData.value_type_of_intermediary_commission_fee = "percent";
      preparedData.intermediary_commission_fee =
        data.intermediary_commission_fee_percent;
    }

    return this;
  }

  setWhichApplicantStepToShow() {
    const { data } = this;
    const { preparedData } = this;

    preparedData.whichApplicantStepToShow = data.type_of_applicant;

    return this;
  }

  setCompanyDataFromApplicants() {
    const { data } = this;
    const { preparedData } = this;

    if (data.type_of_applicant !== "company") return this;
    if (data.applicants.length === 0) return this;

    preparedData.company_name = data.applicants[0].name;
    preparedData.email = data.applicants[0].email;

    return this;
  }

  removeEmptyArrays() {
    const { data } = this;
    const { preparedData } = this;

    Object.entries(data).forEach(([key, value]) => {
      const isEmptyArray = Array.isArray(value) && value.length === 0;
      if (isEmptyArray) return this;
      if (preparedData[key] === undefined) {
        preparedData[key] = value;
      }
    });

    return this;
  }

  parseFurtherAdvancesStartDate() {
    const { data } = this;
    const { preparedData } = this;

    preparedData.start_date = data.start_date
      ? moment(data.start_date).format("YYYY-MM-DD")
      : null;

    return this;
  }

  removeNulls(obj = this.preparedData) {
    // Source: http://www.djcxy.com/p/37756.html
    const isArray = obj instanceof Array;
    for (const k in obj) {
      if (obj[k] === null) {
        if (isArray) obj.splice(k, 1);
        else delete obj[k];
      } else if (typeof obj[k] === "object") {
        this.removeNulls(obj[k]);
      }
    }

    return this;
  }

  getDataSplittedByStores(obj = this.preparedData) {
    const { calculator_response } = obj;
    delete obj.calculator_response;

    return {
      preApplication: obj,
      calculator: { calculatorResponse: calculator_response },
    };
  }
}

export default (data) =>
  new DataPreparation(data)
    .setWhichApplicantStepToShow()
    .prepareAdvanceDateForEdit()
    .prepareRepaymentForEdit()
    .prepareIntermediaryForEdit()
    .setCompanyDataFromApplicants()
    .removeEmptyArrays()
    .parseFurtherAdvancesStartDate()
    .removeNulls()
    .getDataSplittedByStores();
