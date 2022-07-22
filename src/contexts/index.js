import React, { useState, createContext } from "react";
import { DEFAULT_CODE, LANGUAGES, PLAYGROUNDS } from "../constants";

const DEFAULT_HTML_CODES = Object.fromEntries(
  Object.entries(DEFAULT_CODE).map(([pg, { HTML }]) => [pg, HTML])
);
const DEFAULT_CSS_CODES = Object.fromEntries(
  Object.entries(DEFAULT_CODE).map(([pg, { CSS }]) => [pg, CSS])
);

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const isServer = typeof window === "undefined";

  const [selectedTab, setSelectedTab] = useState(LANGUAGES.HTML);
  const [selectedPlayground, setSelectedPlayground] = useState(
    PLAYGROUNDS.VANILLA
  );
  const [editorOptions, setEditorOptions] = useState({
    minimap: { enabled: false },
    fontSize: "12px",
  });

  let htmlCodes = DEFAULT_HTML_CODES;
  let cssCodes = DEFAULT_CSS_CODES;
  if (!isServer) {
    const savedHTMLCodes = JSON.parse(localStorage.getItem("htmlCode"));
    const savedCSSCodes = JSON.parse(localStorage.getItem("cssCode"));
    if (savedHTMLCodes) {
      htmlCodes = savedHTMLCodes;
    }
    if (savedCSSCodes) {
      cssCodes = savedCSSCodes;
    }
  }
  const [htmlCode, setHTMLCode] = useState(htmlCodes);
  const [cssCode, setCSSCode] = useState(cssCodes);
  const [isSavedLocally, setIsSavedLocally] = useState(false);

  return (
    <AppContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
        selectedPlayground,
        setSelectedPlayground,
        editorOptions,
        setEditorOptions,
        htmlCode,
        setHTMLCode,
        cssCode,
        setCSSCode,
        isSavedLocally,
        setIsSavedLocally,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
