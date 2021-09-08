import Commit from "./Commit";
import Repo from "./Repo";

const baseUrl = "https://api.github.com";

export type APIResponse<T> = { data?: T; error?: string };

async function githubFetch<T>(endpoint: string): Promise<APIResponse<T>> {
  const res = await fetch(`${baseUrl}/${endpoint}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `Basic bXJpZ2RvbjpnaHBfbERtRmw5bmZIbnhEd0w3YUxyeVEyell2V3RYQnNxMUpSMkxTCg==`,
    },
  });
  const json = await res.json();
  return res.ok ? { data: json as T } : { error: json.message as string };
}

export function fetchRepos(org: string) {
  return githubFetch<Repo[]>(`orgs/${org}/repos`);
}

export function fetchCommits(org: string, repo: string) {
  return githubFetch<Commit[]>(`repos/${org}/${repo}/commits`);
}