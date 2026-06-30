import React from "react";
import styles from "./Tabs.module.css";

export interface TabsProps {
  /** Active item index */
  activeIndex?: number;
  collapsed?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function Tabs({ activeIndex = 0, collapsed = false, children, onClick }: TabsProps) {
  return (
    <div className={[styles.root, collapsed && styles.collapsed].filter(Boolean).join(" ")} data-testid="tabs">
      <div className={styles.tabs} role="tablist">
        {["Overview", "Details", "Settings"].map((tab, i) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeIndex === i}
            className={activeIndex === i ? styles.tabActive : styles.tab}
            onClick={onClick}
          >
            {tab}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}

Tabs.displayName = "Tabs";
