import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Label from "../../../../components/Label";
import PageLayout from "../../../../components/PageLayout";
import { Locale } from "../../../../utils/i18n";

export const RepoDetailContext = React.createContext<{
  org: string;
  repo: string;
}>({ org: "", repo: "" });

const RepoDetail: NextPage<{
  locale: Locale;
  org: string;
  repo: string;
}> = ({ locale, repo, org }) => {
  return (
    <RepoDetailContext.Provider value={{ org, repo }}>
      <PageLayout locale={locale}>
        <h1>
          <Label name="commitsFor" attrs={{ repo }}></Label>
        </h1>
      </PageLayout>
    </RepoDetailContext.Provider>
  );
};

export default RepoDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      org: context.query.org,
      repo: context.query.repo,
      locale: context.query.locale || "en",
    },
  };
};
