// Docxpresso templating - including loading templates to base 64, getting an access token and running a conversion
// Note that while DX supports PDF output we tend to want to allow minor changes currently and besides PDF output causes problems with our choice of font
import prepareDataForTemplating from "./prepare_data_for_templating";
import { generateAndReturnProcessedDocument } from "./docexpresso";
import {
  withApplicationAndCalculator,
  withStatementData,
  enrich,
  withBase64Template,
} from "./fetch_data";

const GENERATE_DOCUMENT_URL = "https://api.docxpresso.cloud/generateDocument";

const DOCUMENT_BASE = "/doctemplates/";
const CASE_SUMMARY_URL = `${DOCUMENT_BASE}case_summary.odt`;

const STATEMENT_REPORT_URL = `${DOCUMENT_BASE}statement_report.odt`;

const FACILITY_LETTER_URL = `${DOCUMENT_BASE}facility_letter.odt`;

const FACILITY_LETTER_SCOTTISH_URL = `${DOCUMENT_BASE}facility_letter_scottish.odt`;

export const generateTemplatedDocument = async (data) => {
  const { removeList, cloneList, replaceVars } = prepareDataForTemplating(data);
  await generateAndReturnProcessedDocument(
    data.base64Template,
    removeList,
    cloneList,
    replaceVars,
    GENERATE_DOCUMENT_URL
  );
};

export const generateCaseSummaryDocument = async (id) => {
  const data = await enrich(
    { id, base64Url: CASE_SUMMARY_URL },
    withBase64Template,
    withApplicationAndCalculator
  );
  return generateTemplatedDocument(data);
};

/*
  Here we define generateFacilityLetterDocument async function.
  We pass in the parameters id, facilityLetterForm
 
*/
export const generateFacilityLetterDocument = async (
  id,
  facilityLetterForm
) => {
  const FACILITY_LETTER_URL_FINAL = facilityLetterForm?.isScottish
    ? FACILITY_LETTER_SCOTTISH_URL
    : FACILITY_LETTER_URL;

  const data = await enrich(
    {
      id,
      base64Url: FACILITY_LETTER_URL_FINAL,
      additionalOptions: facilityLetterForm,
    },
    withBase64Template,
    withApplicationAndCalculator
  );
  return generateTemplatedDocument(data);
};

export const generateCompletedStatementReport = async (
  id,
  endDate,
  shouldUseMaturityDate,
  rest
) => {
  const data = await enrich(
    {
      id,
      base64Url: STATEMENT_REPORT_URL,
      endDate,
      shouldUseMaturityDate,
      ...rest,
    },
    withBase64Template,
    withStatementData,
    withApplicationAndCalculator
  );
  return generateTemplatedDocument(data);
};
