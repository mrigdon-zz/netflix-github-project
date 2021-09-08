import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import Label from "../../../../components/Label";
import PageLayout from "../../../../components/PageLayout";
import { fetchRepo } from "../../../../githubAPI";
import { Locale } from "../../../../utils/i18n";
import { setParam } from "../../../../utils/urlParams";
import BranchSelect from "../../../../components/BranchSelect";
import {
  RepoDetailContext,
  RepoDetailParams,
} from "../../../../utils/repoDetailContext";
import styles from "../../../../styles/RepoDetail.module.css";

const RepoDetail: NextPage<{
  locale: Locale;
  params: RepoDetailParams;
}> = ({ locale, params }) => {
  const [state, setState] = useState(params);

  const setParams = (detailParams: RepoDetailParams) => {
    setState({ ...state, ...detailParams });
    setParam("branch", detailParams.branch);
  };

  return (
    <RepoDetailContext.Provider value={{ params: state, setParams }}>
      <PageLayout locale={locale}>
        <h1>
          <Label name="commitsFor" attrs={{ repo: params.repo }}></Label>
        </h1>

        <div className={styles.select}>
          <BranchSelect />
        </div>
      </PageLayout>
    </RepoDetailContext.Provider>
  );
};

export default RepoDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { org, repo, branch } = context.query;

  const { data } = await fetchRepo(org as string, repo as string);

  return {
    props: {
      locale: context.query.locale || "en",
      params: {
        org,
        repo,
        branch: branch || data?.default_branch || "",
      },
    },
  };
};
