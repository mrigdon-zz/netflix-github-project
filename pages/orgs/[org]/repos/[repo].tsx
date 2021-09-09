import { GetServerSideProps } from "next";
import React from "react";
import Label from "../../../../components/Label";
import PageLayout from "../../../../components/PageLayout";
import { fetchCommits, fetchRepo } from "../../../../githubAPI";
import { Locale } from "../../../../utils/i18n";
import { setParam } from "../../../../utils/urlParams";
import BranchSelect from "../../../../components/BranchSelect";
import styles from "../../../../styles/RepoDetail.module.css";
import Commit from "../../../../githubAPI/Commit";
import CommitsList from "../../../../components/CommitsList";

export default class RepoDetail extends React.Component<{
  locale: Locale;
  branch: string;
  org: string;
  repo: string;
}> {
  state = { branch: this.props.branch, commits: [] as Commit[] };

  private handleSelectBranch = (branch: string) => {
    this.setState({ branch });
    setParam("branch", branch);
    this.fetchCommits(branch);
  };

  private fetchCommits = async (branch: string) => {
    const { data } = await fetchCommits(
      this.props.org,
      this.props.repo,
      branch
    );
    this.setState({ commits: data });
  };

  componentDidMount() {
    this.fetchCommits(this.state.branch);
  }

  render() {
    return (
      <PageLayout locale={this.props.locale}>
        <h1>
          <Label name="commitsFor" attrs={{ repo: this.props.repo }}></Label>
        </h1>

        <div className={styles.select}>
          <BranchSelect
            org={this.props.org}
            repo={this.props.repo}
            value={this.state.branch}
            onSelect={this.handleSelectBranch}
          />
        </div>

        <CommitsList commits={this.state.commits} />
      </PageLayout>
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
      org,
      repo,
    },
  };
};
