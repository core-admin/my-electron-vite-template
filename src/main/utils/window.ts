import { BrowserWindow, app } from 'electron';
import path from 'path';

export function getCreateWindowLoadUrlState(name = 'index.html') {
  const isDev = !app.isPackaged && process.env['ELECTRON_RENDERER_URL'];
  return {
    url: isDev
      ? `${process.env['ELECTRON_RENDERER_URL']}/${name}`
      : path.resolve(__dirname, `../renderer/${name}`),
    isDev,
  };
}

export function loadWinUrl(win: BrowserWindow, name = 'index.html') {
  const { url, isDev } = getCreateWindowLoadUrlState(name);
  if (isDev) {
    return win.loadURL(url);
  }
  return win.loadFile(url);
}
