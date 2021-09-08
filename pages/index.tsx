import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Label from "../components/Label";
import OrgSearch from "../components/OrgSearch";
import PageLayout from "../components/PageLayout";
import styles from "../styles/Home.module.css";
import { Locale } from "../utils/i18n";

const Home: NextPage<{ locale: Locale }> = ({ locale }) => {
  return (
    <PageLayout locale={locale}>
      <h1>
        <Label name="welcome" />
      </h1>

      <p className={styles.description}>
        <Label name="searchDescription" />
      </p>

      <OrgSearch />
    </PageLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { locale: context.query.locale || "en" },
});
