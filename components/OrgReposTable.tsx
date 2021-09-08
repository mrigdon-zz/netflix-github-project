import React from "react";
import styles from "../styles/OrgReposTable.module.css";

export interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
  updated_at: string;
}

export default class OrgSearch extends React.Component<{ repos: Repo[] }> {
  render() {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.cell}>Repo</th>
            <th className={styles.cell}>Stars</th>
            <th className={styles.cell}>Last Updated</th>
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
