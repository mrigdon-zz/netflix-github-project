const baseUrl = "https://api.github.com";

export default async function githubFetch<T>(endpoint: string) {
  const res = await fetch(`${baseUrl}/${endpoint}`, {
    headers: { Accept: "application/vnd.github.v3+json" },
  });
  const json = await res.json();
  return res.ok ? { data: json as T } : { error: json.message as string };
}
