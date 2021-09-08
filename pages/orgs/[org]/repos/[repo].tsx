import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Label from "../../../../components/Label";
import PageLayout from "../../../../components/PageLayout";
import { APIResponse, fetchCommits } from "../../../../githubAPI";
import { Locale } from "../../../../utils/i18n";
import Commit from "../../../../githubAPI/Commit";

export const RepoDetailContext = React.createContext<{
  org: string;
  repo: string;
}>({ org: "", repo: "" });

const RepoDetail: NextPage<{
  locale: Locale;
  org: string;
  repo: string;
  response: APIResponse<Commit[]>;
}> = ({ locale, repo, org, response }) => {
  console.log(response.data);
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
  const { org, repo } = context.query;

  const response = await fetchCommits(org as string, repo as string);

  return {
    props: {
      org,
      repo,
      response,
      locale: context.query.locale || "en",
    },
  };
};
