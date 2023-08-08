import type { BrowserWindowConstructorOptions } from 'electron';
import { platform } from '@electron-toolkit/utils';
import { merge } from 'lodash-es';

export const baseConfig: BrowserWindowConstructorOptions = {
  titleBarStyle: platform.isMacOS ? 'hidden' : 'default',
  webPreferences: {
    // 同源策略
    webSecurity: true,
    nodeIntegration: false,
    webviewTag: false, // webview
    // Chromium 的实验功能
    experimentalFeatures: false,
    // macos 滚动回弹模式
    scrollBounce: platform.isMacOS,
    // 开启时，preload预加载脚本的能力会受一定的限制
    sandbox: false,
    // 关闭内置拼写器
    spellcheck: false,
  },
};

export function getBaseConfig(
  option?: BrowserWindowConstructorOptions,
): BrowserWindowConstructorOptions {
  return merge({}, baseConfig, option || {});
}
