import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

const FurtherContext = createContext({});

export function useRequests() {
  return useContext(FurtherContext);
}

export function FurtherContextProvider({ children, ...requests }) {
  return (
    <FurtherContext.Provider value={requests}>
      {children}
    </FurtherContext.Provider>
  );
}

FurtherContextProvider.propTypes = {
  children: PropTypes.node,
};
