import { ipcMain } from 'electron';
import { DataSource } from 'typeorm';
import { DataBase } from './database';
import { MessageModel } from './model';

export class DbService {
  dataSource!: DataSource;

  constructor() {
    this.dataSource = new DataBase('message').dataSource;
    this.init();
  }
  init() {
    this.dataSource.initialize();
    this.onCreateMessage();
    this.onFindMessage();
  }

  onCreateMessage() {
    ipcMain.handle('create-message', async (_event, data: MessageModel) => {
      console.log('data', data);
      const messageModal = new MessageModel();
      messageModal.text = data.text;
      await messageModal.save();
      return await MessageModel.find();
    });
  }

  onFindMessage() {
    ipcMain.handle('find-message', async () => {
      return await MessageModel.find();
    });
  }

  destroy() {
    this.dataSource.destroy();
  }
}
