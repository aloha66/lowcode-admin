import path from 'path';
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
  },
  esbuild: {},
  theme: {
    'primary-color': '#2F54EB',
    // "btn-primary-bg": "#2F54EB"
  },
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', component: '@/pages/index' },
        { exact: true, path: '/editor', component: '@/pages/editor' },
      ],
    },
  ],
  fastRefresh: {},
  alias: {
    '@com': path.resolve(__dirname, 'src/components/'),
    '@util': path.resolve(__dirname, 'src/utils/'),
    '@hook': path.resolve(__dirname, 'src/hooks/'),
    '@conf': path.resolve(__dirname, 'src/config/'),
    '@page': path.resolve(__dirname, 'src/pages/'),
    '@sty': path.resolve(__dirname, 'src/styles/'),
  },
});
