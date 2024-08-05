import { useCallback, useState } from "react";

export default (durationTime = 2000) => {
  const [infoMessage, setInfoMessage] = useState();

  const setInfoBox = useCallback(
    (message) => {
      setInfoMessage(message);
      setTimeout(() => setInfoMessage(), durationTime);
    },
    [durationTime]
  );

  return [infoMessage, setInfoBox];
};
