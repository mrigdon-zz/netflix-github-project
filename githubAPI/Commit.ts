interface Commiter {
  avatar_url: string;
}

export default interface Commit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    committer: Commiter;
    author: { name: string; date: string };
  };
  committer?: Commiter;
  author?: { login: string; html_url: string };
}
