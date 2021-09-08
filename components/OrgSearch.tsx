import React from "react";
import githubFetch from "../utils/githubFetch";
import OrgReposTable, { Repo } from "./OrgReposTable";
import OrgSearchInput from "./OrgSearchInput";

export default class OrgSearch extends React.Component {
  state = {
    repos: [] as Repo[],
    error: undefined as string | undefined,
    loading: false,
  };

  private get success() {
    return (
      !this.state.error && !this.state.loading && this.state.repos.length > 0
    );
  }

  render() {
    return (
      <>
        <OrgSearchInput onSearch={this.handleSearch} />

        {this.state.error && <p>😕 {this.state.error}</p>}

        {this.success && <OrgReposTable repos={this.state.repos} />}
      </>
    );
  }

  private handleSearch = async (text: string) => {
    this.setState({ error: undefined, loading: true });

    if (!text) {
      this.setState({ repos: [] });
      return;
    }

    const { data, error } = await githubFetch<Repo[]>(`orgs/${text}/repos`);

    if (data) {
      this.setState({ repos: data });
    } else {
      this.setState({ error });
    }

    this.setState({ loading: false });
  };
}
