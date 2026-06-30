import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { App } from "./App";
import "@component-forge/app-ui/styles.css";
import "sonner/dist/styles.css";
import "./studio.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster position="top-right" richColors closeButton expand visibleToasts={4} style={{ zIndex: 9999 }} />
  </StrictMode>,
);
