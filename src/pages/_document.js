import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.11.1/sass.min.js"
          async
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.11.1/sass.worker.min.js"
          async
        ></script>
        <NextScript />
      </body>
    </Html>
  );
}
