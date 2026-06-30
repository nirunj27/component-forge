import React from "react";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbProps {
  /** Active item index */
  activeIndex?: number;
  collapsed?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function Breadcrumb({ activeIndex = 0, collapsed = false, children, onClick }: BreadcrumbProps) {
  return (
    <div className={[styles.root, collapsed && styles.collapsed].filter(Boolean).join(" ")} data-testid="breadcrumb">
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <a href="#">Home</a>
        <span>/</span>
        <a href="#">Projects</a>
        <span>/</span>
        <span aria-current="page">Current</span>
      </nav>
      {children}
    </div>
  );
}

Breadcrumb.displayName = "Breadcrumb";
