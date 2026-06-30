import React, { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import styles from "./VirtualizedTable.module.css";

export interface VirtualizedTableProps {
  variant?: "default" | "bordered" | "striped";
  loading?: boolean;
  empty?: boolean;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const DEMO_ROWS = Array.from({ length: 100 }, (_, i) => ({
  id: String(i + 1),
  name: `User ${i + 1}`,
  role: i % 3 === 0 ? "Developer" : i % 3 === 1 ? "Designer" : "Viewer",
  status: i % 4 === 0 ? "Pending" : "Active",
}));

export function VirtualizedTable({ variant = "default", loading = false, empty = false, children, header, footer, onClick }: VirtualizedTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const rows = empty ? [] : DEMO_ROWS;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 8,
  });

  return (
    <div className={styles.wrapper} data-testid="virtualized-table" role="region" aria-label="VirtualizedTable">
      <div className={styles.headerRow} role="row">
        <span role="columnheader">Name</span>
        <span role="columnheader">Role</span>
        <span role="columnheader">Status</span>
      </div>
      <div ref={parentRef} className={styles.scrollBody} role="rowgroup">
        <div
          className={styles.virtualInner}
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index]!;
            return (
              <div
                key={row.id}
                className={styles.row}
                role="row"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                  height: `${virtualRow.size}px`,
                }}
              >
                <span role="cell">{row.name}</span>
                <span role="cell">{row.role}</span>
                <span role="cell">
                  <span className={styles.badge}>{row.status}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {loading ? <p className={styles.loading}>Loading…</p> : null}
      {empty ? <p className={styles.empty}>No data available</p> : null}
    </div>
  );
}

VirtualizedTable.displayName = "VirtualizedTable";
