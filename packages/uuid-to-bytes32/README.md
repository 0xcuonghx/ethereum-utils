# UUID to Bytes32 converter

Various web2 using uuid for id (36 length) this was exceed maximum bytes32. Package was help convert uuid to bytes32 without truncate and forward, backward compatible

## Install

```shell
npm install
```

## Usage

```ts
import { bytes32ToUuid, uuidToBytes32 } from '../src';

// UUID to Bytes32
const uuid = '903c62a4-2c30-4ae5-a344-6d7e990b8269';
const bytes32 = uuidToBytes32(uuid); // '0x6b447869704377775375576a5247312b6d51754361513d3d0000000000000000'

// Bytes32 to UUID
const bytes32 =
  '0x6b447869704377775375576a5247312b6d51754361513d3d0000000000000000';
const uuid = bytes32ToUuid(bytes32); // '903c62a4-2c30-4ae5-a344-6d7e990b8269'
```
