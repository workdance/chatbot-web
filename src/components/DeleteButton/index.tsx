import { Button, Popconfirm, message, type ButtonProps } from 'antd';
import React from 'react';
import IconBase from '../Icon';
import useStyle from './style';

export interface AbortButtonProps
  extends Pick<ButtonProps, 'className' | 'loading' | 'disabled' | 'style'> {
  children?: React.ReactNode;
  /** 确认删除时触发的回调 */
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const DeleteButton: React.FC<AbortButtonProps> = ({
  children,
  onClick,
  className = '',
  ...rest
}) => {
  const style = useStyle();

  const handler = (
    e: React.MouseEvent<HTMLElement, MouseEvent> | undefined,
  ) => {
    message.success('删除成功');
    onClick?.(e);
  };

  return (
    <>
      <Popconfirm
        title=""
        description="你确定要删除吗？"
        overlayClassName={`${style['DeleteButton']}__Popconfirm`}
        onConfirm={(e) => handler(e)}
        placement="topRight"
      >
        <Button
          className={`${style['DeleteButton']} ${className}`}
          type="text"
          {...rest}
          icon={<IconBase type="icon-delete-outlined" />}
        >
          {children}
        </Button>
      </Popconfirm>
    </>
  );
};
export default DeleteButton;
