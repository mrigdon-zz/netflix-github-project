import React from "react";
import styles from "../styles/OrgReposTable.module.css";
import TableHeader, { TableHeaderProps } from "./TableHeader";

export interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
  updated_at: string;
}

export type ColumnId = "repo" | "stars" | "updated";

export default class OrgSearch extends React.Component<{
  repos: Repo[];
  sortAscending: boolean;
  sortColumn: ColumnId;
  onClick(id: ColumnId): void;
}> {
  private get headers(): TableHeaderProps[] {
    return [
      { id: "repo", label: "📦 Repo" },
      { id: "stars", label: "⭐️ Stars" },
      { id: "updated", label: "✍️ Last Updated" },
    ].map((header) => ({
      ...header,
      sorted: header.id === this.props.sortColumn,
      ascending: this.props.sortAscending,
      onClick: this.props.onClick,
    }));
  }

  render() {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            {this.headers.map((header) => (
              <TableHeader key={header.id} {...header} />
            ))}
          </tr>
        </thead>

        <tbody>
          {this.props.repos.map((repo) => (
            <tr key={repo.id}>
              <td className={styles.cell}>{repo.name}</td>
              <td className={styles.cell}>{repo.stargazers_count}</td>
              <td className={styles.cell}>{repo.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
