export interface LocalStorageService {
  readStorage(key: string): any;
  setStorage(key: string, storage: any): any;
  removeStorage(key: string): any;
  clearStorage(): any;
}
