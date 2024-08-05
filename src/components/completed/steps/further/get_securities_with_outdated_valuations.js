import moment from "moment";

const getSecuritiesWithOutdatedValuations = (securities) =>
  securities.filter(
    (security) =>
      !security.valuations.some(
        (valuation) =>
          moment().diff(moment(valuation.ValuationDate), "months") < 4 ||
          moment().diff(moment(valuation.ReportDate), "months") < 3
      )
  );

export default getSecuritiesWithOutdatedValuations;
