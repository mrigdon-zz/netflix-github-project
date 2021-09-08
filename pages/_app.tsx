import "../styles/globals.css";
import type { AppProps } from "next/app";
import { setConfig } from "../utils/globalConfig";

function MyApp({ Component, pageProps }: AppProps) {
  setConfig({ locale: "en" });
  return <Component {...pageProps} />;
}
export default MyApp;
