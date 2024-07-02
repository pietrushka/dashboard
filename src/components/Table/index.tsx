import styles from "./Table.module.css";

type TableProps = {
  columns: Array<string>;
  children: React.ReactNode;
};

export function Table({ columns, children }: TableProps) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {columns.map((columnName) => (
              <th key={columnName} className={styles.cell}>
                {columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Row({ children }: { children: React.ReactNode }) {
  return <tr className={styles.tr}>{children}</tr>;
}

export function SingleLineCell({ children }: { children: React.ReactNode }) {
  return (
    <td className={styles.cell}>
      <div className={styles.singleLineCell}>{children}</div>
    </td>
  );
}

export function DoubleLineCell({ children }: { children: React.ReactNode }) {
  return (
    <td className={styles.cell}>
      <div className={styles.doubleLineCell}>{children}</div>
    </td>
  );
}
