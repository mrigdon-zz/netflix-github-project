import React from "react";
import githubFetch from "../utils/githubFetch";
import OrgReposTable, { ColumnId, Repo } from "./OrgReposTable";
import OrgSearchInput from "./OrgSearchInput";

export default class OrgSearch extends React.Component {
  state = {
    repos: [] as Repo[],
    error: undefined as string | undefined,
    loading: false,
    sortAscending: false,
    sortColumn: "stars" as ColumnId,
  };

  private get success() {
    return (
      !this.state.error && !this.state.loading && this.state.repos.length > 0
    );
  }

  private get sorter() {
    switch (this.state.sortColumn) {
      case "repo":
        return this.repoSorter;
      case "stars":
        return this.starsSorter;
      case "updated":
        return this.updatedSorter;
    }
  }

  private get sortedRepos(): Repo[] {
    return this.state.repos.sort(this.sorter);
  }

  private get sortMultipler() {
    return this.state.sortAscending ? 1 : -1;
  }

  render() {
    return (
      <>
        <OrgSearchInput
          loading={this.state.loading}
          onSearch={this.handleSearch}
        />

        {this.state.error && <p>😕 {this.state.error}</p>}

        {this.success && (
          <OrgReposTable
            repos={this.sortedRepos}
            sortAscending={this.state.sortAscending}
            sortColumn={this.state.sortColumn}
            onClick={this.handleSort}
          />
        )}
      </>
    );
  }

  private handleSearch = async (text: string) => {
    this.setState({ error: undefined, loading: true });

    if (!text) {
      this.setState({ repos: [], loading: false });
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

  private handleSort = (id: ColumnId) => {
    if (this.state.sortColumn === id) {
      this.setState({ sortAscending: !this.state.sortAscending });
    } else {
      this.setState({ sortColumn: id });
    }
  };

  private repoSorter = (a: Repo, b: Repo) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();

    if (aName < bName) return -this.sortMultipler;
    if (aName > bName) return this.sortMultipler;

    return 0;
  };

  private starsSorter = (a: Repo, b: Repo) => {
    if (a.stargazers_count < b.stargazers_count) return -this.sortMultipler;
    if (a.stargazers_count > b.stargazers_count) return this.sortMultipler;
    return 0;
  };

  private updatedSorter = (a: Repo, b: Repo) => {
    const aUpdated = new Date(a.updated_at);
    const bUpdated = new Date(b.updated_at);

    if (aUpdated < bUpdated) return -this.sortMultipler;
    if (aUpdated > bUpdated) return this.sortMultipler;

    return 0;
  };
}
