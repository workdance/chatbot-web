import { useEffect } from 'react';
import { useModel, useParams } from "@umijs/max";
import { queryChatHistoryByChatId } from '@/services/ChatHistoryController';


export default function useChatHistory() {
  const { updateChatViewModel } = useModel('Chat.chatViewModel');
  const params = useParams();
  useEffect(() => {

    const fetchHistory = async () => {
      updateChatViewModel(draft => {
        draft.chatMessageList = [];
      })
      if (params.id === undefined || params.id === 'undefined') {
        return;
      }
      updateChatViewModel(draft => {
        draft.chatId = params.id as string;
      });
      const rst = await queryChatHistoryByChatId({
        chatId: params.id
      });
      const list = rst.data;

      updateChatViewModel(draft => {
        draft.isChatting = true;
        draft.chatMessageList = list;
      });
    }

    fetchHistory();

  }, [params.id]);
}