import React from "react";
import styles from "./Pagination.module.css";

export interface PaginationProps {
  /** Active item index */
  activeIndex?: number;
  collapsed?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function Pagination({ activeIndex = 0, collapsed = false, children, onClick }: PaginationProps) {
  return (
    <div className={[styles.root, collapsed && styles.collapsed].filter(Boolean).join(" ")} data-testid="pagination">
      <nav className={styles.pagination} aria-label="Pagination">
        <button type="button" className={styles.pageBtn}>Prev</button>
        {[1, 2, 3].map((p) => (
          <button key={p} type="button" className={p === 2 ? styles.pageActive : styles.pageBtn}>{p}</button>
        ))}
        <button type="button" className={styles.pageBtn}>Next</button>
      </nav>
      {children}
    </div>
  );
}

Pagination.displayName = "Pagination";
