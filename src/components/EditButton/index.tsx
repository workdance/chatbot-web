import { Button, type ButtonProps } from 'antd';
import React from 'react';
import IconBase from '../Icon';
import useStyle from './style';

export interface AbortButtonProps
  extends Pick<
    ButtonProps,
    'onClick' | 'loading' | 'disabled' | 'style' | 'className'
  > {
  children?: React.ReactNode;
}

const EditButton: React.FC<AbortButtonProps> = ({
  children,
  onClick,
  className = '',
  ...rest
}) => {
  const style = useStyle();

  return (
    <Button
      className={`${style['EditButton']} ${className}`}
      type="text"
      {...rest}
      onClick={onClick}
      icon={<IconBase type="icon-edit-outlined" />}
    >
      {children}
    </Button>
  );
};

export default EditButton;
