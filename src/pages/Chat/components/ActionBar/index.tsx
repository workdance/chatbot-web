import Input from '@/components/Input';
import React, { useState, useRef } from 'react';
import styles from './index.module.less';
import { useModel } from '@umijs/max';

export default () => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { updateChatInputView, submitQuestion } = useModel('Chat.chatInputViewModel')

  return (
    <div className={styles.inputWrap}>
      <div className={styles.inputInner}>
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="我能帮你做些什么"
          ref={inputRef}
          isEnterSend
          senderConfig={{
            onClick: () => {
              // console.error('提交数据', value);
              inputRef.current?.focus()
              setValue('');
              updateChatInputView(draft => {
                draft.message = value;
              })
              submitQuestion(value);
            },

          }}
        />
      </div>
    </div>

  );
};