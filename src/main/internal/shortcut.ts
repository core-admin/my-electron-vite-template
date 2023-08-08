import { BrowserWindow, globalShortcut } from 'electron';

function globalShortcutInit() {
  globalShortcut.register('Ctrl+Shift+F12', () => {
    try {
      const win = BrowserWindow.getFocusedWindow();
      win && win.webContents.toggleDevTools();
    } catch (error) {
      console.log('app error 1', error);
    }
  });
}
export function initShortcut() {
  globalShortcutInit();
}
