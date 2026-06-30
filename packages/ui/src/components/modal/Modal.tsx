import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

export interface ModalProps {
  /** Visibility */
  isOpen?: boolean;
  /** Title text */
  title?: string;
  /** Body content */
  children: React.ReactNode;
  onClose?: () => void;
}

export function Modal({ isOpen = false, title, children, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = React.useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} data-testid="modal" onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <header className={styles.header}>
            <h2 id={titleId} className={styles.title}>{title}</h2>
            <button type="button" className={styles.close} onClick={onClose} aria-label="Close dialog">
              ×
            </button>
          </header>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}

Modal.displayName = "Modal";
