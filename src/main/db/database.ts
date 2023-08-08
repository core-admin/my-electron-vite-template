import path from 'path';
import { DataSource } from 'typeorm';
import { app } from 'electron';
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions';
import { MessageModel } from './model';
import { log } from 'electron-log';

export class DataBase {
  dataSource: DataSource;
  // 初始化数据库文件
  constructor(database: string) {
    // C:\Users\xuke\AppData\Roaming\my-electron-vite-template\data\message.db
    // /Users/xuke/Library/Application Support/my-electron-vite-template/data/message.db
    let basePath = path.join(app.getPath('appData'), app.getName(), `./data/${database}.db`);
    log('DataBase basePath >>> ', basePath);
    let options: BetterSqlite3ConnectionOptions = {
      type: 'better-sqlite3',
      entities: [MessageModel],
      database: basePath,
      synchronize: true,
    };
    this.dataSource = new DataSource(options);
  }
}
