export interface Guild {
  id: string;
  icon: string;
  name: string;
  membersCount: number;
  language?: string;
  botNickname?: string;
  botStatus?: string;
  botId: string;
  botPrefix?: string;
  createdAt?: number;
  upatedAt?: number;
}