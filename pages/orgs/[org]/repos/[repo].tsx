import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import Label from "../../../../components/Label";
import PageLayout from "../../../../components/PageLayout";
import { APIResponse, fetchCommits } from "../../../../githubAPI";
import { Locale } from "../../../../utils/i18n";
import Commit from "../../../../githubAPI/Commit";
import { setParam } from "../../../../utils/urlParams";
import BranchSelect from "../../../../components/BranchSelect";
import {
  RepoDetailContext,
  RepoDetailParams,
} from "../../../../utils/repoDetailContext";

const RepoDetail: NextPage<{
  locale: Locale;
  params: RepoDetailParams;
  response: APIResponse<Commit[]>;
}> = ({ locale, params, response }) => {
  const [state, setState] = useState(params);

  const setParams = (detailParams: RepoDetailParams) => {
    setState(detailParams);
    setParam("branch", detailParams.branch);
  };

  console.log(response.data);

  return (
    <RepoDetailContext.Provider value={{ params: state, setParams }}>
      <PageLayout locale={locale}>
        <h1>
          <Label name="commitsFor" attrs={{ repo: params.repo }}></Label>
        </h1>

        <BranchSelect />
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
      response,
      locale: context.query.locale || "en",
      params: { org, repo },
    },
  };
};
