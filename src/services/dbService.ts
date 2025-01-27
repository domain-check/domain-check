import { openDB, type IDBPDatabase } from 'idb';

let db: IDBPDatabase | undefined;

export async function getDb(): Promise<IDBPDatabase> {
  if (!db) {
    db = await openDB('database', 3, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('domains')) {
          db.createObjectStore('domains', { keyPath: 'name' });
        }
        if (!db.objectStoreNames.contains('tlds')) {
          db.createObjectStore('tlds', { keyPath: 'tld' });
        }
      },
    });
  }
  return db;
}
