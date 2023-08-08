import type { IPC } from '#common/types/preload';
import { ipcRenderer } from 'electron';

export const ipc: IPC = {
  send(...args) {
    ipcRenderer.send(...args);
  },
  on(...args) {
    ipcRenderer.on(...args);
  },
  once(...args) {
    ipcRenderer.once(...args);
  },
  removeListener(...args) {
    ipcRenderer.removeListener(...args);
  },
  removeAllListeners(...args) {
    ipcRenderer.removeAllListeners(...args);
  },
  invoke(...args) {
    return ipcRenderer.invoke(...args);
  },
};
