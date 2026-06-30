import React from "react";
import styles from "./MegaMenu.module.css";

export interface MegaMenuProps {
  /** Active item index */
  activeIndex?: number;
  collapsed?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function MegaMenu({ activeIndex = 0, collapsed = false, children, onClick }: MegaMenuProps) {
  return (
    <div className={[styles.root, collapsed && styles.collapsed].filter(Boolean).join(" ")} data-testid="mega-menu">
      <nav className={styles.nav} aria-label="MegaMenu">
        {["Home", "Components", "Docs", "Settings"].map((item) => (
          <a key={item} href="#" className={styles.link} onClick={onClick}>{item}</a>
        ))}
      </nav>
      {children}
    </div>
  );
}

MegaMenu.displayName = "MegaMenu";
