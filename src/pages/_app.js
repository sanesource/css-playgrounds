import "../styles/global.css";
import Head from "next/head";
import { AppContextProvider } from "../contexts";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Head>
        <title>CSS Playgrounds</title>
      </Head>
      <Component {...pageProps} />;
    </AppContextProvider>
  );
}

export default MyApp;
