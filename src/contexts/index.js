import React, { useState, createContext } from "react";
import { DEFAULT_CODE, LANGUAGES, PLAYGROUNDS } from "../constants";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(LANGUAGES.HTML);
  const [selectedPlayground, setSelectedPlayground] = useState(
    PLAYGROUNDS.VANILLA
  );
  const [htmlCode, setHTMLCode] = useState(
    DEFAULT_CODE[selectedPlayground].HTML
  );
  const [cssCode, setCSSCode] = useState(DEFAULT_CODE[selectedPlayground].CSS);

  return (
    <AppContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
        selectedPlayground,
        setSelectedPlayground: (pg) => {
          setSelectedPlayground(pg);
          setHTMLCode(DEFAULT_CODE[pg].HTML);
          setCSSCode(DEFAULT_CODE[pg].CSS);
        },
        htmlCode,
        setHTMLCode,
        cssCode,
        setCSSCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
