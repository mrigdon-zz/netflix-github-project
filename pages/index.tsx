import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Label from "../components/Label";
import LocalePicker from "../components/LocalePicker";
import OrgSearch from "../components/OrgSearch";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Github Org Repo Explorer</title>
        <meta
          name="description"
          content="Explore commits for any Github org's repos"
        />
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

      <main className={styles.container}>
        <h1>
          <Label name="welcome" />
        </h1>

        <p className={styles.description}>
          <Label name="searchDescription" />
        </p>

        <OrgSearch />
      </main>
    </>
  );
};

export default Home;
