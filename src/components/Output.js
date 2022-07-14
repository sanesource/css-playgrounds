import React, { useContext, useEffect, useState } from "react";
import { PLAYGROUNDS } from "../constants";
import { AppContext } from "../contexts";

function Output() {
  const { htmlCode, cssCode, selectedPlayground } = useContext(AppContext);

  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, "text/html");
    const styles = doc.createElement("style");

    const updateDoc = () => {
      const _srcDoc = doc.documentElement.innerHTML;
      setSrcDoc(_srcDoc);
    };

    switch (selectedPlayground) {
      case PLAYGROUNDS.SCSS: {
        Sass.compile(cssCode, (res) => {
          styles.innerHTML = res.text;
          doc.head.append(styles);
          updateDoc();
        });
        break;
      }
      case PLAYGROUNDS.TAILWIND: {
        const tailwindCdn = doc.createElement("script");
        tailwindCdn.src = "https://cdn.tailwindcss.com";
        doc.head.appendChild(tailwindCdn);
        updateDoc();
        break;
      }
      case PLAYGROUNDS.BOOTSTRAP: {
        const bootstrapCSS = doc.createElement("link");
        bootstrapCSS.rel = "stylesheet";
        bootstrapCSS.href =
          "https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css";
        bootstrapCSS.crossOrigin = "anonymous";
        doc.head.appendChild(bootstrapCSS);
        updateDoc();
        break;
      }
      default: {
        styles.innerHTML = cssCode;
        doc.head.append(styles);
        updateDoc();
      }
    }
  }, [htmlCode, cssCode, selectedPlayground]);

  return (
    <div>
      <iframe srcDoc={srcDoc}></iframe>
    </div>
  );
}

export default Output;
