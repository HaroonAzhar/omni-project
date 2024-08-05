import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { titleize } from "inflected";

import { H1 } from "components/atoms";

import { StyledAdminPageContainer } from "../admin_home_page/styled_admin_home_page";
import AdminHomePageLink from "../link_to_admin_page/admin_home_page_link";
import { StyledTable } from "./styled_data_view_page";
import useRecords from "./hooks/use_records";
import AddNewRecord from "./add_new_record";

const DataViewPage = ({
  page,
  mapRecordToTableData,
  columns,
  sortDataWith,
}) => {
  const [records] = useRecords(page);

  const data = useMemo(() => records.map(mapRecordToTableData), [
    mapRecordToTableData,
    records,
  ]);

  if (sortDataWith) data.sort(sortDataWith);
  return (
    <StyledAdminPageContainer>
      <H1>{titleize(page)}</H1>
      <AdminHomePageLink />
      <StyledTable
        columns={columns}
        data={data}
        shouldShowHeaders={true}
        className={page}
      />
      <AddNewRecord page={page} />
    </StyledAdminPageContainer>
  );
};

export default DataViewPage;

DataViewPage.propTypes = {
  page: PropTypes.string.isRequired,
  mapRecordToTableData: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  sortDataWith: PropTypes.func,
};

export { default as DataEntryContextMenuWithEdit } from "./data_entry_context_menu_with_edit";
