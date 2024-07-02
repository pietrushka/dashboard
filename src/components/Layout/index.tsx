import styles from "./Layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <main className={styles.page}>{children}</main>
    </div>
  );
}
