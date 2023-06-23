import { setupTestStore } from '@/store/store';
import { initialState as progressInitialState } from '@/features/progressSlice';
import { initialState as signatureInitialState } from '@/features/signatureSlice';
import { samplePdf, sampleSignature, sampleSignedPdf } from '@/utils/samplePDF';
import { addSignatureToPdf } from '@/features/signatureSlice';
import { PDFDocument } from 'pdf-lib';
import { fromBase64 } from '@/utils/base64';

describe('signatureSlice', () => {
  describe('addSignatureToPdf', () => {
    it('沒有 rawFile 會有錯誤訊息', async () => {
      expect.hasAssertions();
      /* 準備 */
      const testStore = setupTestStore({
        progress: progressInitialState,
        signature: signatureInitialState,
      });

      /* 執行 */
      // const result = await testStore.dispatch(addSignatureToPdf()).unwrap();
      /* 驗證 */
      // expect(result).toBe('錯誤：沒有 rawFile');
      await expect(testStore.dispatch(addSignatureToPdf())).resolves.toEqual(
        expect.objectContaining({
          payload: expect.stringContaining('錯誤：沒有 rawFile'),
          type: expect.stringContaining('signature/addSignatureToPdf/rejected'),
        })
      );
    });

    it.skip('可以將簽名檔加入到 PDF', async () => {
      expect.hasAssertions();
      /* 準備 */
      const testStore = setupTestStore({
        progress: progressInitialState,
        signature: {
          pending: false,
          rawFile: samplePdf,
          signedFile: null,
          signatures: [sampleSignature],
          error: null,
        },
      });

      /* 執行 */
      const result = await testStore.dispatch(addSignatureToPdf()).unwrap();
      /* 驗證 */
      const expected = fromBase64(sampleSignedPdf);
      const decodedBytes = fromBase64(result);
      decodedBytes.forEach((byte, i) => {
        expect(byte).toBeGreaterThanOrEqual(expected[i] - 10);
        expect(byte).toBeLessThanOrEqual(expected[i] + 10);
      });
    });
  });
});
