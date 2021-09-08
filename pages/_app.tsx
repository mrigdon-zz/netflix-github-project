import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LocaleContext } from "../utils/i18n";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LocaleContext.Provider value="en">
      <Component {...pageProps} />
    </LocaleContext.Provider>
  );
}
export default MyApp;
