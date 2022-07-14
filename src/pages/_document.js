import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.11.1/sass.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.11.1/sass.worker.min.js"></script>
        <NextScript />
      </body>
    </Html>
  );
}
