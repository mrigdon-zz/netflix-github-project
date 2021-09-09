import Commit from "../githubAPI/Commit";
import styles from "../styles/CommitsList.module.css";

function avatarUrl(commit: Commit) {
  const committer = commit.committer || commit.commit.committer;
  return committer.avatar_url;
}

function authorName(commit: Commit) {
  return commit.author ? commit.author.login : commit.commit.author.name;
}

function authorUrl(commit: Commit) {
  return commit.author?.html_url;
}

export default function CommitsList({ commits }: { commits: Commit[] }) {
  return (
    <div>
      {commits.map((commit) => {
        const url = authorUrl(commit);

        return (
          <article className={styles.commit} key={commit.sha}>
            <h2 className={styles.message}>{commit.commit.message}</h2>

            <p className={styles.committer}>
              <img className={styles.avatar} src={avatarUrl(commit)} alt="" />

              {url && (
                <a href={url} className={styles.committerLink}>
                  {authorName(commit)}
                </a>
              )}

              {!url && (
                <span className={styles.committerLink}>
                  {authorName(commit)}
                </span>
              )}
            </p>
          </article>
        );
      })}
    </div>
  );
}
