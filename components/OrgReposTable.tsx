import React from "react";

export interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
  updated_at: string;
}

export default class OrgSearch extends React.Component<{ repos: Repo[] }> {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Repo</th>
            <th>Stars</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {this.props.repos.map((repo) => (
            <tr key={repo.id}>
              <td>{repo.name}</td>
              <td>{repo.stargazers_count}</td>
              <td>{repo.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
