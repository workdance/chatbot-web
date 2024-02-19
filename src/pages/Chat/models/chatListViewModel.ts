import { queryChatList, removeChatList, updateChatItemById } from '@/services/ChatController';
import { history } from '@umijs/max';
import moment from 'moment';
import { ChatItem } from '@ant-design/pro-chat';
import { useCallback } from 'react';
import { useImmer } from 'use-immer';

export enum Operate {
  checked = 'checked',
  delete = 'delete',
  revise = 'revise',
}

async function removeChatListById({ id }: { id: string | undefined }) {
  const removeOk = await removeChatList({
    id: id,
  });

  if (removeOk.success) {
    console.log('remove success');
    history.push(`/chat`);
  }
  return removeOk.success;
}

type ChatListItem = ListItem & {
  pkId: string;
}

export default function useChatListViewModel() {
  const [chatListViewModel, updateChatListViewModel] = useImmer({
    chatList: [] as ChatListItem[],
  });
  const renderChatList = useCallback(
    ({ chatId }: { chatId: string | undefined }) => {
      const init = async () => {
        const rst = await queryChatList({});
        const list = rst.data;

        const formatData = list.map((item) => {
          return {
            value: `${item.chatName}`,
            id: item.chatId,
            pkId: item.id,
            createTime: moment(item.gmtCreate).format('HH:mm'),
            isChecked: item.chatId === chatId,
            lastTime: moment(item.gmtModified).format('HH:mm'),
          };
        });
        updateChatListViewModel((draft) => {
          draft.chatList = formatData;
        });
      };
      init();
    },
    [],
  );

  async function updateChatById({ id, chatName }: {
    id: string;
    chatName: string;
  }) {
    const rst = await updateChatItemById({
      id: id,
      chatName,
    });

    if (rst.success) {
      console.log('update success');
      updateChatListViewModel(draft => {
        draft.chatList = draft.chatList.map(item => {
          if (item.id === id) {
            item.value = chatName;
          }
          return item;
        })
      })
    }
    return rst.success;
  }

  const handleItemClick = async (
    op: keyof typeof Operate,
    id: string,
    extra: string,
  ) => {
    console.log('extra', extra);
    const matchId = chatListViewModel.chatList.find(
      (item) => item.id === id,
    )?.pkId;
    if (!matchId) {
      console.error('no match id in handleItemClick');
      return;
    }
    switch (op) {
      case Operate.checked:
        history.push(`/chat/${id}`);
        break;
      case Operate.delete:
        removeChatListById({ id: matchId });
        break;
      case Operate.revise:
        updateChatById({ id: matchId, chatName: extra });
        break;
    }
  };

  return {
    chatListViewModel,
    updateChatListViewModel,
    start: renderChatList,
    renderChatList,
    handleItemClick,
  };
}
