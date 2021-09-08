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
      case "forks":
        return this.forksSorter;
      case "updated":
        return this.updatedSorter;
    }
  }

  private get sortedRepos(): Repo[] {
    return this.state.repos.slice().sort(this.sorter);
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
    return this.sortBy(a, b, (repo) => repo.name.toLowerCase());
  };

  private starsSorter = (a: Repo, b: Repo) => {
    return this.sortBy(a, b, (repo) => repo.stargazers_count);
  };

  private forksSorter = (a: Repo, b: Repo) => {
    return this.sortBy(a, b, (repo) => repo.forks_count);
  };

  private updatedSorter = (a: Repo, b: Repo) => {
    return this.sortBy(a, b, (repo) => new Date(repo.updated_at));
  };

  private sortBy = (a: Repo, b: Repo, transformer: (repo: Repo) => any) => {
    const valueA = transformer(a);
    const valueB = transformer(b);

    if (valueA < valueB) return -this.sortMultipler;
    if (valueA > valueB) return this.sortMultipler;

    return 0;
  };
}
