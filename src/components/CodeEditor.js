import React, { useContext } from "react";
import Editor from "@monaco-editor/react";
import { AppContext } from "../contexts";
import { LANGUAGES, PLAYGROUNDS } from "../constants";
import { debounce } from "../utils";

function CodeEditor() {
  const {
    selectedTab,
    editorOptions,
    htmlCode,
    cssCode,
    setHTMLCode,
    setCSSCode,
    selectedPlayground,
    isSavedLocally,
    setIsSavedLocally,
  } = useContext(AppContext);

  const cssLang =
    selectedPlayground === PLAYGROUNDS.SCSS ? LANGUAGES.SCSS : LANGUAGES.CSS;

  const updateHTML = debounce((val) => {
    if (isSavedLocally) setIsSavedLocally(false);
    setHTMLCode((prev) => ({
      ...prev,
      [selectedPlayground]: val,
    }));
  });
  const updateCSS = debounce((val) => {
    if (isSavedLocally) setIsSavedLocally(false);
    setCSSCode((prev) => ({
      ...prev,
      [selectedPlayground]: val,
    }));
  });

  if (selectedTab === LANGUAGES.HTML) {
    return (
      <Editor
        options={editorOptions}
        language={LANGUAGES.HTML}
        value={htmlCode[selectedPlayground]}
        onChange={updateHTML}
      />
    );
  }
  return (
    <Editor
      options={editorOptions}
      language={cssLang}
      value={cssCode[selectedPlayground]}
      onChange={updateCSS}
    />
  );
}

export default CodeEditor;
