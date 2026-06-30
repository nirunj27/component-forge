import React from "react";
import styles from "./Toggle.module.css";

export interface ToggleProps {
  variant?: "primary" | "secondary";
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Toggle({ variant = "primary", disabled = false, children }: ToggleProps) {
  const inputId = React.useId();

  return (
    <label className={styles.root} data-testid="toggle" htmlFor={inputId}>
      <input
        id={inputId}
        type="checkbox"
        className={styles.control}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={styles.label}>"Toggle"</span>
    </label>
  );
}

Toggle.displayName = "Toggle";
