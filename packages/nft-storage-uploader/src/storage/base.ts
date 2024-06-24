export abstract class BaseStorage {
  abstract upload(contents: Buffer): Promise<string>;
}
