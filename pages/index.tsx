import { NextPage } from "next";
import Head from "next/head";
import React from "react";
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
          <img src="/logo.png" alt="Netflix" height={40} />
        </div>
      </header>

      <main className={styles.container}>
        <h1>Welcome to the Github Org Repo Explorer!</h1>

        <p className={styles.description}>
          Search for the name of any Github organization to begin exploring
          their repos...
        </p>

        <OrgSearch />
      </main>
    </>
  );
};

export default Home;
