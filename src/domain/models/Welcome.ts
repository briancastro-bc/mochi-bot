export interface Welcome {
  guildId: string;
  channelId: string;
  title: string;
  authorName: string;
  authorAvatarUrl?: string;
  roleId?: string; 
  thumbnail?: string;
  description: string;
  footer?: string;
}