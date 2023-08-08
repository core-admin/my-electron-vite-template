import { BrowserWindow } from 'electron';
import { getBaseConfig } from '../config/windows-config';
import { loadWinUrl } from '../utils/window';
import path from 'path';

let browserWindow: Nullable<BrowserWindow> = null;

export function createLoginWindow() {
  browserWindow = new BrowserWindow(
    getBaseConfig({
      width: 1400,
      height: 900,
      titleBarStyle: 'default',
      webPreferences: {
        preload: path.join(__dirname, '../preload/login.js'),
      },
    }),
  );
  loadWinUrl(browserWindow, 'login.html');
}

export function destroyLoginWindow() {
  if (!browserWindow) {
    return;
  }
  browserWindow.destroy();
  browserWindow = null;
}

export function getLoginWindow() {
  return browserWindow;
}
