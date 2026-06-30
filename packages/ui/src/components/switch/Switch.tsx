import React from "react";
import styles from "./Switch.module.css";

export interface SwitchProps {
  variant?: "primary" | "secondary";
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Switch({ variant = "primary", disabled = false, children }: SwitchProps) {
  const inputId = React.useId();

  return (
    <label className={styles.root} data-testid="switch" htmlFor={inputId}>
      <input
        id={inputId}
        type="checkbox"
        className={styles.control}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={styles.label}>"Switch"</span>
    </label>
  );
}

Switch.displayName = "Switch";
