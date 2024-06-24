import Pinata from '@pinata/sdk';
import { BaseStorage } from './base';
import { Readable } from 'stream';

export interface PinataStorageParams {
  pinataApiKey: string;
  pinataSecretKey: string;
}

export class PinataStorage implements BaseStorage {
  private readonly client: Pinata;

  constructor(apiKey: string, secretApiKey: string) {
    this.client = new Pinata(apiKey, secretApiKey);
  }

  public static create(params: PinataStorageParams) {
    return new PinataStorage(params.pinataApiKey, params.pinataSecretKey);
  }

  async upload(contents: Buffer): Promise<string> {
    const stream = Readable.from(contents);
    const result = await this.client.pinFileToIPFS(stream, {
      pinataMetadata: {
        name: 'NFT storage uploader',
      },
    });

    return 'ipfs://' + result.IpfsHash;
  }
}
