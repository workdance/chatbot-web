import { useImmer } from "use-immer";
import { ChatMessage } from '../types';

export default function useChatViewModel() {
  const [chatViewModel, updateChatViewModel] = useImmer({
    chatId: '',
    isChatting: false,
    chatMessageList: [] as ChatMessage[],
  });

  /**
   * 更新聊天记录列表
   * @param streamedChat 
   */
  const updateStreamingHistory = (streamedChat: ChatMessage) => {
    const prevHistory = chatViewModel.chatMessageList;
    const updatedHistory = prevHistory.find(
      (item) => item.messageId === streamedChat.messageId
    )
      ? prevHistory.map((item: ChatMessage) =>
          item.messageId === streamedChat.messageId
            ? {
                ...item,
                assistant: item.assistant + streamedChat.assistant,
                metadata: streamedChat.metadata,
              }
            : item
        )
      : [...prevHistory, streamedChat];

    updateChatViewModel((draft) => {
      draft.chatMessageList = updatedHistory;
    });
  }



  return {
   chatViewModel,
   updateChatViewModel,
   updateStreamingHistory,
  };
}