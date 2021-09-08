import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Locale, LocaleContext } from "../utils/i18n";
import React from "react";

export default class MyApp extends React.Component<AppProps> {
  state = { locale: "en" as Locale };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <LocaleContext.Provider
        value={{ locale: this.state.locale, setLocale: this.setLocale }}
      >
        <Component {...pageProps} />
      </LocaleContext.Provider>
    );
  }

  private setLocale = (locale: Locale) => {
    this.setState({ locale });
  };
}
