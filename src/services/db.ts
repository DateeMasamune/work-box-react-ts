import Dexie, { Table } from 'dexie';

const DB_VERSION = 1; // При обновлении таблиц нужно повышать версию

export interface Todo {
    id?: number;
    name: string;
    comment: string;
}

export class JusticeDB extends Dexie {
  todo!: Table<Todo>;

  constructor() {
    super('justiceDB');
    this.version(DB_VERSION).stores({
      todo: 'id', // Ключ хранения
    });
  }
}

export const db = new JusticeDB();
