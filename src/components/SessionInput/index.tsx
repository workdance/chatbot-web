import { Input, Space, type InputProps } from 'antd';
import React from 'react';
import Icon from '../Icon';
import useStyle from './style';

export interface ISessionInput extends InputProps {
  /** 会话名称 */
  value: string;
  /** 确认修改时的回调 */
  onOk?: () => void;
  /** 取消修改时的回调 */
  onCancel?: () => void;
}

/** SessionInput */
export default (props: ISessionInput) => {
  const { value = '', onOk, onChange, onCancel, className = '', ...rest } = props;
  const style = useStyle();

  return (
    <Space.Compact className={`${style.SessionInput}`}>
      <Input
        {...rest}
        value={value}
        onChange={onChange}
        onPressEnter={onOk}
        className={`${style.SessionInput}__input ${className}`}
      />
      <button
        type='button'
        className={`${style.SessionInput}__check`}
        onClick={(e) => {
          e.stopPropagation();
          onOk?.();
        }}
      >
        <Icon type={'icon-check-outlined'} />
      </button>
      <button
        type='button'
        className={`${style.SessionInput}__close`}
        onClick={(e) => {
          e.stopPropagation();
          onCancel?.();
        }}
      >
        <Icon type={'icon-close-outlined'} />
      </button>
    </Space.Compact>
  );
};
