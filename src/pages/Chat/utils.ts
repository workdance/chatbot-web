import { ChatItem, ChatMessage } from "./types";

type GeneratePlaceHolderMessageProps = {
  userMessage: string;
  chatId: string;
};

export const generatePlaceHolderMessage = ({
  userMessage,
  chatId,
}: GeneratePlaceHolderMessageProps): ChatMessage => {
  return {
    messageId: new Date().getTime().toString(),
    message_time: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toISOString(),
    assistant: "🧠",
    chatId: chatId,
    userMessage,
  };
};

export const getChatNameFromQuestion = (question: string): string =>
  question.split(" ").slice(0, 3).join(" ");


  export const getMessagesFromChatItems = (
    chatItems: ChatItem[]
  ): ChatMessage[] => {
    const messages = chatItems
      .filter((item) => item.item_type === "MESSAGE")
      .map((item) => item.body as ChatMessage);
  
    return messages;
  };
  