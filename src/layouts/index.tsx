import { useModel } from '@umijs/max';
import { message } from 'antd';
import { useEffect } from 'react';
import { Outlet } from 'umi'

export default function Layout() {
  const { errorMessage } = useModel('global');
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!errorMessage.messageId) {
      return;
    }
    messageApi.error(errorMessage.message);
  }, [errorMessage.messageId])

  return <>
    {contextHolder}
    <Outlet />
  </>
}