import { bytes32ToUuid, uuidToBytes32 } from '../src';

describe('blah', () => {
  it('works', () => {
    const uuid = '903c62a4-2c30-4ae5-a344-6d7e990b8269';
    expect(uuidToBytes32(uuid)).toEqual(
      '0x6b447869704377775375576a5247312b6d51754361513d3d0000000000000000'
    );
    expect(bytes32ToUuid(uuidToBytes32(uuid))).toEqual(uuid);
  });
});
