/** API origin only — no trailing slash or route suffix. Empty = same host (AWS/nginx). */
export function getApiBaseUrl(): string {
  const env = import.meta.env.VITE_API_URL?.trim();
  if (env) {
    return env
      .replace(/\/api\/registry\/components\/?$/i, "")
      .replace(/\/+$/, "");
  }
  if (import.meta.env.PROD) return "";
  return "http://localhost:3001";
}

export function getApiTimeoutMs(): number {
  const base = getApiBaseUrl();
  if (base.includes("onrender.com")) return 90_000;
  if (!base || base.includes("localhost")) return 15_000;
  return 30_000;
}
