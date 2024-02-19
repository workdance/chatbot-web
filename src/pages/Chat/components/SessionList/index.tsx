import React, { useEffect } from 'react';
import { List, ListProps, Operate } from '@/components';
import AddButton from '../AddButton';
import { useModel } from '@umijs/max';
import { Divider } from 'antd';
import { history } from '@umijs/max';
import styles from './index.module.less';
import { useParams } from '@umijs/max';


const SessionList: React.FC = () => {
  const { chatListViewModel, start, updateChatListViewModel, handleItemClick} = useModel('Chat.chatListViewModel')
  const { updateChatViewModel } = useModel('Chat.chatViewModel');
  const { id } = useParams();
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

  const handleBtnClick = () => {
    history.push('/chat');
    updateChatViewModel(draft => {
      draft.chatId = '';
    });
  }

  return (
    <div className={styles.sessionWrapper}>
      <AddButton size='large' onClick={handleBtnClick}>开启新会话</AddButton>
      <Divider />
      <List data={chatListViewModel.chatList} onClick={onItemClick} />
    </div>
  );
};

export default SessionList;