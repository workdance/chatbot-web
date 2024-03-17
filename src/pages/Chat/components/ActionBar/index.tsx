import Input from '@/components/Input';
import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.less';
import { useModel } from '@umijs/max';
import { Radio, RadioChangeEvent } from 'antd';
import { BrainEntity } from '@/types';

export function BrainSelector() {
  const { brainListViewModel } = useModel('Studio.brainListViewModel');
  const { brainViewModel, updateBrainViewModel } = useModel('Studio.brainViewModel');
  const onChange = (e: RadioChangeEvent) => {
    updateBrainViewModel(draft => {
      draft.currentBrain = brainListViewModel.brainList.find(item => item.brainId === e.target.value) as BrainEntity;
    })
  };

  if (brainListViewModel.brainList.length === 0) {
    return null;
  }

  return <div className={styles.brainWrap}>
    <Radio.Group onChange={onChange} defaultValue={brainViewModel.currentBrain?.brainId} buttonStyle="solid">
      {brainListViewModel.brainList.map(item => {
        return <Radio.Button key={item.brainId} value={item.brainId}>{item.name}</Radio.Button>
      })}
    </Radio.Group>
  </div>
}

export default () => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { updateChatInputView, submitQuestion } = useModel('Chat.chatInputViewModel')
  const { brainViewModel } = useModel('Studio.brainViewModel');
  const { renderBrainList } = useModel('Studio.brainListViewModel')
  useEffect(() => {
    renderBrainList();
  }, [])

  return (
    <div className={styles.inputWrap}>
      <div className={styles.inputInner}>
        <BrainSelector />
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
        {brainViewModel.currentBrain.brainId ?
          <div className={styles.mentionWrap}>你正在跟<strong>&nbsp;[{brainViewModel.currentBrain.name}]&nbsp;</strong>聊天</div> :
          <div className={styles.mentionWrap}>你可以通过来选择不同的大脑来对话</div>}
      </div>
    </div>

  );
};