import styles from "../styles/TableHeader.module.css";
import classNames from "../utils/classNames";

export interface TableHeaderProps {
  id: string;
  label: string;
  sorted: boolean;
  ascending: boolean;
  unsortable?: boolean;
  onClick(id: string): void;
}

export default function TableHeader({
  id,
  label,
  sorted,
  ascending,
  unsortable,
  onClick,
}: TableHeaderProps) {
  return (
    <th className={styles.header}>
      {unsortable && <div className={styles.label}>{label}</div>}

      {!unsortable && (
        <div
          role="button"
          className={styles.button}
          onClick={() => onClick(id)}
        >
          {label}{" "}
          <span
            className={classNames(
              styles.arrows,
              sorted && styles.arrowsVisible,
              ascending ? styles.arrowsAsc : styles.arrowsDesc
            )}
          >
            <span className={classNames(styles.arrow, styles.arrowUp)}>▴</span>
            <span className={classNames(styles.arrow, styles.arrowDown)}>
              ▴
            </span>
          </span>
        </div>
      )}
    </th>
  );
}
