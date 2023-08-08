import { electronApp } from '@electron-toolkit/utils';
import { addCommandLineParams, loadDevtools } from './devtool';
import { appId } from '../config/app';
import { setCors } from './cors';
import { initShortcut } from './shortcut';
import { createLoginWindow } from '../window/login';
import { bindInitEvent } from './event';
import { initDB } from './db';

export function frontInit() {
  addCommandLineParams();
  bindInitEvent();
}

export function appReadyInit() {
  electronApp.setAppUserModelId(appId);
  loadDevtools();
  setCors();
  initShortcut();
  createLoginWindow();
  initDB();
}
