import styled from "styled-components";

import { shadow, darkGrey } from "styles/colors";

export const StyledTable = styled.div`
  table {
    margin: 0px 2px;
    max-width: 1000px;
    min-width: 600px;

    tr {
      border-bottom: 2px solid ${shadow};
    }

    th {
      padding: 10px 20px 10px 0px;
      text-align: left;
      white-space: nowrap;
    }

    tbody {
      color: ${darkGrey};

      tr:last-child {
        border-bottom: none;
      }
    }

    th,
    td:first-child {
      font-weight: 500;
    }

    td {
      text-align: left;
    }
    td.internal-notes-sub-row {
      border: hidden;
      padding-bottom: 2px;
      padding-left: 20px;
    }
    td.revisions-sub-row {
      border-top-style: hidden;
      padding-bottom: 2px;
      padding-left: 20px;
    }
  }
`;
