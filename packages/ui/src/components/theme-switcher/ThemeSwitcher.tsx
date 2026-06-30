import React from "react";
import styles from "./ThemeSwitcher.module.css";

export interface ThemeSwitcherProps {
  /** Visual style */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function ThemeSwitcher({ variant = "primary", size = "md", disabled = false, loading = false, children, onClick }: ThemeSwitcherProps) {
  const inputId = React.useId();

  return (
    <label className={styles.root} data-testid="theme-switcher" htmlFor={inputId}>
      <input
        id={inputId}
        type="checkbox"
        className={styles.control}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={styles.label}>"Theme Switcher"</span>
    </label>
  );
}

ThemeSwitcher.displayName = "ThemeSwitcher";
