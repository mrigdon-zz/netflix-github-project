import React from "react";
import styles from "../styles/OrgReposTable.module.css";
import classNames from "../utils/classNames";
import { label, LabelKey, LocaleContext } from "../utils/i18n";
import Label from "./Label";
import TableHeader, { TableHeaderProps } from "./TableHeader";

export interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  forks_count: number;
}

export type ColumnId = "repo" | "stars" | "forks" | "updated" | "commits";

export default class OrgSearch extends React.Component<{
  repos: Repo[];
  sortAscending: boolean;
  sortColumn: ColumnId;
  onClick(id: ColumnId): void;
}> {
  static contextType = LocaleContext;

  private get headers(): TableHeaderProps[] {
    return [
      { id: "repo", label: this.label("repo") },
      { id: "stars", label: this.label("stars") },
      { id: "forks", label: this.label("forks") },
      { id: "updated", label: this.label("lastUpdated") },
      { id: "commits", label: this.label("commits"), unsortable: true },
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
                {this.formattedCount(repo.stargazers_count)}
              </td>

              <td className={styles.cell}>
                {this.formattedCount(repo.forks_count)}
              </td>

              <td className={styles.cell}>{this.timestamp(repo.updated_at)}</td>

              <td className={classNames(styles.cell, styles.viewAll)}>
                <a href={`/repos/${repo.name}`}>
                  <Label name="viewAll" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  private label(key: LabelKey) {
    return label(this.context.locale, key);
  }

  private timestamp(updatedAt: string) {
    const date = new Date(updatedAt);
    const formatter = new Intl.DateTimeFormat(this.context.locale, {
      dateStyle: "medium",
      timeStyle: "short",
    });
    return formatter.format(date);
  }

  private formattedCount(stars: number) {
    const formatter = new Intl.NumberFormat(this.context.locale);
    return formatter.format(stars);
  }
}
