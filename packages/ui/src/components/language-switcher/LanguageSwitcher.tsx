import React from "react";
import styles from "./LanguageSwitcher.module.css";

export interface LanguageSwitcherProps {
  /** Field label */
  label?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LanguageSwitcher({ label, value = "", disabled = false, placeholder = "Select an option", onChange }: LanguageSwitcherProps) {
  const selectId = React.useId();

  return (
    <div className={styles.wrapper} data-testid="language-switcher">
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

LanguageSwitcher.displayName = "LanguageSwitcher";
