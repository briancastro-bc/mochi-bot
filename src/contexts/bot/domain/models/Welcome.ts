export interface Welcome {
  guildId: string;
  channelId: string;
  title: string;
  color?: number;
  authorName: string;
  mentionUser: boolean;
  authorAvatarUrl?: string;
  rolesIds?: Array<string>; 
  thumbnail?: string;
  description: string;
  footer?: string;
}