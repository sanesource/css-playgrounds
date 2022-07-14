import React, { useContext } from "react";
import Editor from "@monaco-editor/react";
import { AppContext } from "../contexts";
import { LANGUAGES, PLAYGROUNDS } from "../constants";
import { debounce } from "../utils";

function CodeEditor() {
  const {
    selectedTab,
    htmlCode,
    cssCode,
    setHTMLCode,
    setCSSCode,
    selectedPlayground,
  } = useContext(AppContext);

  const cssLang =
    selectedPlayground === PLAYGROUNDS.SCSS ? LANGUAGES.SCSS : LANGUAGES.CSS;

  const updateHTML = debounce(setHTMLCode);
  const updateCSS = debounce(setCSSCode);

  if (selectedTab === LANGUAGES.HTML) {
    return (
      <Editor
        language={LANGUAGES.HTML}
        value={htmlCode}
        onChange={updateHTML}
      />
    );
  }
  return <Editor language={cssLang} value={cssCode} onChange={updateCSS} />;
}

export default CodeEditor;
