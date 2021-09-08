import styles from "../styles/TableHeader.module.css";
import classNames from "../utils/classNames";

export interface TableHeaderProps {
  id: string;
  label: string;
  sorted: boolean;
  ascending: boolean;
  onClick(id: string): void;
}

export default function TableHeader({
  id,
  label,
  sorted,
  ascending,
  onClick,
}: TableHeaderProps) {
  return (
    <th className={styles.header}>
      <div role="button" className={styles.button} onClick={() => onClick(id)}>
        {label}{" "}
        <span
          className={classNames(
            styles.arrows,
            sorted && styles.arrowsVisible,
            ascending ? styles.arrowsAsc : styles.arrowsDesc
          )}
        >
          <span className={classNames(styles.arrow, styles.arrowUp)}>▴</span>
          <span className={classNames(styles.arrow, styles.arrowDown)}>▴</span>
        </span>
      </div>
    </th>
  );
}
