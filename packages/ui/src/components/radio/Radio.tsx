import React from "react";
import styles from "./Radio.module.css";

export interface RadioProps {
  variant?: "primary" | "secondary";
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Radio({ variant = "primary", disabled = false, children }: RadioProps) {
  const inputId = React.useId();

  return (
    <label className={styles.root} data-testid="radio" htmlFor={inputId}>
      <input
        id={inputId}
        type="radio"
        className={styles.control}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={styles.label}>"Radio"</span>
    </label>
  );
}

Radio.displayName = "Radio";
