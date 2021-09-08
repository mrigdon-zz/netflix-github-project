import React from "react";
import githubFetch from "../utils/githubFetch";
import { setParam } from "../utils/urlParams";
import OrgReposTable, { ColumnId, Repo } from "./OrgReposTable";
import OrgSearchInput from "./OrgSearchInput";

export default class OrgSearch extends React.Component<{
  search: string;
  ascending: boolean;
  column: ColumnId;
}> {
  state = {
    repos: [] as Repo[],
    error: undefined as string | undefined,
    loading: false,
    sortAscending: this.props.ascending,
    sortColumn: this.props.column,
  };

  private get success() {
    return (
      !this.state.error && !this.state.loading && this.state.repos.length > 0
    );
  }

  private get sortTransform() {
    switch (this.state.sortColumn) {
      case "repo":
        return (repo: Repo) => repo.name.toLowerCase();
      case "stars":
        return (repo: Repo) => repo.stargazers_count;
      case "forks":
        return (repo: Repo) => repo.forks_count;
      case "updated":
        return (repo: Repo) => new Date(repo.updated_at);
    }
  }

  private get sortedRepos(): Repo[] {
    const transform = this.sortTransform;

    if (!transform) return this.state.repos;

    return this.state.repos.slice().sort((a, b) => {
      let result = 0;
      const valueA = transform(a);
      const valueB = transform(b);

      if (valueA < valueB) result = 1;
      else if (valueA > valueB) result = -1;

      if (this.state.sortAscending) result *= -1;

      return result;
    });
  }

  render() {
    return (
      <>
        <OrgSearchInput
          search={this.props.search}
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
    setParam("search", text);
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
      const sortAscending = !this.state.sortAscending;
      this.setState({ sortAscending });
      setParam("ascending", sortAscending);
    } else {
      this.setState({ sortColumn: id });
      setParam("column", id);
    }
  };
}
