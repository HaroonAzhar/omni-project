import React from "react";
import PropTypes from "prop-types";

import { MainHeaderBarTitle } from "./styled_main_header_bar";

const MainHeaderBar = ({ title, status }) => {
  return (
    <MainHeaderBarTitle>
      <span>{title}</span>
      <span>{status}</span>
    </MainHeaderBarTitle>
  );
};

MainHeaderBar.propTypes = {
  title: PropTypes.string,
  status: PropTypes.string,
};

export default MainHeaderBar;
