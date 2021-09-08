import Head from "next/head";
import React, { useState } from "react";
import Label from "../components/Label";
import LocalePicker from "../components/LocalePicker";
import styles from "../styles/PageLayout.module.css";
import { Locale, LocaleContext } from "../utils/i18n";

export default function PageLayout(props: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState(props.locale);
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <Head>
        <title>Github Org Repo Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.nav}>
            <img
              className={styles.logo}
              src="/logo.png"
              alt="Netflix"
              height={40}
            />

            <a href="/" className={styles.navLink}>
              <Label name="home" />
            </a>
          </div>

          <LocalePicker />
        </div>
      </header>

      <main className={styles.container}>{props.children}</main>
    </LocaleContext.Provider>
  );
}
