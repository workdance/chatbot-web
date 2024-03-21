// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  const [errorMessage, setErrorMessage] = useState({
    messageId: '',
    message: '',
  });
  return {
    name,
    setName,
    errorMessage,
    showErrorMessage(message: string) {
      setErrorMessage({
        messageId: Date.now().toString(),
        message,
      });
    }
  };
};

export default useUser;
