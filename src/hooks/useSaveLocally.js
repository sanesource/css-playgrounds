import { useEffect } from "react";

export const useSaveLocally = (cb) => {
  useEffect(() => {
    function onKeyPress(e) {
      if ((e.metaKey || e.ctrlKey) && e.code === "KeyS") {
        e.preventDefault();
        cb();
      }
    }
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [cb]);
};
