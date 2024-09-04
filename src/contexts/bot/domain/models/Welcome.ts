export interface Welcome {
  guildId: string;
  channelId: string;
  title: string;
  color?: string;
  authorName: string;
  mentionUser: boolean;
  authorAvatarUrl?: string;
  roleId?: string; 
  thumbnail?: string;
  description: string;
  footer?: string;
}