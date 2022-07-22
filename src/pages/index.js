import React, { useCallback, useContext, useMemo } from "react";
import Icon from "feather-icons-react";
import Split from "react-split";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import CodeEditor from "../components/CodeEditor";
import Output from "../components/Output";
import { useSaveLocally } from "../hooks";
import { AppContext } from "../contexts";
import {
  LANGUAGES,
  DROPDOWN_OPTIONS,
  EDITOR_FONT_SIZE_BOUNDS,
} from "../constants";

function getTabClassNames(name, currentTab) {
  const baseStyle = "h-full px-4 text-slate-50";
  if (name === currentTab) return `${baseStyle} bg-slate-500`;
  return baseStyle;
}

function Index() {
  const {
    htmlCode,
    cssCode,
    editorOptions,
    setEditorOptions,
    selectedTab,
    setSelectedTab,
    selectedPlayground,
    setSelectedPlayground,
    isSavedLocally,
    setIsSavedLocally,
  } = useContext(AppContext);

  function onSaveLocally() {
    localStorage.setItem("htmlCode", JSON.stringify(htmlCode));
    localStorage.setItem("cssCode", JSON.stringify(cssCode));
    setIsSavedLocally(true);
  }

  useSaveLocally(onSaveLocally);

  const [minFontSize, maxFontSize] = EDITOR_FONT_SIZE_BOUNDS;

  const fontSize = useMemo(() => {
    return parseInt(editorOptions["fontSize"].split("px")[0]);
  }, [editorOptions]);

  const updateFontSize = useCallback(
    (type) => {
      if (
        (type === "inc" && fontSize < maxFontSize) ||
        (type === "dec" && fontSize > minFontSize)
      ) {
        const newFontSize = type === "inc" ? fontSize + 2 : fontSize - 2;
        setEditorOptions({ ...editorOptions, fontSize: `${newFontSize}px` });
      }
    },
    [minFontSize, maxFontSize, fontSize, editorOptions, setEditorOptions]
  );

  return (
    <>
      <header className="h-12 flex flex-row items-center justify-between px-4 bg-slate-700">
        <h3 className="text-gray-200">CSS Playgrounds</h3>
        <div className="flex">
          <div className="flex">
            <button
              disabled={isSavedLocally}
              className={`mx-4 px-2 rounded text-gray-200 bg-slate-${
                isSavedLocally ? "600" : "500"
              }`}
              onClick={onSaveLocally}
            >
              {isSavedLocally ? "Saved" : "Save Locally"}
            </button>
          </div>
          <a
            className="rounded-full bg-slate-500 p-1 pt-2"
            href="https://github.com/sanesource/css-playgrounds/"
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon="github" size={28} color="white" />
          </a>
        </div>
      </header>

      <Split className="h-[calc(100vh-3rem)] flex flex-row" sizes={[60, 40]}>
        <div>
          <div className="h-10 bg-slate-600 flex flex-row justify-between pr-2">
            <div className="flex flex-row">
              <button
                className={getTabClassNames(LANGUAGES.HTML, selectedTab)}
                onClick={() => setSelectedTab(LANGUAGES.HTML)}
              >
                index.html
              </button>
              <button
                className={getTabClassNames(LANGUAGES.CSS, selectedTab)}
                onClick={() => setSelectedTab(LANGUAGES.CSS)}
              >
                styles.css
              </button>
            </div>
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center mr-8">
                <Icon
                  className={`cursor-pointer ${
                    fontSize <= minFontSize ? "text-slate-400" : ""
                  }`}
                  icon="minus-circle"
                  size={18}
                  color="white"
                  onClick={() => updateFontSize("dec")}
                />
                <Icon className="mx-2" icon="type" size={22} color="white" />
                <Icon
                  className={`cursor-pointer ${
                    fontSize >= maxFontSize ? "text-slate-400" : ""
                  }`}
                  icon="plus-circle"
                  size={18}
                  color="white"
                  onClick={() => updateFontSize("inc")}
                />
              </div>
              <Dropdown
                className="select-none"
                value={selectedPlayground}
                options={DROPDOWN_OPTIONS}
                onChange={({ value }) => setSelectedPlayground(value)}
              />
            </div>
          </div>
          <div className="py-1 h-[calc(100vh-6rem)]">
            <CodeEditor />
          </div>
        </div>
        <div>
          <Output />
        </div>
      </Split>
    </>
  );
}

export default Index;
