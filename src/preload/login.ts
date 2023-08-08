import { contextBridge } from 'electron';
import { ipc } from './src/ipc';

contextBridge.exposeInMainWorld('ipc', ipc);
