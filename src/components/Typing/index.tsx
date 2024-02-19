import React from 'react';
import useStyle from './style';

export interface TypingProps {
  loading?: boolean;
  /**
   * 颜色
   * @default colorText rgba(0, 0, 0, 0.88)
   */
  color?: string;
};

const Typing: React.FC<TypingProps> = (props) => {
  const styles = useStyle(props);

  return <div className={styles.typing}/>;
};

export default Typing;
