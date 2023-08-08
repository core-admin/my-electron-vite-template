import { type IpcRenderer } from 'electron';

export interface IPC {
  send: (...args: Parameters<IpcRenderer['send']>) => void;
  on: (...args: Parameters<IpcRenderer['on']>) => void;
  once: (...args: Parameters<IpcRenderer['once']>) => void;
  removeListener: (...args: Parameters<IpcRenderer['removeListener']>) => void;
  removeAllListeners: (...args: Parameters<IpcRenderer['removeAllListeners']>) => void;
  invoke: <T = any>(...args: Parameters<IpcRenderer['invoke']>) => Promise<T>;
}
