import React from "react";
import styles from "./Stepper.module.css";

export interface StepperProps {
  /** Active item index */
  activeIndex?: number;
  collapsed?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function Stepper({ activeIndex = 0, collapsed = false, children, onClick }: StepperProps) {
  return (
    <div className={[styles.root, collapsed && styles.collapsed].filter(Boolean).join(" ")} data-testid="stepper">
      <ol className={styles.stepper}>
        {["Account", "Profile", "Review"].map((step, i) => (
          <li key={step} className={i <= activeIndex ? styles.stepDone : styles.step}>
            <span className={styles.stepNum}>{i + 1}</span>
            {step}
          </li>
        ))}
      </ol>
      {children}
    </div>
  );
}

Stepper.displayName = "Stepper";
