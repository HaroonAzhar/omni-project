import { useState, useEffect } from "react";

const useExpandForStatus = (status, expanded, newStatus) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  useEffect(() => {
    if (status === newStatus) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }, [status, newStatus]);

  return isExpanded;
};

export default useExpandForStatus;
