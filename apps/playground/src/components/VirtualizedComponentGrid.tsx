import { useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { RegistryComponent } from "../hooks/useRegistry";
import { ComponentCard } from "./ComponentCard";

const ROW_HEIGHT = 196;
const GAP = 16;

function useColumnCount(): number {
  const [cols, setCols] = useState(4);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 640) setCols(1);
      else if (w < 1024) setCols(2);
      else if (w < 1280) setCols(3);
      else setCols(4);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return cols;
}

interface VirtualizedComponentGridProps {
  items: RegistryComponent[];
  searchQuery: string;
  onOpen: (component: RegistryComponent) => void;
}

export function VirtualizedComponentGrid({
  items,
  searchQuery,
  onOpen,
}: VirtualizedComponentGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const columnCount = useColumnCount();
  const rowCount = Math.ceil(items.length / columnCount) || 1;

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT + GAP,
    overscan: 3,
  });

  const gridTemplate = useMemo(
    () => ({ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }),
    [columnCount],
  );

  return (
    <div
      ref={parentRef}
      className="max-h-[min(70vh,720px)] overflow-auto rounded-lg border bg-card/30 p-2"
    >
      <div
        className="relative w-full"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columnCount;
          const rowItems = items.slice(startIndex, startIndex + columnCount);

          return (
            <div
              key={virtualRow.key}
              className="absolute left-0 top-0 grid w-full gap-4 px-2"
              style={{
                ...gridTemplate,
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {rowItems.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  searchQuery={searchQuery}
                  onOpen={onOpen}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
