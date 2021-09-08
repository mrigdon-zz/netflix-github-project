import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Label from "../components/Label";
import { ColumnId } from "../components/OrgReposTable";
import OrgSearch from "../components/OrgSearch";
import PageLayout from "../components/PageLayout";
import styles from "../styles/Home.module.css";
import { Locale } from "../utils/i18n";

const Home: NextPage<{
  locale: Locale;
  search: string;
  ascending: boolean;
  column: ColumnId;
}> = ({ locale, search, ascending, column }) => {
  return (
    <PageLayout locale={locale}>
      <h1>
        <Label name="welcome" />
      </h1>

      <p className={styles.description}>
        <Label name="searchDescription" />
      </p>

      <OrgSearch search={search} ascending={ascending} column={column} />
    </PageLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    locale: context.query.locale || "en",
    search: context.query.search || "",
    ascending: Boolean(context.query.ascending),
    column: context.query.column || "stars",
  },
});
