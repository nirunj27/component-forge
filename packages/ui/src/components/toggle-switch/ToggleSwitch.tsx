import React from "react";
import styles from "./ToggleSwitch.module.css";

export interface ToggleSwitchProps {
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

export function ToggleSwitch({ label, value = "", placeholder = "", disabled = false, required = false, error, onChange, onBlur }: ToggleSwitchProps) {
  const inputId = React.useId();

  return (
    <label className={styles.root} data-testid="toggle-switch" htmlFor={inputId}>
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

ToggleSwitch.displayName = "ToggleSwitch";
