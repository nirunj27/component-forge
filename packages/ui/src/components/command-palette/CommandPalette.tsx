import React from "react";
import styles from "./CommandPalette.module.css";

export interface CommandPaletteProps {
  /** Active item index */
  activeIndex?: number;
  collapsed?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function CommandPalette({ activeIndex = 0, collapsed = false, children, onClick }: CommandPaletteProps) {
  return (
    <div className={[styles.root, collapsed && styles.collapsed].filter(Boolean).join(" ")} data-testid="command-palette">
      <nav className={styles.nav} aria-label="CommandPalette">
        {["Home", "Components", "Docs", "Settings"].map((item) => (
          <a key={item} href="#" className={styles.link} onClick={onClick}>{item}</a>
        ))}
      </nav>
      {children}
    </div>
  );
}

CommandPalette.displayName = "CommandPalette";
