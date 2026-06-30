import React from "react";
import styles from "./RadioButton.module.css";

export interface RadioButtonProps {
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

export function RadioButton({ label, value = "", placeholder = "", disabled = false, required = false, error, onChange, onBlur }: RadioButtonProps) {
  const inputId = React.useId();

  return (
    <label className={styles.root} data-testid="radio-button" htmlFor={inputId}>
      <input
        id={inputId}
        type="radio"
        className={styles.control}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}

RadioButton.displayName = "RadioButton";
