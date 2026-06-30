import React from "react";
import styles from "./Card.module.css";

export interface CardProps {
  variant?: "elevated" | "outlined" | "flat";
  /** Card header title */
  title?: React.ReactNode;
  /** Main card content */
  children: React.ReactNode;
  /** Footer actions or metadata */
  footer?: React.ReactNode;
}

export function Card({ variant = "elevated", title, children, footer }: CardProps) {
  return (
    <article
      className={[styles.root, variant && styles[variant]].filter(Boolean).join(" ")} data-testid="card"
      role="region"
    >
      {title && <header className={styles.header}>{title}</header>}
      <div className={styles.body}>{children}</div>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </article>
  );
}

Card.displayName = "Card";
