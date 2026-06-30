import React from "react";
import styles from "./AsyncSelect.module.css";

export interface AsyncSelectProps {
  /** Field label */
  label?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AsyncSelect({ label, value = "", disabled = false, placeholder = "Select an option", onChange }: AsyncSelectProps) {
  const selectId = React.useId();

  return (
    <div className={styles.wrapper} data-testid="async-select">
      {label && (
        <label className={styles.label} htmlFor={selectId}>
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={styles.root}
        value={value}
        disabled={disabled}
        onChange={onChange}
        aria-label={label}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </div>
  );
}

AsyncSelect.displayName = "AsyncSelect";
