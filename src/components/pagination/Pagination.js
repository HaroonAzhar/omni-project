import React, { useCallback } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import PropTypes from "prop-types";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;

  ul {
    display: flex;
  }

  li {
    margin: 0 4px;

    a {
      color: ${(props) => props.theme.colors.helper};
      cursor: pointer;
      padding: 0 6px;
    }
  }

  .selected a {
    color: ${(props) => props.theme.colors.main};
    text-decoration: underline;
  }
`;

const Pagination = ({ data, handlePageClick }) => {
  const setPage = useCallback(
    ({ selected }) => {
      handlePageClick(selected + 1);
    },
    [handlePageClick]
  );

  if (!data) {
    return null;
  }

  return (
    <PaginationContainer>
      <ReactPaginate
        pageCount={data.pages}
        forcePage={data.page - 1}
        onPageChange={setPage}
        disableInitialCallback={true}
      />
    </PaginationContainer>
  );
};

Pagination.propTypes = {
  data: PropTypes.shape({
    pages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  }),
  handlePageClick: PropTypes.func.isRequired,
};

export default Pagination;
