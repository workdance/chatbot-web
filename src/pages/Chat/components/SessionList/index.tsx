import React, { useEffect, useState } from 'react';
import { List, ListProps, Operate } from '@/components';
import AddButton from '../AddButton';
import { useModel } from '@umijs/max';
import { Divider, Modal } from 'antd';
import { history } from '@umijs/max';
import styles from './index.module.less';
import { useParams } from '@umijs/max';
import BrainSelector from '../BrainSelector';
import { createChat } from '@/services/ChatController';


const SessionList: React.FC = () => {
  const { chatListViewModel, start, updateChatListViewModel, handleItemClick} = useModel('Chat.chatListViewModel')
  const { updateChatViewModel } = useModel('Chat.chatViewModel');
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    start({
      chatId: id,
    });
  }, []);

  const onItemClick: ListProps['onClick'] = (op, id, extra) => {
    handleItemClick(op, id, extra);
    updateChatListViewModel(draft => {
      draft.chatList = draft.chatList.filter((item, index) => {
        switch (op) {
          case Operate.checked:
            item.isChecked = id === item?.id;
            return item;
  
          case Operate.delete:
            item.isChecked = extra ? item.id === extra : index === 0;
            return item.id !== id;
  
          case Operate.revise:
            item.value = item.id === id ? extra : item.value;
            return item;
          default:
            return item;
        }
      });;
    })
  };

  const handleBtnClick = async ({ chatName }) => {
    const chat = await createChat({
      chatName,
    });

    if (chat.success) {
      const currentChatId = chat.data.chatId;
      updateChatViewModel(draft => {
        draft.chatId = currentChatId;
      })
      history.push(`/chat/${currentChatId}`);
      start({
        chatId: currentChatId,
      });
    }
  }

  return (
    <div className={styles.sessionWrapper}>
      <AddButton size='large' onClick={showModal}>开启新会话</AddButton>
      <BrainSelector open={open} setOpen={setOpen} onBrainSelect={handleBtnClick}/>
      <Divider />
      <List data={chatListViewModel.chatList} onClick={onItemClick} />
    </div>
  );
};

export default SessionList;