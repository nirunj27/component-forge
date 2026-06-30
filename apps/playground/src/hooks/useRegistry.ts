import { useEffect, useState } from "react";
import {
  fetchAllComponents,
  fetchCategories,
  fetchStats,
  fetchTokens,
  type Category,
  type DesignToken,
  type ForgeStats,
  type RegistryComponent,
} from "../lib/api";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useAsync<T>(loader: () => Promise<T>, deps: unknown[] = []): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    loader()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, deps);

  return state;
}

export function useRegistry() {
  const components = useAsync(() => fetchAllComponents(), []);
  const categories = useAsync(fetchCategories, []);
  const tokens = useAsync(fetchTokens, []);
  const stats = useAsync(fetchStats, []);

  return { components, categories, tokens, stats };
}

export function useFilteredComponents(
  components: RegistryComponent[] | null,
  category: string,
  search: string,
) {
  if (!components) return [];

  return components.filter((c) => {
    const matchesCategory = category === "all" || c.category === category;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
}

export type { RegistryComponent, Category, DesignToken, ForgeStats };
