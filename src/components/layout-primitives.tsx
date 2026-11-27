import type { ReactNode } from "react";
import styles from "./site.module.css";

export function PageIntro({ id, title, children }: {
  id: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className={`site-grid ${styles.pageIntro}`}>
      <h1 id={id} className={styles.pageTitle}>{title}</h1>
      {children && <div className={styles.introCopy}>{children}</div>}
    </header>
  );
}
