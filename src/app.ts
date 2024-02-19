// 运行时配置'
import { RunTimeLayoutConfig } from '@umijs/max';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}


export const layout: RunTimeLayoutConfig = (initialState) => {
  return {
    // 常用属性
    title: 'Chatbot',
    logo: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original',
    layout: 'top',
  };
};