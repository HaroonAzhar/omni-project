import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { v4 as uuidv4 } from "uuid";

import StyledProgress from "./atoms";

const ProgressContext = createContext({});

export const useProgress = () => {
  const uuid = useMemo(() => uuidv4(), []);
  const { loadingList, handleSetLoading } = useContext(ProgressContext);

  useEffect(() => {
    return () => {
      handleSetLoading(uuid, false);
    };
  }, [handleSetLoading, uuid]);

  const setLoading = useCallback(
    (isLoading) => {
      handleSetLoading(uuid, isLoading);
    },
    [handleSetLoading, uuid]
  );

  const value = useMemo(() => {
    return loadingList.indexOf(uuid) >= 0;
  }, [loadingList, uuid]);

  return [value, setLoading];
};

// eslint-disable-next-line react/prop-types
export const Provider = ({ children }) => {
  const listRef = useRef([]);
  const [, setLength] = useState(0);

  const handleSetLoading = useCallback((uuid, isLoading = true) => {
    const loadingList = listRef.current;

    if (isLoading) {
      if (loadingList.indexOf(uuid) < 0) {
        const newList = [...loadingList, uuid];

        listRef.current = newList;
        setLength(newList.length);
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (loadingList.indexOf(uuid) >= 0) {
        const newList = [...loadingList].filter((_uuid) => _uuid !== uuid);

        listRef.current = newList;
        setLength(newList.length);
      }
    }
  }, []);

  const contextValue = {
    loadingList: listRef.current,
    handleSetLoading,
  };

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
};

export const Progress = () => {
  return (
    <ProgressContext.Consumer>
      {({ loadingList }) => {
        if (loadingList.length > 0) {
          return (
            <StyledProgress>
              <span>
                <span />
              </span>
            </StyledProgress>
          );
        }

        return null;
      }}
    </ProgressContext.Consumer>
  );
};
