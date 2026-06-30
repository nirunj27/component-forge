import React from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps {
  /** Field label */
  label?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  /** Validation error message */
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function Checkbox({ label, value = "", placeholder = "", disabled = false, required = false, error, onChange, onBlur }: CheckboxProps) {
  const inputId = React.useId();

  return (
    <label className={styles.root} data-testid="checkbox" htmlFor={inputId}>
      <input
        id={inputId}
        type="checkbox"
        className={styles.control}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}

Checkbox.displayName = "Checkbox";
