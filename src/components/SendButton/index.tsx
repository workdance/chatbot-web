import React, { ReactNode } from 'react';
import { Button, ButtonProps } from 'antd';
import IconBase from '../Icon';
import useStyle from './style';

export interface SenderProps extends Pick<ButtonProps, 'onClick' | 'loading' | 'disabled' | 'style'>  {
  children?: ReactNode;
};

const Sender: React.FC<SenderProps> = ({
  children,
  style = { width: 72 },
  ...rest
}) => {

  const styles = useStyle();

  return (
    <Button
      style={style}
      {...rest}
      className={styles['send-btn']}
      type="primary"
      icon={<IconBase disabled={rest.disabled} type="icon-send-filled" size={30} />}
    >{children}</Button>
  );
};

export default Sender;