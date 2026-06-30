import React from "react";
import styles from "./StickyColumns.module.css";

export interface StickyColumnsProps {
  variant?: "default" | "bordered" | "striped";
  loading?: boolean;
  empty?: boolean;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function StickyColumns({ variant = "default", loading = false, empty = false, children, header, footer, onClick }: StickyColumnsProps) {
  const rows = [
    { id: "1", name: "Alex Rivera", role: "Developer", status: "Active" },
    { id: "2", name: "Sam Chen", role: "Designer", status: "Active" },
    { id: "3", name: "Jordan Lee", role: "Viewer", status: "Pending" },
  ];

  return (
    <div className={styles.wrapper} data-testid="sticky-columns" role="region" aria-label="StickyColumns">
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.role}</td>
              <td>
                <span className={styles.badge}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading ? <p className={styles.loading}>Loading…</p> : null}
      {empty ? <p className={styles.empty}>No data available</p> : null}
    </div>
  );
}

StickyColumns.displayName = "StickyColumns";
