import { defineConfig } from 'dumi';


const kzuiCoreComponentsPath = (com) => `packages/kzui/src/components/${com}/index.md`

export default defineConfig({
  title: 'kzui',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  publicPath: '/kzui/',
  base: '/kzui',
  mode: 'site',
  menus: {
    '/components': [
      {
        title: '快速开始',
        path: '/components/getstart'
      },
      {
        title: '基本组件',
        children: [
          // 相对于 https://d.umijs.org/config#includes
          'components/button/index.md',
          'components/icon/index.md',
          'components/color-picker/index.md',
          'components/empty/index.md',
          'components/event-black-hole/index.md',
          // 'components/richtext-editor/index.md',
        ],
      },
      {
        title: '提示(显示)组件',
        children: [
          'components/notification/index.md',
          'components/confirm/index.md',
          'components/dialog/index.md',
          'components/poptip/index.md'
        ],
      },
      {
        title: '表单组件',
        children: [
          'components/input/index.md',
          'components/checkbox/index.md',
          'components/date-picker/index.md',
          'components/date-range-picker/index.md',
        ],
      },
    ],
  },
  theme: {
    '@c-primary': '#3b9bf5',
  },
  locales: [['zh-CN', '中文']]
});

// more config: https://d.umijs.org/config
