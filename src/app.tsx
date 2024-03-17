// 运行时配置'
import { RunTimeLayoutConfig } from '@umijs/max';
import { getLoginName } from './common';
import LoginForm from './components/LoginForm';


// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  const name = getLoginName();
  return { 
    name: name,
   };
}


export const layout: RunTimeLayoutConfig = (initialState) => {
  return {
    unAccessible: <LoginForm/>,
    // 常用属性
    title: 'Chatbot',
    logo: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
    layout: 'top',
  };
};