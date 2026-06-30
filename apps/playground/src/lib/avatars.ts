export function getAvatarUrl(avatarId: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarId)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

export function isPortraitAvatar(avatarId: string): boolean {
  return avatarId.startsWith("user-");
}
