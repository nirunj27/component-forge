import React from "react";
import styles from "./BottomNavigation.module.css";

export interface BottomNavigationProps {
  /** Active item index */
  activeIndex?: number;
  collapsed?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function BottomNavigation({ activeIndex = 0, collapsed = false, children, onClick }: BottomNavigationProps) {
  return (
    <div className={[styles.root, collapsed && styles.collapsed].filter(Boolean).join(" ")} data-testid="bottom-navigation">
      <nav className={styles.nav} aria-label="BottomNavigation">
        {["Home", "Components", "Docs", "Settings"].map((item) => (
          <a key={item} href="#" className={styles.link} onClick={onClick}>{item}</a>
        ))}
      </nav>
      {children}
    </div>
  );
}

BottomNavigation.displayName = "BottomNavigation";
