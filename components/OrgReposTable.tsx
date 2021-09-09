import React from "react";
import styles from "../styles/OrgReposTable.module.css";
import classNames from "../utils/classNames";
import { HomeContext } from "../utils/homeContext";
import { label, LocaleContext, timestamp } from "../utils/i18n";
import Label from "./Label";
import Repo from "../githubAPI/Repo";
import TableHeader from "./TableHeader";

export type ColumnId = "repo" | "stars" | "forks" | "updated" | "commits";

export default function OrgReposTable({
  repos,
  onClick,
}: {
  repos: Repo[];
  onClick(id: ColumnId): void;
}) {
  const { locale } = React.useContext(LocaleContext);
  const { params } = React.useContext(HomeContext);

  function formattedCount(stars: number) {
    const formatter = new Intl.NumberFormat(locale);
    return formatter.format(stars);
  }

  const headers = [
    { id: "repo", label: label(locale, "repo") },
    { id: "stars", label: label(locale, "stars") },
    { id: "forks", label: label(locale, "forks") },
    { id: "updated", label: label(locale, "lastUpdated") },
    { id: "commits", label: label(locale, "commits"), unsortable: true },
  ].map((header) => ({
    ...header,
    sorted: header.id === params.column,
    ascending: params.ascending,
    onClick,
  }));

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header) => (
            <TableHeader key={header.id} {...header} />
          ))}
        </tr>
      </thead>

      <tbody>
        {repos.map((repo) => (
          <tr key={repo.id} className={styles.row}>
            <td className={styles.cell}>
              <a href={repo.html_url} target="_blank" rel="noopener">
                {repo.name}
              </a>
            </td>

            <td className={styles.cell}>
              {formattedCount(repo.stargazers_count)}
            </td>

            <td className={styles.cell}>{formattedCount(repo.forks_count)}</td>

            <td className={styles.cell}>
              {timestamp(locale, repo.updated_at)}
            </td>

            <td className={classNames(styles.cell, styles.viewAll)}>
              <a
                href={`/orgs/${params.search}/repos/${repo.name}?locale=${locale}`}
              >
                <Label name="viewAll" />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
