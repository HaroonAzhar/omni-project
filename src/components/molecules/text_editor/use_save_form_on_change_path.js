import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ shouldSave, data, onSubmit }) => {
  const history = useHistory();
  const [oldPathname, setOldPathname] = useState(history.location.pathname);

  useEffect(() => {
    return () => {
      if (shouldSave && history.location.pathname !== oldPathname) {
        /* 
          When only history.location.pathname changes, save data to DB.
          The dependencies table contains more props,
          because we need to update reference of these values,
          but we need to run this function only when user change path.
        */

        setOldPathname(history.location.pathname);
        onSubmit(data);
      }
    };
  }, [data, history.location.pathname, oldPathname, onSubmit, shouldSave]);
};
