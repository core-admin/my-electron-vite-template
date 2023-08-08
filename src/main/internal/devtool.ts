/* eslint-disable @typescript-eslint/no-unused-vars */
import { app, session } from 'electron';
import { is } from '@electron-toolkit/utils';

export function loadDevtools() {
  /**
   * 此处为手动安装的chrome插件，使用了chrome浏览器中安装的插件，electron-devtools-vendor 包中的插件有点问题，版本较低了。
   *
   * @example https://juejin.cn/post/6976047817139683364
   */
  session.defaultSession
    .loadExtension(
      '/Users/xuke/Library/Application Support/Google/Chrome/Profile 2/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/6.5.0_1',
      {
        allowFileAccess: true,
      },
    )
    .catch(error => {
      console.warn(`🛑 读取与安装chrome VUEJS3_DEVTOOLS 失败 ---> `, error);
    });
}

export function addCommandLineParams() {
  // 禁用缓存
  // app.commandLine.appendSwitch('--disable-http-cache');

  // iframe 同源策略隔离取消（不打开无法读取iframe内的内容与操作它）
  // app.commandLine.appendSwitch('disable-site-isolation-trials');

  // 禁用同源策略
  app.commandLine.appendSwitch('disable-web-security');

  /**
   * 忽略网站 SSL/TLS 证书的错误
   */
  app.commandLine.appendSwitch('--ignore-certificate-errors', 'true');
}
