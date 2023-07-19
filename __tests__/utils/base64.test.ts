import { fromBase64, toBase64 } from '@/utils/base64';

const u8 = new Uint8Array([65, 66, 67, 68]);
const base64 = 'QUJDRA==';

describe('base64', () => {
  describe('toBase64 function', () => {
    it('should convert a UInt8Array to a base64 string', () => {
      expect(toBase64(u8)).toBe(base64);
    });
  });

  describe('fromBase64 function', () => {
    it('should convert a base64 string to a UInt8Array', () => {
      expect(fromBase64(base64)).toEqual(u8);
    });
  });
});
