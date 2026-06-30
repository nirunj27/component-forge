import { memo, type ReactNode } from "react";
import { Badge } from "@component-forge/app-ui/components/ui/badge";
import {
  Card,
  CardContent,
} from "@component-forge/app-ui/components/ui/card";
import { getAvatarUrl, isPortraitAvatar } from "../lib/avatars";
import type { RegistryComponent } from "../hooks/useRegistry";

function highlight(text: string, q: string): ReactNode {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-yellow-200 px-0.5">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export interface ComponentCardProps {
  component: RegistryComponent;
  searchQuery: string;
  onOpen: (component: RegistryComponent) => void;
}

export const ComponentCard = memo(function ComponentCard({
  component,
  searchQuery,
  onOpen,
}: ComponentCardProps) {
  return (
    <Card
      className="h-full cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => onOpen(component)}
    >
      <CardContent className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold">{highlight(component.name, searchQuery)}</h3>
          <Badge variant="outline" className="shrink-0 text-[10px] uppercase">
            {component.status}
          </Badge>
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {highlight(component.description, searchQuery)}
        </p>
        <div className="flex items-center gap-2">
          {isPortraitAvatar(component.authorAvatar ?? "") ? (
            <img
              src={getAvatarUrl(component.authorAvatar!)}
              alt=""
              className="h-6 w-6 rounded-full"
              loading="lazy"
            />
          ) : (
            <span>{component.authorAvatar}</span>
          )}
          <span className="text-xs text-muted-foreground">{component.authorName}</span>
        </div>
        <Badge variant="secondary" className="text-[10px]">
          {component.category}
        </Badge>
      </CardContent>
    </Card>
  );
});
