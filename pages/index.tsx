import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import Label from "../components/Label";
import OrgSearch from "../components/OrgSearch";
import PageLayout from "../components/PageLayout";
import styles from "../styles/Home.module.css";
import { HomeContext, HomeParams } from "../utils/homeContext";
import { Locale } from "../utils/i18n";
import { setParam } from "../utils/urlParams";

const Home: NextPage<{
  locale: Locale;
  homeParams: HomeParams;
}> = ({ locale, homeParams }) => {
  const [state, setState] = useState(homeParams);

  const setParams = (homeParams: HomeParams) => {
    setState({ ...state, ...homeParams });
    Object.entries(homeParams).forEach(([name, value]) =>
      setParam(name, value)
    );
  };

  return (
    <HomeContext.Provider value={{ params: state, setParams }}>
      <PageLayout locale={locale}>
        <h1>
          <Label name="welcome" />
        </h1>

        <p className={styles.description}>
          <Label name="searchDescription" />
        </p>

        <OrgSearch />
      </PageLayout>
    </HomeContext.Provider>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    locale: context.query.locale || "en",
    homeParams: {
      search: context.query.search || "",
      ascending: Boolean(context.query.ascending),
      column: context.query.column || "stars",
    },
  },
});
