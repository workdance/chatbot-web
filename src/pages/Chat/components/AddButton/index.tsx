import React from 'react';
import IconBase from '@/components/Icon';

import { Button, type ButtonProps } from 'antd';

export interface AddButtonProps
  extends Pick<ButtonProps, 'loading' | 'disabled' | 'size'> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  /**
   * button type
   * @default default
   */
  type?: ButtonProps['type'];
}

const AddButton: React.FC<AddButtonProps> = ({
  children,
  onClick,
  className,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      className={`${className}`}
      icon={<IconBase type="icon-plus-outlined" />}
      onClick={onClick}
      block
    >
      {children && <span>{children}</span>}
    </Button>
  );
};
export default AddButton;
