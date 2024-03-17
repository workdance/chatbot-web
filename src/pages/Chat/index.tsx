
import React, { } from 'react';
import { Message } from '@/components/Message';
import Typing from '@/components/Typing';
import { Col, Flex, Row } from 'antd';
import { aiDefaultAvatar, userAvatar } from './constant';
import useChatHistory from './models/chatHistoryViewModel';
import { ChatMessage } from '../../types';
import ActionBar from './components/ActionBar';
import { useModel } from '@umijs/max';
import styles from './index.module.less';
import SessionList from './components/SessionList';
import ChatScrollAnchor from './components/ScrollAnchor'

const UserMessage = (props: {
  chatMessage: ChatMessage
}) => {
  const { chatMessage } = props;
  if (!chatMessage.userMessage) {
    return null;
  }
  return <div className={styles.messageWrap}><Message
    key={chatMessage.id}
    id="msg-1"
    direction="right"
    avatar={userAvatar}
  >
    {chatMessage.userMessage}
  </Message></div>
}

const RobotMessage = (props: {
  chatMessage: ChatMessage
}) => {
  const { chatMessage } = props;
  if (!chatMessage.assistant) {
    return null;
  }
  return <div className={styles.messageWrap}>
    <Message avatar={aiDefaultAvatar}   >
      {chatMessage.assistant}
    </Message>
  </div>
}

export default () => {
  const { chatViewModel } = useModel('Chat.chatViewModel');;
  useChatHistory();
  return (
    <Row>
      <Col flex="245px">
        <div className={styles.sideNav}>
          <SessionList/>
        </div>
      </Col>
      <Col flex="auto">
        <div className={styles.chatContent}>
          <div className={styles.chatPanel}>
            <Flex gap="middle" justify="flex-end" vertical>
              {chatViewModel.chatMessageList.length === 0 && <Typing loading />}
              <div key="chatMessage">
                {chatViewModel.chatMessageList.map((item, i) => {
                  return <div key={item.messageId + i}>
                    <UserMessage chatMessage={item} />
                    <RobotMessage chatMessage={item} />
                  </div>
                })}
              </div>
              <ChatScrollAnchor />
              <ActionBar />
            </Flex>
          </div>
        </div>
      </Col>
    </Row>
  );
};