import React, { useContext, useEffect, useState } from "react";
import { PLAYGROUNDS } from "../constants";
import { AppContext } from "../contexts";

function Output() {
  const { htmlCode, cssCode, selectedPlayground } = useContext(AppContext);
  const _htmlCode = htmlCode[selectedPlayground];
  const _cssCode = cssCode[selectedPlayground];

  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(_htmlCode, "text/html");
    const styles = doc.createElement("style");

    const updateDoc = () => {
      const _srcDoc = doc.documentElement.innerHTML;
      setSrcDoc(_srcDoc);
    };

    const updateStyles = () => {
      styles.innerHTML = _cssCode;
      doc.head.append(styles);
    };

    switch (selectedPlayground) {
      case PLAYGROUNDS.SCSS: {
        Sass.compile(_cssCode, (res) => {
          styles.innerHTML = res.text;
          doc.head.append(styles);
          updateDoc();
        });
        break;
      }
      case PLAYGROUNDS.BULMA: {
        const bulmaCSS = doc.createElement("link");
        bulmaCSS.rel = "stylesheet";
        bulmaCSS.href =
          "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
        doc.head.appendChild(bulmaCSS);
        updateStyles();
        updateDoc();
        break;
      }
      case PLAYGROUNDS.MATERIALIZE: {
        const materializeCSS = doc.createElement("link");
        materializeCSS.rel = "stylesheet";
        materializeCSS.href =
          "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
        doc.head.appendChild(materializeCSS);
        updateStyles();
        updateDoc();
        break;
      }
      case PLAYGROUNDS.TAILWIND: {
        const tailwindCdn = doc.createElement("script");
        tailwindCdn.src = "https://cdn.tailwindcss.com";
        doc.head.appendChild(tailwindCdn);
        updateStyles();
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
        updateStyles();
        updateDoc();
        break;
      }
      default: {
        updateStyles();
        updateDoc();
      }
    }
  }, [_htmlCode, _cssCode, selectedPlayground]);

  return (
    <div>
      <iframe className="w-full h-screen" srcDoc={srcDoc}></iframe>
    </div>
  );
}

export default Output;
