export interface Guild {
  id: string;
  icon: string;
  name: string;
  membersCount: number;
  botNickname?: string;
  botStatus?: string;
  botId: string;
  createdAt?: number;
  upatedAt?: number;
}