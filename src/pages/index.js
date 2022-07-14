import React, { useContext } from "react";
import Split from "react-split";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import CodeEditor from "../components/CodeEditor";
import Output from "../components/Output";
import { AppContext } from "../contexts";
import { LANGUAGES, DROPDOWN_OPTIONS } from "../constants";

function getTabClassNames(name, currentTab) {
  const baseStyle = "h-full px-4 text-slate-50";
  if (name === currentTab) return `${baseStyle} bg-slate-500`;
  return baseStyle;
}

function Index() {
  const {
    selectedTab,
    setSelectedTab,
    selectedPlayground,
    setSelectedPlayground,
  } = useContext(AppContext);

  return (
    <>
      <header className="h-12 flex flex-row items-center p-4 bg-slate-700">
        <h3 className="text-gray-200">CSS Playgrounds</h3>
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
              <Dropdown
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
