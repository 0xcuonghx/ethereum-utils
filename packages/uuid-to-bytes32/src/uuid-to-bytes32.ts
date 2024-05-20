import { ethers } from 'ethers';
import { Buffer } from 'buffer';

export function uuidToBytes32(uuid: string): string {
  // Remove hyphens and convert to a byte array
  const hexString = uuid.replace(/-/g, '');
  const encodeBase64 = ethers.encodeBase64(Buffer.from(hexString, 'hex'));

  return ethers.encodeBytes32String(encodeBase64);
}

export function bytes32ToUuid(bytes32: string): string {
  const decodeBase64 = ethers.decodeBytes32String(bytes32);
  const byteArray = ethers.decodeBase64(decodeBase64);

  // Convert the byte array to a hex string
  const hexString = Buffer.from(byteArray).toString('hex');

  // Insert hyphens to match the UUID format
  const uuid = `${hexString.slice(0, 8)}-${hexString.slice(
    8,
    12
  )}-${hexString.slice(12, 16)}-${hexString.slice(16, 20)}-${hexString.slice(
    20
  )}`;

  return uuid;
}
