import React from "react";

import { currencyFormat, dateFormat } from "utils";

import signedAmount from "../helpers/signed_amount";
import CancelAdjustment from "./cancel_adjustment";
import CorrectAdjustment from "./correct_adjustment";

const adjustmentCancellation = "Adjustment Cancellation";

const getDescription = (description) => {
  if (description === "Adjustment Initial") {
    return "Created";
  }

  if (description.search(adjustmentCancellation) === 0) {
    return `Cancellation -  ${description.substr(
      adjustmentCancellation.length
    )}`;
  }
  return `Correction -  ${description}`;
};

const mapSingleAdjustment = (adjustment) => {
  const subRowsData = {};

  if (adjustment.InternalNote) {
    subRowsData.internalNote = `Internal Notes: ${adjustment.InternalNote}`;
  }

  if (adjustment.corrections.length > 1) {
    const corrections = adjustment.corrections.map((correction) => {
      return `- ${dateFormat(correction.CreatedDate)} | ${currencyFormat(
        signedAmount(adjustment, correction.CorrectedAmount)
      )}${
        correction.CreatedBy ? ` | ${correction.CreatedBy} ` : ` `
      } | ${getDescription(correction.Description)}`;
    });
    subRowsData.revisions = [...corrections];
  }

  return [
    {
      signedAmount: signedAmount(adjustment, adjustment.amount),
      ...adjustment,
      cancel: <CancelAdjustment adjustment={adjustment} />,
      correct: <CorrectAdjustment adjustment={adjustment} />,
      subRowsData,
    },
  ];
};

const mapAdjustmentsForTable = (adjustmentsData) => {
  return adjustmentsData.flatMap(mapSingleAdjustment);
};

export default mapAdjustmentsForTable;
