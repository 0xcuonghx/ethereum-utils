import {
  BaseContract,
  EventFragment,
  Interface,
  Provider,
  Transaction,
  TransactionReceipt,
} from 'ethers';

export class EthersLogDecoder {
  private iface: Interface;
  private contract: BaseContract;

  constructor(contract: BaseContract) {
    this.iface = contract.interface;
    this.contract = contract;
  }

  async decode(receipt: TransactionReceipt, eventName: string) {
    let eventFragment: EventFragment | null = null;
    try {
      eventFragment = this.iface.getEvent(eventName);
    } catch (e) {
      // ignore error
    }

    if (eventFragment === null) {
      throw new Error(`Event "${eventName}" doesn't exist in the contract`);
    }

    const topic = eventFragment.topicHash;
    const contractAddress = await this.contract.getAddress();

    const logs = receipt.logs
      .filter(log => log.topics.includes(topic))
      .filter(
        log => log.address.toLowerCase() === contractAddress.toLowerCase()
      );

    if (logs.length === 1) {
      return this.iface.parseLog(logs[0])?.args;
    } else {
      return logs.map(log => this.iface.parseLog(log)?.args);
    }
  }
}

export async function waitForPendingTransaction(
  tx: Promise<Transaction> | Transaction | string,
  provider: Provider
) {
  let hash: string | null;
  if (tx instanceof Promise) {
    ({ hash } = await tx);
  } else if (typeof tx === 'string') {
    hash = tx;
  } else {
    ({ hash } = tx);
  }
  if (hash === null) {
    throw new Error(`${JSON.stringify(tx)} is not a valid transaction`);
  }
  return provider.getTransactionReceipt(hash);
}
