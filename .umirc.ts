import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Chatbot',
    locale: false, // 默认开启，如无需菜单国际化可关闭
  },
  proxy: {
    '/api': {
      target: 'http://demo.dev.alipay.net:8080/',
      'pathRewrite': { '^/api' : '/api' },
    },
    '/ai': {
      target: 'http://demo.dev.alipay.net:5050/',
      'pathRewrite': { '^/ai' : '' },
      changeOrigin: true,
      onProxyReq: (proxyRes, req, res) => {
        res.on('close', () => proxyRes.destroy());
      }
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/chat',
      access: 'canUse',
    },
    {
      name: '',
      path: '/home',
      component: './Home',
      // 不展示顶栏
      headerRender: false,
      // 不展示页脚
      footerRender: false,
      // 不展示菜单
      menuRender: false,
      access: 'canUse',
    },
    {
      name: 'AI 对话',
      path: '/chat',
      component: './Chat',
      access: 'canUse',
    },
    {
      name: 'AI 大脑',
      path: '/studio',
      redirect: '/studio/list',
      access: 'canUse',
    },
    {
      path: 'studio',
      access: 'canUse',
      routes: [
        {
          path: '',
          redirect: './list',
        },
        {
          path: 'list',
          name: 'Studio', 
          component: './Studio/List',
        },
        {
          path: 'create',
          name: 'Studio',
          component: './Studio/Create',
        },
        {
          path: ':id',
          name: 'Studio',
          component: './Studio/Edit',
        },
      ]
    },
    {
      name: '测试chat',
      path: '/chat/:id',
      component: './Chat',
      hideInMenu: true,
    }
  ],
  npmClient: 'npm',
});

