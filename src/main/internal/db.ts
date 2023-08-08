import { DbService } from '../db/service';

export function initDB() {
  new DbService();
}
