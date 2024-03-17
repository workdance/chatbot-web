import { UUID } from "crypto";

export enum ChatTypeEnum {
  "ANSWER" = "ANSWER",
  "QUESTION" = "QUESTION",
  "NOTIFICATION" = "NOTIFICATION",
}

export type ChatQuestion = {
  id?: string;
  model?: string;
  question: string;
  temperature?: number;
  max_tokens?: number;
  brain_id: string;
  prompt_id?: string;
};
export type ChatMessage = { // 一问一答是对话的基本单位
  id?: string;
  chatId: string;
  messageId: string;
  userMessage?: string;
  assistant: string;
  message_time?: string;
  prompt_title?: string;
  brain_name?: string;
  brain_id?: UUID;
  metadata?: any
};

type NotificationStatus = "Pending" | "Done";

export type Notification = {
  id: string;
  datetime: string;
  chatId?: string | null;
  message?: string | null;
  action: string;
  status: NotificationStatus;
};

export type ChatMessageItem = {
  item_type: ChatTypeEnum.ANSWER;
  body: ChatMessage;
};

export type QestionMessageItem = {
  item_type: ChatTypeEnum.QUESTION;
  body: ChatQuestion;
};

export type NotificationItem = {
  item_type: ChatTypeEnum.NOTIFICATION;
  body: Notification;
};

export type ChatItem = ChatMessageItem | NotificationItem | QestionMessageItem;

export type ChatEntity = {
  id: string;
  chatId: UUID;
  userId: string;
  chatName: string;
  gmtCreate: string;
  gmtModified: string;
};


export type ChatHistoryEntity = {
  id: UUID;
  chatId: UUID;
  chatName: string;
  messageId: string;
  gmtCreate: string;
  gmtModified: string;
};


export type BrainEntity = {
  id: string;
  brainId: string;
  name: string;
  model?: string;
  description: string;
  brainType: string;
  userId?: string;
  gmtCreate: string;
  gmtModified: string;
};

export type KnowledgeEntity = {
  id: string;
  name: string;
  brainId: UUID;
  url: string;
  gmtCreate: string;
  gmtModified: string;
};