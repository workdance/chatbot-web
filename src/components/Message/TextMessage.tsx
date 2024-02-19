import { Typography } from 'antd';
import React from 'react';
import MessageBase, { type MessageBaseProps } from './MessageBase';

export interface TextMessageProps extends MessageBaseProps {
  children: string;
}

const TextMessage: React.FC<TextMessageProps> = ({
  children,
  ...baseMsgProps
}) => {
  return (
    <MessageBase {...baseMsgProps}>
      <div style={{ padding: '12px 16px' }}>
        <Typography.Text>{children}</Typography.Text>
      </div>
    </MessageBase>
  );
};

export default TextMessage;
