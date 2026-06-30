import React from "react";
import styles from "./Sidebar.module.css";

export interface SidebarProps {
  /** Active item index */
  activeIndex?: number;
  collapsed?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function Sidebar({ activeIndex = 0, collapsed = false, children, onClick }: SidebarProps) {
  return (
    <div className={[styles.root, collapsed && styles.collapsed].filter(Boolean).join(" ")} data-testid="sidebar">
      <nav className={styles.nav} aria-label="Sidebar">
        {["Home", "Components", "Docs", "Settings"].map((item) => (
          <a key={item} href="#" className={styles.link} onClick={onClick}>{item}</a>
        ))}
      </nav>
      {children}
    </div>
  );
}

Sidebar.displayName = "Sidebar";
