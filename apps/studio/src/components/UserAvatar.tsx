import { getAvatarUrl, isPortraitAvatar } from "../lib/avatars";
import { Avatar, AvatarFallback, AvatarImage } from "@component-forge/app-ui/components/ui/avatar";

interface UserAvatarProps {
  avatarId: string;
  name?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: "h-7 w-7", md: "h-9 w-9", lg: "h-12 w-12" };

export function UserAvatar({ avatarId, name, className, size = "md" }: UserAvatarProps) {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Avatar className={`${sizes[size]} ${className ?? ""}`}>
      {isPortraitAvatar(avatarId) ? (
        <AvatarImage src={getAvatarUrl(avatarId)} alt={name ?? "User avatar"} />
      ) : null}
      <AvatarFallback>{initials ?? avatarId.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
}
