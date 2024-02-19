import { Input as AntdInput } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import type { TextAreaRef } from 'antd/es/input/TextArea';
import React, { ReactNode, forwardRef, useMemo, useRef } from 'react';
import { cls, fileTypes, type Files } from '../../common';
import { insertAtCaret } from '../../utils';
import IconBase from '../Icon';
import SenderButton, { type SenderProps } from '../SendButton';
import type { UploadProps } from '../Upload';
import Upload from '../Upload';
import useStyle from './style';

export interface InputProps {
  /** 提示信息 */
  tips?: ReactNode;
  /**
   * tips 位置
   * @default top
   */
  tipsPosition?: 'top' | 'bottom';
  /** 最外层容器 className */
  wrapperClassName?: string;
  /**
   * @description input 前面的icon图标，可以传递一个 ReactNode 节点为 true 使用默认展示的icon图标
   * @default false
   */
  hasIcon?: boolean | React.ReactNode;
  /**
   * enter时，是否直接发送消息, 若配置为true，兼容常用换行方式 Command(⌘)/Windows(⊞) + Enter、Ctrl + Enter、Alt/Option + Enter。
   * @default false
   */
  isEnterSend?: boolean;
  /**
   * isEnterSend 为 true 时，用于直接提交
   */
  onSubmit?: (value: string) => void;
  /**
   * input 粘贴
   * @param event
   * @param files 处理后的文件对象 { image: File[], ... }
   * @returns
   */
  onPaste?: (
    event: React.ClipboardEvent<HTMLTextAreaElement>,
    files: Files,
  ) => void;

  /**
   * 参考文件上传
   */
  uploadConfig?: any;
  /**
   * 内置发送
   */
  senderConfig?: SenderProps;
}

/** @deprecated 仅用于 API 文档说明 */
export const DOCS_API_INPUT_PROPS: React.FC<InputProps> = () => null;
const Input: React.ForwardRefRenderFunction<
  TextAreaRef,
  InputProps & { uploadConfig?: UploadProps } & Omit<
      TextAreaProps,
      'onSubmit' | 'onPaste'
    >
> = (
  {
    children,
    tips,
    wrapperClassName = '',
    hasIcon = false,
    tipsPosition = 'top',

    uploadConfig,

    senderConfig,

    isEnterSend = false,
    onChange,
    onKeyDown,
    onSubmit,
    value,
    onPaste,
    ...textAreaProps
  },
  ref,
) => {
  const style = useStyle({ tipsPosition });
  // fix tips: '/' =>> ''
  const open = useMemo(() => {
    if (value === '') {
      return false;
    }

    return !!tips;
  }, [tips, value]);

  const disableSender = useMemo(() => {
    if (senderConfig?.disabled) {
      // 外部禁用
      return true;
    }

    if (uploadConfig) {
      // 图片上传失败
      const list = uploadConfig.fileList || [];
      const isError = list.some((file) => file.status === 'error');

      return isError;
    }

    // if(value) return false;
    return false;
  }, [value, uploadConfig?.fileList, senderConfig?.disabled]);

  const loadingSender = useMemo(() => {
    if (senderConfig?.loading) {
      // 外部loading
      return true;
    }

    if (uploadConfig) {
      // 图片上传中
      const list = uploadConfig.fileList || [];
      const isLoading = list.some((file) => file.status === 'uploading');

      return isLoading;
    }

    return false;
  }, [uploadConfig?.fileList, senderConfig?.loading]);

  /** 图片预览位置 */
  const domRef = useRef(null);

  function renderIcon() {
    if (hasIcon === true) {
      return (
        <span className={`${style.input}__icon`}>
          <IconBase size={24} type="icon-ai" />
        </span>
      );
    }
    if (!hasIcon) {
      return null;
    }

    return hasIcon;
  }

  function renderTips(dir) {
    if (!tips || !open) return null;

    if (dir !== tipsPosition) return null;

    return (
      <div style={{ position: 'relative' }}>
        <div className={`${style['input']}__tips`}>{tips || null}</div>
      </div>
    );
  }

  function onInputChange(e) {
    onChange?.(e);
  }

  function onInputPaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    e.persist();
    const files: Files = { image: [] };
    const { items = [] } = e.clipboardData;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const msgType = item.type?.split('/')[0];
      if (!msgType || !(msgType in fileTypes)) break;
      e.preventDefault();
      const file = item.getAsFile();
      if (!file) break;
      files[msgType] = [...files[msgType], file];
    }
    onPaste?.(e, files);
  }

  function onInputKeyDown(e) {
    e.persist();
    const { metaKey, ctrlKey, altKey, keyCode } = e;

    if (keyCode === 13) {
      if (open) {
        // Prompts 启用时，enter不被键入
        e.preventDefault();
      } else if (isEnterSend && (metaKey || ctrlKey || altKey)) {
        const event = insertAtCaret(e, '\n');
        setTimeout(() => onInputChange(event), 0);
      } else if (isEnterSend) {
        // 发送
        e.preventDefault();
        if (!disableSender) {
          setTimeout(
            () => (senderConfig?.onClick || onSubmit)?.(e.target.value),
            0,
          );
        }
      }
    }
    onKeyDown?.(e);
  }

  return (
    <div className={`${style['input']}__container ${wrapperClassName}`}>
      {renderTips('top')}
      <div
        className={`${style['input']}__inputContainer ${cls(
          'input-container',
        )} ${cls('container')}`}
      >
        <div className={`${style['input']}__inputContainer__content `}>
          <div
            style={{ display: 'flex', alignItems: 'center', minHeight: '46px' }}
          >
            {renderIcon()}
            <AntdInput.TextArea
              {...textAreaProps}
              onPaste={onInputPaste}
              ref={ref}
              value={value}
              onChange={onInputChange}
              onKeyDown={onInputKeyDown}
              bordered={false}
              className={`${style['input']}__textarea ${
                textAreaProps.className || ''
              }`}
              autoSize={{ minRows: 1, maxRows: 8 }}
            />
          </div>
          <div
            className={`${style.input}__inputContainer__content__list ${cls(
              'upload-list',
            )}`}
            ref={domRef}
          ></div>
        </div>
        <div className={`${style['input']}__inputContainer__operation`}>
          {uploadConfig ? (
            <Upload container={domRef} {...uploadConfig} />
          ) : null}

          <div className={`${style['input']}__sender`}>
            {senderConfig !== undefined ? (
              <SenderButton
                {...senderConfig}
                loading={loadingSender}
                disabled={disableSender}
              />
            ) : null}
            {children}
          </div>
        </div>
      </div>
      {renderTips('bottom')}
    </div>
  );
};

export default forwardRef(Input);
