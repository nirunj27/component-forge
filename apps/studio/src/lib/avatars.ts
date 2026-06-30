export const AVATAR_PORTRAITS = [
  { id: "user-felix", label: "Felix" },
  { id: "user-aisha", label: "Aisha" },
  { id: "user-sam", label: "Sam" },
  { id: "user-mia", label: "Mia" },
  { id: "user-jordan", label: "Jordan" },
  { id: "user-priya", label: "Priya" },
  { id: "user-leo", label: "Leo" },
  { id: "user-nina", label: "Nina" },
  { id: "user-omar", label: "Omar" },
  { id: "user-zoe", label: "Zoe" },
  { id: "user-eli", label: "Eli" },
  { id: "user-rosa", label: "Rosa" },
] as const;

export function getAvatarUrl(avatarId: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarId)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

export function getAvatarLabel(avatarId: string): string {
  return AVATAR_PORTRAITS.find((a) => a.id === avatarId)?.label ?? avatarId;
}

export function isPortraitAvatar(avatarId: string): boolean {
  return avatarId.startsWith("user-") || AVATAR_PORTRAITS.some((a) => a.id === avatarId);
}
