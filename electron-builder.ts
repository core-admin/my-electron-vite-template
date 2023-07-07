import { Configuration as ElectronBuilderOptions } from 'electron-builder';

function createBuilder(): ElectronBuilderOptions {
  return {
    appId: 'com.xuke.electron-vite.desktop',
    productName: 'electron-vite-desktop',
    directories: {
      output: './dist-electron',
    },
    // 更新配置，主要用来生成lastest.yaml
    publish: [
      {
        provider: 'generic',
        url: '',
      },
    ],
    // https://github.com/electron-userland/electron-builder/issues/4630
    // https://github.com/maximegris/angular-electron/issues/713
    // todo 后期需要打开
    asar: false,
    // asar: {
    //   smartUnpack: false,
    // },
    files: ['node_modules/**/*', 'out/**/*', 'resources'],
    asarUnpack: ['**/*.{node,dll}', 'resources/**/*'],
    mac: {
      icon: './resources/icons/icon.icns',
      // 应用程序类型 [教育类型]
      category: 'public.app-category.education',
      artifactName: '${productName}-${arch}-v${version}.${ext}',
      target: ['dmg'],
    },
    win: {
      icon: './resources/icons/icon.ico',
      artifactName: '${productName}-${arch}-v${version}.${ext}',
    },
    dmg: {
      window: {
        width: 646,
        height: 460,
      },
      contents: [
        {
          x: 210,
          y: 170,
        },
        {
          x: 450,
          y: 170,
          type: 'link',
          path: '/Applications',
        },
      ],
      title: '泉城e学-v${version}',
      background: './resources/background/background.png',
    },
    // https://github.com/electron-userland/electron-builder/issues/2363
    nsis: {
      oneClick: false, // 是否一键安装
      allowToChangeInstallationDirectory: true, // 允许修改安装目录
      shortcutName: '泉城e学', // 图标名称
      perMachine: true, // 是否开启安装时权限限制（此电脑或当前用户）
      installerIcon: './resources/icons/icon.ico', // 安装图标
      uninstallerIcon: './resources/icons/icon.ico', // 卸载图标
      installerHeaderIcon: './resources/icons/icon.ico', // 安装时头部图标
      createDesktopShortcut: true, // 创建桌面图标
      createStartMenuShortcut: true, // 创建开始菜单图标
      deleteAppDataOnUninstall: true, // 卸载时清除用户数据
      include: './installer.nsh',
    },
  };
}

export default createBuilder();
