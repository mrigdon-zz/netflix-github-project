import React from "react";
import styles from "../styles/OrgReposTable.module.css";
import { getConfig } from "../utils/globalConfig";
import TableHeader, { TableHeaderProps } from "./TableHeader";

export interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
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
              <td className={styles.cell}>
                <a href={repo.html_url} target="_blank" rel="noopener">
                  {repo.name}
                </a>
              </td>

              <td className={styles.cell}>
                {this.formattedStars(repo.stargazers_count)}
              </td>

              <td className={styles.cell}>{this.timestamp(repo.updated_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  private timestamp(updatedAt: string) {
    const date = new Date(updatedAt);
    const formatter = new Intl.DateTimeFormat(getConfig().locale, {
      dateStyle: "medium",
      timeStyle: "short",
    });
    return formatter.format(date);
  }

  private formattedStars(stars: number) {
    const formatter = new Intl.NumberFormat(getConfig().locale);
    return formatter.format(stars);
  }
}
