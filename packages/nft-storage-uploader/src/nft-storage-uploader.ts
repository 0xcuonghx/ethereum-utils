import { BaseStorage } from './storage/base';
import { PinataStorage, PinataStorageParams } from './storage/pinata';
import { readFile } from 'fs/promises';

export enum StorageSupported {
  PINATA,
}

export type NftStorageUploaderParams = {
  type: StorageSupported.PINATA;
  params: PinataStorageParams;
};

export class NftStorageUploader {
  private storage: BaseStorage;

  constructor({ type, params }: NftStorageUploaderParams) {
    switch (type) {
      case StorageSupported.PINATA:
        this.storage = PinataStorage.create(params);
        break;
      default:
        throw Error('Unsupported storage');
    }
  }

  async uploadFile(fileOrPath: string | Buffer) {
    let contents: Buffer;
    if (typeof fileOrPath === 'string') {
      if (
        fileOrPath.startsWith('http://') ||
        fileOrPath.startsWith('https://')
      ) {
        const response = await fetch(fileOrPath);

        if (!response.ok) {
          throw Error('File not found');
        }

        contents = Buffer.from(await response.arrayBuffer());
      } else {
        contents = await readFile(fileOrPath);
      }
    } else {
      contents = fileOrPath;
    }

    return this.upload(contents);
  }

  async uploadFileFromJson(json: JSON) {
    const contents = Buffer.from(JSON.stringify(json));
    return this.upload(contents);
  }

  private async upload(contents: Buffer) {
    return this.storage.upload(contents);
  }
}
