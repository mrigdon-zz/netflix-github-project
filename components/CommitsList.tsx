import { useContext } from "react";
import Commit from "../githubAPI/Commit";
import styles from "../styles/CommitsList.module.css";
import { LocaleContext, timestamp } from "../utils/i18n";

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
  const { locale } = useContext(LocaleContext);

  return (
    <div>
      {commits.map((commit) => {
        const url = authorUrl(commit);

        return (
          <article className={styles.commit} key={commit.sha}>
            <h2 className={styles.message}>
              <a
                className={styles.commitLink}
                href={commit.html_url}
                target="_blank"
                rel="noopener"
              >
                {commit.commit.message}
              </a>
            </h2>

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

              <span>{timestamp(locale, commit.commit.author.date)}</span>
            </p>
          </article>
        );
      })}
    </div>
  );
}
