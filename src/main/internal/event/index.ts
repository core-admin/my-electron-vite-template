import { app, BrowserWindow } from 'electron';
import { optimizer, platform } from '@electron-toolkit/utils';
import { createLoginWindow, getLoginWindow } from '../../window/login';

export function bindInitEvent() {
  app.on('browser-window-created', (_, window) => {
    /**
     * 绑定快捷键：f12 打开或者关闭devtools
     * 关闭生产环境 CommandOrControl + R
     */
    optimizer.watchWindowShortcuts(window);
  });

  app.on('window-all-closed', () => {
    if (!platform.isMacOS) {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createLoginWindow();
      return;
    }
    getLoginWindow()?.show();
  });
}
