import React from "react";
import styles from "./Select.module.css";

export interface SelectProps {
  /** Field label */
  label?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({ label, value = "", disabled = false, placeholder = "Select an option", onChange }: SelectProps) {
  const selectId = React.useId();

  return (
    <div className={styles.wrapper} data-testid="select">
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

Select.displayName = "Select";
