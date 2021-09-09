import { GetServerSideProps } from "next";
import React from "react";
import Label from "../../../../components/Label";
import PageLayout from "../../../../components/PageLayout";
import { fetchCommits, fetchRepo } from "../../../../githubAPI";
import { Locale } from "../../../../utils/i18n";
import { setParam } from "../../../../utils/urlParams";
import BranchSelect from "../../../../components/BranchSelect";
import {
  RepoDetailContext,
  RepoDetailParams,
} from "../../../../utils/repoDetailContext";
import styles from "../../../../styles/RepoDetail.module.css";
import Commit from "../../../../githubAPI/Commit";
import CommitsList from "../../../../components/CommitsList";

export default class RepoDetail extends React.Component<{
  locale: Locale;
  branch: string;
  params: RepoDetailParams;
}> {
  state = { branch: this.props.branch, commits: [] as Commit[] };

  private setParams = (params: Partial<RepoDetailParams>) => {
    this.setState(params);
    setParam("branch", params.branch);
  };

  private handleSelectBranch = (branch: string) => {
    this.setParams({ branch });
    this.fetchCommits(branch);
  };

  private fetchCommits = async (branch: string) => {
    const { data } = await fetchCommits(
      this.props.params.org,
      this.props.params.repo,
      branch
    );
    this.setState({ commits: data });
  };

  componentDidMount() {
    this.fetchCommits(this.state.branch);
  }

  render() {
    return (
      <RepoDetailContext.Provider value={{ params: this.props.params }}>
        <PageLayout locale={this.props.locale}>
          <h1>
            <Label
              name="commitsFor"
              attrs={{ repo: this.props.params.repo }}
            ></Label>
          </h1>

          <div className={styles.select}>
            <BranchSelect
              value={this.state.branch}
              onSelect={this.handleSelectBranch}
            />
          </div>

          <CommitsList commits={this.state.commits} />
        </PageLayout>
      </RepoDetailContext.Provider>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { org, repo, branch } = context.query;

  const { data } = await fetchRepo(org as string, repo as string);

  return {
    props: {
      locale: context.query.locale || "en",
      branch: branch || data?.default_branch || "",
      params: { org, repo },
    },
  };
};
